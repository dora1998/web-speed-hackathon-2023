import { css } from '@emotion/css';

import { BreakPoint } from '../../../utils/styles';

export const container = () => css`
  background-color: #f4f4f4;
  display: grid;
  gap: 24px;
  margin-top: 40px;
  padding: 32px 24px;
`;

export const itemList = () => css`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (width >= ${BreakPoint.DESKTOP}px) {
    flex-direction: row;
  }
`;

export const item = () => css`
  color: #222222;
  font-size: 14px;
`;
