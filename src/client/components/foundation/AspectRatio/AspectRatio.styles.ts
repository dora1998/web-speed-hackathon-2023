import { css } from '@emotion/css';

export const container = ({ h, w }: { w: number | undefined; h: number | undefined }) => css`
  aspect-ratio: ${w} / ${h};
  position: relative;
  width: 100%;
`;
