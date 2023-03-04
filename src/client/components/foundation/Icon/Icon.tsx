import classNames from 'classnames';
import type { FC } from 'react';
import type { IconType } from 'react-icons';

import * as styles from './Icon.styles';

type Props = {
  icon: IconType;
  width: number;
  height: number;
  color: string;
};

export const Icon: FC<Props> = ({ color, height, icon: Icon, width }) => {
  return (
    <span className={classNames(styles.container({ color, height, width }))}>
      <Icon />
    </span>
  );
};
