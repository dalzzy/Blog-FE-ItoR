import { HamburgerSvg, LogoSvg } from '@/assets';
import WriteRight from '@/components/common/Header/WriteRight';
import DetailRight from '@/components/common/Header/DetailRight';
import ActionRight from '@/components/common/Header/ActionRight';
import { HeaderContainer, SectionWrapper } from '@/components/common/Header/Header.styled';
import { useState } from 'react';
import SideBar from '@/components/common/SideBar/SideBar';
import { useNavigate } from 'react-router-dom';

type HeaderVariant = 'default' | 'write' | 'detail' | 'action' | 'edit';

interface HeaderProps {
  variant?: HeaderVariant;
  onClick?: (action: string) => void;
  // action 타입에만 필요한 props
  negativeLabel?: string;
  confirmLabel?: string;
  onClickNegative?: () => void;
  onClickConfirm?: () => void;
}

const renderRightSection = (
  variant: HeaderVariant,
  onClick?: (action: string) => void,
  negativeLabel?: string,
  confirmLabel?: string,
  onClickNegative?: () => void,
  onClickConfirm?: () => void,
) => {
  if (variant === 'action') {
    const isDeleteConfirm = confirmLabel === '게시하기' || negativeLabel === '삭제하기';

    const resolvedConfirmLabel = confirmLabel ?? (isDeleteConfirm ? '게시하기' : '저장하기');
    const resolvedNegativeLabel =
      negativeLabel !== undefined ? negativeLabel : isDeleteConfirm ? '삭제하기' : undefined;

    return (
      <ActionRight
        confirmLabel={resolvedConfirmLabel}
        negativeLabel={resolvedNegativeLabel}
        onClickNegative={onClickNegative ?? (() => {})}
        onClickConfirm={onClickConfirm ?? (() => {})}
      />
    );
  }

  switch (variant) {
    case 'write':
      return <WriteRight />;
    case 'detail':
      return <DetailRight onClick={onClick} />;
    default:
      return null;
  }
};

const Header: React.FC<HeaderProps> = ({
  variant = 'default',
  onClick,
  negativeLabel,
  confirmLabel,
  onClickConfirm,
  onClickNegative,
}) => {
  const nav = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <HeaderContainer>
        <SectionWrapper>
          <HamburgerSvg
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            style={{ cursor: 'pointer' }}
          />
          <LogoSvg onClick={() => nav('/')} style={{ cursor: 'pointer' }} />
        </SectionWrapper>
        <SectionWrapper>
          {renderRightSection(
            variant,
            onClick,
            negativeLabel,
            confirmLabel,
            onClickNegative,
            onClickConfirm,
          )}
        </SectionWrapper>
      </HeaderContainer>

      {isSidebarOpen && <SideBar onClose={() => setIsSidebarOpen(false)} />}
    </>
  );
};

export default Header;
