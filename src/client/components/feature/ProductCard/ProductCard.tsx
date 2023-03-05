import * as currencyFormatter from 'currency-formatter';
import type { FC } from 'react';
import { useMemo } from 'react';

import type { FeatureItemFragmentResponse } from '../../../graphql/fragments';
import { useActiveOffer } from '../../../hooks/useActiveOffer';
import { Anchor } from '../../foundation/Anchor';
import { AspectRatio } from '../../foundation/AspectRatio';
import { Image } from '../../foundation/Image';
import { ProductOfferLabel } from '../../product/ProductOfferLabel';

import * as styles from './ProductCard.styles';

type Props = {
  product: FeatureItemFragmentResponse['product'];
};

export const ProductCard: FC<Props> = ({ product }) => {
  const { activeOffer } = useActiveOffer(product.offers);
  const price = activeOffer?.price ?? product.price;

  const thumbFilename = useMemo(
    () => product.thumbnail.file.filename.replace(/\.jpg$/, '_thumb.webp'),
    [product.thumbnail.file.filename],
  );

  return (
    <Anchor href={`/product/${product.id}`}>
      <div className={styles.inner()}>
        <div className={styles.image()}>
          <AspectRatio ratioHeight={9} ratioWidth={16}>
            <Image height={126} loading="lazy" src={thumbFilename} width={224} />
          </AspectRatio>
        </div>
        <div className={styles.description()}>
          <p className={styles.itemName()}>{product.name}</p>
          <span className={styles.itemPrice()}>{currencyFormatter.format(price, { code: 'JPY', precision: 0 })}</span>
        </div>
        {activeOffer !== undefined && (
          <div className={styles.label()}>
            <ProductOfferLabel size="base">タイムセール中</ProductOfferLabel>
          </div>
        )}
      </div>
    </Anchor>
  );
};
