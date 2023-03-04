import type { FC, ReactNode } from 'react';
import { useRef } from 'react';

import * as styles from './AspectRatio.styles';

type Props = {
  ratioWidth: number;
  ratioHeight: number;
  children: ReactNode;
};

export const AspectRatio: FC<Props> = ({ children, ratioHeight, ratioWidth }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={styles.container({ h: ratioHeight, w: ratioWidth })}>
      {children}
    </div>
  );
};
