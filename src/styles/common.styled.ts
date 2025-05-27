import styled, { css } from 'styled-components';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexAlignCenter = css`
  display: flex;
  align-items: center;
`;

export const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const flexJustifyCenter = css`
  display: flex;
  justify-content: center;
`;

export const ButtonWrapper = styled.div`
  ${flexAlignCenter}
  gap:8px;
`;
