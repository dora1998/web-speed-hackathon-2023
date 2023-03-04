import type { FC } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import { Fallback } from '../../../pages/Fallback';
import { Footer } from '../../navigators/Footer/Footer';
import { Header } from '../../navigators/Header/Header';
import { useScrollToTop } from '../Routes/hooks';

import * as styles from './Layout.styles';

export const Layout: FC = () => {
  useScrollToTop();

  return (
    <>
      <Header />
      <main className={styles.container()}>
        <ErrorBoundary fallbackRender={Fallback}>
          <Suspense fallback={<div style={{ height: '100vh' }} />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};
