import classNames from 'classnames';
import type { FC } from 'react';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';

import { AspectRatio } from '../../components/foundation/AspectRatio';
import { DeviceType, GetDeviceType } from '../../components/foundation/GetDeviceType';
import { PrimaryAnchor } from '../../components/foundation/PrimaryAnchor';
import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './OrderComplete.styles';

const RecommendedBlock: FC = () => {
  const { recommendation } = useRecommendation();

  return <ProductHeroImage product={recommendation.product} title={recommendation.product.name} />;
};

export const OrderComplete: FC = () => {
  return (
    <>
      <Helmet>
        <title>購入が完了しました</title>
      </Helmet>

      <GetDeviceType>
        {({ deviceType }) => (
          <WidthRestriction>
            <div className={styles.container()}>
              <div className={styles.notice()}>
                <h2 className={styles.noticeHeading()}>購入が完了しました</h2>
                <AspectRatio ratioHeight={1} ratioWidth={2}>
                  <div className={styles.noticeDescriptionWrapper()}>
                    <p
                      className={classNames(styles.noticeDescription(), {
                        [styles.noticeDescription__desktop()]: deviceType === DeviceType.DESKTOP,
                        [styles.noticeDescription__mobile()]: deviceType === DeviceType.MOBILE,
                      })}
                    >
                      このサイトは架空のサイトであり、商品が発送されることはありません
                    </p>
                  </div>
                </AspectRatio>
              </div>

              <div className={styles.recommended()}>
                <h2 className={styles.recommendedHeading()}>こちらの商品もオススメです</h2>
                <Suspense
                  fallback={
                    <WidthRestriction>
                      <AspectRatio ratioHeight={9} ratioWidth={16}>
                        <div style={{ height: '100%', width: '100%' }} />
                      </AspectRatio>
                    </WidthRestriction>
                  }
                >
                  <RecommendedBlock />
                </Suspense>
              </div>

              <div className={styles.backToTopButtonWrapper()}>
                <PrimaryAnchor href="/" size="lg">
                  トップへ戻る
                </PrimaryAnchor>
              </div>
            </div>
          </WidthRestriction>
        )}
      </GetDeviceType>
    </>
  );
};
