import styled from 'styled-components';
import { flexColumn, flexColumnCenter } from '@/styles/common.styled';
import { Button, Image, Input } from '@/components';
import { emailSignupFields, kakaoSignupFields } from '@/constants';
import { PhotoSvg, DefaultProfileSvg, KakaoSvg } from '@/assets';
import theme from '@/styles/theme.styled';
import { Text } from '@/components/home/PostItem';
import { useRef } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useForm, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { kakaoSignupSchema, SignupSchema, signupSchema, KakaoSignupSchema } from '@/schema/auth';
import { getFileUrl, getPresignedUrl } from '@/api/file/file.api';
import { kakaoSignupApi, signupApi } from '@/api/auth/auth.api';
import { useModal } from '@/context/ModalContext';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ButtonWrapper } from '@/styles/common.styled';

interface SignupFieldProps {
  signupType: 'email' | 'kakao';
}

export const Wrapper = styled.div`
  ${flexColumnCenter}
  width: 100%;
  max-width: 720px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 10px 20px;
`;

export const InputSection = styled.div`
  width: 100%;
  margin-bottom: 60px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const ProfileSection = styled.div`
  ${flexColumn}
  gap:16px;
  width: 100%;
  margin-bottom: 20px;
`;

const SignupField: React.FC<SignupFieldProps> = ({ signupType }) => {
  const readOnlyFields = ['socialLogin', 'name'];
  const isKakao = signupType === 'kakao';
  const fields = isKakao ? kakaoSignupFields : emailSignupFields;
  const inputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, handleImageChange, imageFile } = useImageUpload();
  const { openModal } = useModal();
  const location = useLocation();

  const handleClick = () => inputRef.current?.click();

  const kakaoUserName = isKakao ? (localStorage.getItem('nickname') ?? '') : '';

  type CurrentSchema = SignupSchema | KakaoSignupSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrentSchema>({
    resolver: zodResolver(isKakao ? kakaoSignupSchema : signupSchema),
    defaultValues: {
      name: kakaoUserName,
    },
  });

  // 자체 회원가입 mutation
  const emailSignupMutation = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      openModal('signup');
    },
    onError: (error) => {
      console.error('자체 회원가입 오류', error);
      alert('자체 회원가입에 실패했습니다.');
    },
  });

  // 카카오 회원가입 Mutation
  const kakaoSignupMutation = useMutation({
    mutationFn: kakaoSignupApi,
    onSuccess: () => {
      openModal('signup');
    },
    onError: (error) => {
      console.error('카카오 회원가입 오류', error);
      alert('카카오 회원가입에 실패했습니다.');
    },
  });

  const onSubmit = async (data: SignupSchema | KakaoSignupSchema) => {
    let profilePicture = '';

    if (imageFile) {
      try {
        const fileName = imageFile.name;

        // presignedUrl 요청
        const presignedUrlResponse = await getFileUrl(fileName);
        const presignedUrl =
          typeof presignedUrlResponse === 'string'
            ? presignedUrlResponse
            : presignedUrlResponse?.data;

        if (!presignedUrl) {
          console.error('presigned URL이 없습니다.');
          return;
        }
        console.log('presigned URL:', presignedUrl);

        // s3에 업로드
        await getPresignedUrl(imageFile, presignedUrl);
        // presignedUrl에서 ? 이전 부분만 저장
        profilePicture = presignedUrl.split('?')[0];
      } catch (error) {
        console.error('프로필 사진 업로드 오류', error);
        alert('프로필 사진 업로드에 실패했습니다.');
        return;
      }

      const isEmailSignup = location.pathname === '/signup/email';

      const kakaoId = localStorage.getItem('kakaoId');

      const signupData = {
        ...(data as SignupSchema),
        profilePicture,
        kakaoId,
      };

      if (isEmailSignup) {
        emailSignupMutation.mutate(signupData);
      } else {
        kakaoSignupMutation.mutate({
          ...(data as KakaoSignupSchema),
          profilePicture,
          kakaoId: Number(kakaoId),
        });
      }
    }
  };
  return (
    <Wrapper>
      <InputSection>
        <ProfileSection>
          <Text fontSize="sm" fontWeight="light" color="gray56">
            프로필 사진
          </Text>
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="profile-preview"
              width="90px"
              height="90px"
              borderRadius="50%"
            />
          ) : (
            <DefaultProfileSvg width="90px" height="90px" />
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />

          <ButtonWrapper onClick={handleClick}>
            <Button
              variant="text"
              size="md"
              rounded="sm"
              height="25px"
              borderColor={theme.COLORS.gray[90]}
              textColor={theme.COLORS.gray[56]}
            >
              <PhotoSvg />
              프로필 사진 추가
            </Button>
          </ButtonWrapper>
        </ProfileSection>

        {fields.map(({ label, placeholder, name, type }) => (
          <InputWrapper key={name}>
            <Input
              {...register(name as Path<SignupSchema>)}
              label={label}
              placeholder={placeholder}
              type={type}
              readOnly={isKakao && readOnlyFields.includes(name)}
              icon={name === 'socialLogin' ? <KakaoSvg /> : undefined}
              errorMessage={(errors as Record<string, { message?: string }>)[name]?.message}
            />
          </InputWrapper>
        ))}
      </InputSection>

      <Button
        variant="primary-outline"
        size="lg"
        rounded="full"
        fullWidth
        onClick={handleSubmit(onSubmit)}
        type="submit"
      >
        회원가입 완료
      </Button>
    </Wrapper>
  );
};

export default SignupField;
