import { flexColumn } from '@/styles/common.styled';
import styled from 'styled-components';
import { Button, Image } from '@/components';
import { Text } from '@/components/home/PostItem';
import { useUser } from '@/context/UserContext';
import { DefaultProfileSvg, SettingSvg } from '@/assets';
import { ButtonWrapper } from '@/styles/common.styled';
import theme from '@/styles/theme.styled';
import { useLocation, useNavigate } from 'react-router-dom';

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: ${({ theme }) => theme.COLORS.gray[96]};
  margin: 72px 0 60px;
  padding: 60px 0;
`;

export const FooterContent = styled.div`
  ${flexColumn}
  gap:16px;
  width: 100%;
  max-width: 720px;
  padding: 0 20px;
`;

const BlogFooter: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();
  const nav = useNavigate();
  const handleClick = () => {
    nav('/my/setting');
  };

  const isMyPage = location.pathname === '/my';

  return (
    <FooterWrapper>
      <FooterContent>
        {user?.profilePicture ? (
          <Image
            src={user.profilePicture}
            alt="profile-image"
            width="80px"
            height="80px"
            borderRadius="50%"
            objectFit="cover"
          />
        ) : (
          <DefaultProfileSvg width="80px" height="80px" />
        )}
        <Text fontSize="xl" fontWeight="medium">
          {user?.nickname}
        </Text>
        <Text fontSize="sm" fontWeight="light" color="gray20">
          {user?.introduction}
        </Text>
        {isMyPage && (
          <ButtonWrapper onClick={handleClick}>
            <Button
              variant="text"
              size="md"
              rounded="sm"
              height="25px"
              borderColor={theme.COLORS.gray[90]}
              textColor={theme.COLORS.gray[56]}
              backgroundColor="transparent"
            >
              <SettingSvg fill={theme.COLORS.gray[56]} />내 프로필 설정
            </Button>
          </ButtonWrapper>
        )}
      </FooterContent>
    </FooterWrapper>
  );
};

export default BlogFooter;
