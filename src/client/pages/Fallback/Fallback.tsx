import type { FC } from 'react';
import { Helmet } from 'react-helmet';

import * as styles from './Fallback.styles';

export const Fallback: FC = () => (
  <>
    <Helmet>
      <title>エラーが発生しました</title>
    </Helmet>

    <div className={styles.container()}>
      <div className={styles.inner()}>
        <p className={styles.mainParagraph()}>エラーが発生しました</p>
        <p className={styles.subParagraph()}>Some error has occurred</p>
      </div>
    </div>
  </>
);
