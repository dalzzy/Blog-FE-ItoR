import styled, { css } from 'styled-components';
import { flexColumn } from '@/styles/common.styled';
import { FONT_SIZE_TYPE, FONT_WEIGHT_TYPE } from '@/styles/theme.styled';

export const TextareaWrapper = styled.div`
  ${flexColumn}
  gap: 16px;
  width: 100%;
`;

export const StyledTextarea = styled.textarea<{
  hasBorder: boolean;
  readOnly?: boolean;
  placeholderColor?: string;
  placeholderSize?: FONT_SIZE_TYPE;
  placeholderWeight?: FONT_WEIGHT_TYPE;
  inputColor?: string;
  inputSize?: FONT_SIZE_TYPE;
  inputWeight?: FONT_WEIGHT_TYPE;
}>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 4px;
  resize: none;
  overflow: hidden;

  color: ${({ inputColor, theme }) => inputColor ?? theme.COLORS.black};
  font-size: ${({ inputSize, theme }) => theme.FONT_SIZE[inputSize ?? 'md']};
  font-weight: ${({ inputWeight, theme }) => theme.FONT_WEIGHT[inputWeight ?? 'regular']};

  background-color: ${({ readOnly, theme }) =>
    readOnly ? theme.COLORS.gray[90] : theme.COLORS.white};

  ${({ hasBorder, theme }) =>
    hasBorder
      ? css`
          border: 1px solid ${theme.COLORS.gray[78]};
        `
      : css`
          border: none;
        `};

  ${({ readOnly }) =>
    readOnly &&
    css`
      cursor: not-allowed;
      pointer-events: none;
    `}

  &::placeholder {
    color: ${({ placeholderColor, theme }) => placeholderColor ?? theme.COLORS.gray[78]};
    font-size: ${({ placeholderSize, theme }) => theme.FONT_SIZE[placeholderSize ?? 'md']};
    font-weight: ${({ placeholderWeight, theme }) =>
      theme.FONT_WEIGHT[placeholderWeight ?? 'regular']};
  }

  &:focus {
    outline: none;
  }
`;
