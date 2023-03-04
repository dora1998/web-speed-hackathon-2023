import classNames from 'classnames';
import type { FC } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { Icon } from '../../foundation/Icon';

import * as styles from './ProductListSlideButton.styles';

export const ArrowType = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;
export type ArrowType = typeof ArrowType[keyof typeof ArrowType];

type Props = {
  arrowType: ArrowType;
  disabled: boolean;
  onClick: () => void;
};

export const ProductListSlideButton: FC<Props> = ({ arrowType, disabled, onClick }) => {
  return (
    <button
      className={classNames(styles.container(), {
        [styles.container__disabled()]: disabled,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {arrowType === ArrowType.LEFT ? (
        <Icon color="#222222" height={16} icon={FaArrowLeft} width={16} />
      ) : (
        <Icon color="#222222" height={16} icon={FaArrowRight} width={16} />
      )}
    </button>
  );
};
