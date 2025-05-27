import { Button, Image } from '@/components';
import { DefaultProfileSvg } from '@/assets';
import {
  Flex,
  FlexRow,
  Overlay,
  SidebarContent,
  SidebarWrapper,
} from '@/components/common/SideBar/SideBar.styled';
import { useState } from 'react';
import { Text } from '@/components/home/PostItem';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@/context/ModalContext';
import { useUser } from '@/context/UserContext';

interface SideBarProps {
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { openModal } = useModal();
  const nav = useNavigate();

  const { user } = useUser();

  const isLoggedIn = Boolean(user);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleClick = {
    write: () => nav('/post/write'),
    logout: () => openModal('logout'),
    myPage: () => {
      nav('/my');
      onClose();
    },
  };

  return (
    <>
      <Overlay onClick={handleClose} />
      <SidebarWrapper isClosing={isClosing}>
        <SidebarContent>
          <Flex>
            {isLoggedIn && user && user.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt="profile"
                width="64px"
                height="64px"
                borderRadius="50%"
              />
            ) : (
              <DefaultProfileSvg width="64px" height="64px" />
            )}
            {/* 프로필 섹션 */}
            {isLoggedIn ? (
              <Flex>
                <Text fontSize="xl" fontWeight="medium" color="black">
                  {user?.nickname}
                </Text>
                <Text fontSize="sm" fontWeight="light" color="gray20">
                  {user?.introduction}
                </Text>
              </Flex>
            ) : (
              <Text color="gray20" fontWeight="light">
                You can make anything by <br /> writing
              </Text>
            )}
          </Flex>

          {/* 버튼 섹션 */}
          {isLoggedIn ? (
            <FlexRow>
              <Button
                variant="primary-outline"
                size="md"
                rounded="full"
                onClick={handleClick.myPage}
              >
                나의 깃로그
              </Button>
              <Button
                variant="primary-outline"
                size="md"
                rounded="full"
                onClick={handleClick.write}
              >
                깃로그 쓰기
              </Button>
            </FlexRow>
          ) : (
            <Button
              variant="primary-outline"
              size="md"
              rounded="full"
              onClick={() => openModal('login')}
            >
              깃로그 시작하기
            </Button>
          )}
        </SidebarContent>

        {/* 하단 섹션 */}
        {isLoggedIn && (
          <FlexRow>
            <Button variant="secondary" size="sm" rounded="full">
              설정
            </Button>
            <Button variant="secondary" size="sm" rounded="full" onClick={handleClick.logout}>
              로그아웃
            </Button>
          </FlexRow>
        )}
      </SidebarWrapper>
    </>
  );
};

export default SideBar;
