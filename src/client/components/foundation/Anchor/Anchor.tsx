import type { ComponentPropsWithoutRef, FC } from 'react';
import { Link } from 'react-router-dom';

import * as styles from './Anchor.styles';

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'className'>;

export const Anchor: FC<Props> = ({ children, href, ...rest }) => {
  const isExternal = /^https?:\/\//.test(href ?? '');

  if (isExternal) {
    return (
      <a className={styles.container()} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link className={styles.container()} to={href ?? ''} {...rest}>
      {children}
    </Link>
  );
};
