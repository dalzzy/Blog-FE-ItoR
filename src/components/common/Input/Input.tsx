import {
  ErrorText,
  IconWrapper,
  InputBox,
  InputWrapper,
  Label,
  StyledInput,
} from '@/components/common/Input/Input.styled';
import theme from '@/styles/theme.styled';
import { forwardRef } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  errorMessage?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClick?: () => void;
  readOnly?: boolean;
  disabled?: boolean;
  textColor?: string;
  borderColor?: string;
  icon?: React.ReactNode;
  readOnlyTextColor?: string;
  readOnlyBgColor?: string;
  fontSize?: keyof typeof theme.FONT_SIZE;
  inputPadding?: string;
  readOnlyBorderColor?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      type = 'text',
      errorMessage,
      value,
      onChange,
      readOnly = false,
      disabled = false,
      textColor,
      borderColor,
      icon,
      readOnlyTextColor,
      readOnlyBgColor,
      fontSize,
      inputPadding,
      readOnlyBorderColor,
      ...props
    },
    ref,
  ) => {
    return (
      <InputWrapper>
        {label && <Label>{label}</Label>}
        <InputBox>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          <StyledInput
            ref={ref}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            disabled={disabled}
            textColor={textColor}
            borderColor={borderColor}
            hasIcon={!!icon}
            readOnlyTextColor={readOnlyTextColor}
            readOnlyBgColor={readOnlyBgColor}
            fontSize={fontSize}
            inputPadding={inputPadding}
            readOnlyBorderColor={readOnlyBorderColor}
            {...props}
          />
        </InputBox>
        {errorMessage && <ErrorText>*{errorMessage}</ErrorText>}
      </InputWrapper>
    );
  },
);

export default Input;
