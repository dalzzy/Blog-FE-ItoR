import theme from '@/styles/theme.styled';
import Button from '@/components/common/Button/Button';
import { SectionWrapper } from '@/components/common/Header/Header.styled';

interface ActionRightProps {
  negativeLabel?: string;
  confirmLabel: string;
  onClickNegative?: () => void;
  onClickConfirm: () => void;
}

const ActionRight: React.FC<ActionRightProps> = ({
  negativeLabel,
  confirmLabel,
  onClickConfirm,
  onClickNegative,
}) => {
  return (
    <SectionWrapper>
      {negativeLabel && (
        <Button
          variant="text"
          size="xs"
          textColor={theme.COLORS.negative}
          onClick={onClickNegative}
        >
          {negativeLabel}
        </Button>
      )}
      {confirmLabel && (
        <Button variant="text" size="xs" textColor={theme.COLORS.black} onClick={onClickConfirm}>
          {confirmLabel}
        </Button>
      )}
    </SectionWrapper>
  );
};

export default ActionRight;
