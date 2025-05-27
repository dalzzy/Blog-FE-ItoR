import styled, { css } from 'styled-components';
import {
  ButtonRounded,
  ButtonSize,
  ButtonVariant,
  roundedStyles,
  sizeStyles,
  variantStyles,
} from '@/components/common/Button/Button.styled';
import { flexCenter } from '@/styles/common.styled';
import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  fullWidth?: boolean;
  children: React.ReactNode;
  textColor?: string;
  borderColor?: string;
  height?: string;
  backgroundColor?: string;
}

const StyledButton = styled.button<ButtonProps>`
  ${flexCenter}
  gap:8px;
  white-space: nowrap;

  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};

  color: ${({ variant, textColor, theme }) =>
    variant === 'text' ? (textColor ?? theme.COLORS.black) : 'inherit'};

  ${({ variant }) => variant && variantStyles[variant]};
  ${({ size }) => size && sizeStyles[size]};
  ${({ rounded }) => rounded && roundedStyles[rounded]};
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}

  ${({ variant, borderColor }) =>
    variant === 'text' &&
    borderColor &&
    css`
      border: 1px solid ${borderColor};
    `}

  ${({ variant, height }) =>
    variant === 'text' &&
    height &&
    css`
      height: ${height};
    `}

    ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
    `}

  
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      rounded = 'md',
      fullWidth = false,
      children,
      backgroundColor,
      ...rest
    },
    ref,
  ) => {
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        rounded={rounded}
        fullWidth={fullWidth}
        backgroundColor={backgroundColor}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
