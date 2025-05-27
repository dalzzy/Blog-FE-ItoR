import { Header, Input } from '@/components';
import ProfileSection from '@/components/my/ProfileSection';
import { settingFields } from '@/constants';
import { flexColumn } from '@/styles/common.styled';
import styled from 'styled-components';
import { getMyInfo, patchMyInfo } from '@/api/my/my.api';
import { useEffect, useState } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useUser } from '@/context/UserContext';

const InputWrapper = styled.div`
  ${flexColumn}
  gap: 16px;
  width: 100%;
  padding: 0 30px 60px 30px;
  max-width: 720px;
  margin: 0 auto;
`;

const MyPageSetting = () => {
  const { user, setUser } = useUser();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    introduction: '',
    birthDate: '',
    profilePicture: '',
  });
  const [original, setOriginal] = useState({
    email: '',
    nickname: '',
    introduction: '',
    birthDate: '',
    profilePicture: '',
  });

  const { previewUrl, uploadedUrl, handleImageChange, reset: resetImageUpload } = useImageUpload();

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const data = await getMyInfo();
        setForm({
          email: data.email,
          nickname: data.nickname,
          introduction: data.introduction,
          birthDate: data.birthDate,
          profilePicture: data.profilePicture,
        });
        setOriginal({
          email: data.email,
          nickname: data.nickname,
          introduction: data.introduction,
          birthDate: data.birthDate,
          profilePicture: data.profilePicture,
        });
      } catch (error) {
        console.error('내 정보를 가져오는 데 실패했습니다.', error);
      }
    };
    fetchMyInfo();
  }, []);

  const onChange =
    (field: 'email' | 'nickname' | 'introduction' | 'birthDate' | 'profilePicture') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  // 취소하기 ( 원래 정보로 되돌림 )
  const handleCancel = () => {
    setForm(original);
    resetImageUpload();
    setEditMode(false);
  };

  // 저장하기 ( 내 정보 수정 api 요청 )
  const handleSave = async () => {
    const newProfilePicture = uploadedUrl ?? form.profilePicture;

    await patchMyInfo({
      email: form.email,
      password: 'dummy123!', // 임시값
      nickname: form.nickname,
      introduction: form.introduction,
      profileImageUrl: newProfilePicture,
      birthDate: '2002-01-01', // 임시값
      name: '홍길동', // 임시값
    });
    console.log('내 정보 : ', form);
    console.log('업로드된 이미지 URL : ', uploadedUrl);

    setForm((prev) => ({ ...prev, profilePicture: newProfilePicture }));
    setOriginal((prev) => ({ ...prev, profilePicture: newProfilePicture }));
    resetImageUpload();
    setEditMode(false);
    setUser({
      ...user,
      nickname: form.nickname,
      introduction: form.introduction,
      profilePicture: newProfilePicture,
    });
  };

  return (
    <div>
      <Header
        variant="action"
        confirmLabel={editMode ? '저장하기' : '수정하기'}
        negativeLabel={editMode ? '취소하기' : undefined}
        onClickConfirm={editMode ? handleSave : () => setEditMode(true)}
        onClickNegative={editMode ? handleCancel : undefined}
      />

      <ProfileSection
        isEditing={editMode}
        nickname={form.nickname}
        introduction={form.introduction}
        previewUrl={previewUrl}
        onChange={onChange}
        onImageChange={handleImageChange}
      />
      <InputWrapper>
        {settingFields.map((field) =>
          field.name === 'email' ? (
            <Input
              key="email"
              label="메일"
              value={form.email}
              onChange={onChange(field.name as keyof typeof form)}
              readOnly={!editMode}
              readOnlyBgColor="#fff"
              readOnlyTextColor="#c8c8c8"
              readOnlyBorderColor="#c8c8c8"
            />
          ) : (
            <Input
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              readOnly
              readOnlyBgColor="#fff"
              readOnlyTextColor="#c8c8c8"
              readOnlyBorderColor="#c8c8c8"
            />
          ),
        )}
      </InputWrapper>
    </div>
  );
};

export default MyPageSetting;
