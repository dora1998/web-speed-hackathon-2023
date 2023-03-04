import type { FC } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

import { useAuthUser } from '../../../hooks/useAuthUser';
import { useOpenModal } from '../../../store/modal';
import { Anchor } from '../../foundation/Anchor';
import { Icon } from '../../foundation/Icon';
import { Image } from '../../foundation/Image';

import * as styles from './Header.styles';

export const Header: FC = () => {
  const { authUserLoading, isAuthUser } = useAuthUser();
  const handleOpenModal = useOpenModal();

  return (
    <header className={styles.container()}>
      <Anchor href="/">
        <div className={styles.logo()}>
          <Image height={32} src="/icons/logo.png" srcSet="/icons/logo.png, /icons/logo@2x.png 2x" width={205} />
        </div>
      </Anchor>
      {!authUserLoading &&
        (isAuthUser ? (
          <Anchor data-testid="navigate-order" href={'/order'}>
            <div className={styles.orderLink()}>
              <Icon color="#222222" height={20} icon={FaShoppingCart} width={20} />
            </div>
          </Anchor>
        ) : (
          <button
            className={styles.signInButton()}
            data-testid="navigate-signin"
            onClick={() => handleOpenModal('SIGN_IN')}
          >
            <Icon color="#222222" height={20} icon={FaUser} width={20} />
          </button>
        ))}
    </header>
  );
};
