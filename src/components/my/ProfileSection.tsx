import { FooterContent, FooterWrapper } from '@/components/blogDetail/BlogFooter';
import { DefaultProfileSvg, PlusSvg } from '@/assets';
import Image from '@/components/common/Image/Image';
import Input from '@/components/common/Input/Input';
import { Text } from '@/components/home/PostItem';
import styled from 'styled-components';
import { useUser } from '@/context/UserContext';

interface ProfileSectionProps {
  isEditing: boolean;
  nickname: string;
  introduction: string;
  previewUrl: string | null;
  onChange: (
    field: 'nickname' | 'introduction',
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const PlusButtonWrapper = styled.label`
  position: absolute;
  bottom: -10px;
  right: -5px;
  cursor: pointer;
`;

const PlusButton = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${({ theme }) => theme.COLORS.gray[20]};
  border: 3px solid white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ProfileSection: React.FC<ProfileSectionProps> = ({
  isEditing,
  nickname,
  introduction,
  previewUrl,
  onChange,
  onImageChange,
}) => {
  const { user } = useUser();

  return (
    <FooterWrapper>
      <FooterContent>
        <ProfileImageContainer>
          {previewUrl || user?.profilePicture ? (
            <Image
              src={previewUrl || user?.profilePicture || ''}
              alt="profile-image"
              width="80px"
              height="80px"
              borderRadius="50%"
              objectFit="cover"
            />
          ) : (
            <DefaultProfileSvg width="80px" height="80px" />
          )}
          {isEditing && (
            <PlusButtonWrapper>
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                style={{ display: 'none' }}
                id="profile-upload"
              />
              <PlusButton htmlFor="profile-upload" as="label">
                <PlusSvg />
              </PlusButton>
            </PlusButtonWrapper>
          )}
        </ProfileImageContainer>
        <div style={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
          <Input
            type="text"
            value={nickname}
            onChange={onChange('nickname')}
            readOnly={!isEditing}
            readOnlyBgColor="#F5F5F5"
            fontSize="xl"
            readOnlyBorderColor="#e6e6e6"
          />
          <Text fontSize="xs" color="gray78">
            * 20글자 이내
          </Text>
        </div>
        <Input
          type="text"
          value={introduction || user?.introduction}
          onChange={onChange('introduction')}
          readOnly={!isEditing}
          readOnlyBgColor="#F5F5F5"
          readOnlyBorderColor="#e6e6e6"
        />
      </FooterContent>
    </FooterWrapper>
  );
};

export default ProfileSection;
