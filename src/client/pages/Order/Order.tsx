import type { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { OrderForm } from '../../components/order/OrderForm';
import { OrderPreview } from '../../components/order/OrderPreview';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useOrder } from '../../hooks/useOrder';
import { useSubmitOrder } from '../../hooks/useSubmitOrder';
import { useUpdateCartItem } from '../../hooks/useUpdateCartItems';

import * as styles from './Order.styles';

export const Order: FC = () => {
  const navigate = useNavigate();

  const { authUser } = useAuthUser();
  const { updateCartItem } = useUpdateCartItem();
  const { submitOrder } = useSubmitOrder();
  const { order } = useOrder();

  const renderContents = () => {
    if (!authUser || order == undefined || order.items.length === 0) {
      return (
        <div className={styles.emptyContainer()}>
          <p className={styles.emptyDescription()}>商品がカートに入っていません</p>
        </div>
      );
    }

    return (
      <div className={styles.container()}>
        <div className={styles.cart()}>
          <h2 className={styles.cartHeading()}>カート</h2>
          <OrderPreview
            onRemoveCartItem={(productId) => {
              updateCartItem({
                variables: {
                  amount: 0,
                  productId,
                },
              });
            }}
            onUpdateCartItem={(productId, amount) => {
              updateCartItem({
                variables: {
                  amount,
                  productId,
                },
              });
            }}
            order={order}
          />
        </div>

        <div className={styles.addressForm()}>
          <h2 className={styles.addressFormHeading()}>お届け先</h2>
          <OrderForm
            onSubmit={(values) => {
              submitOrder({
                variables: {
                  address: `${values.prefecture}${values.city}${values.streetAddress}`,
                  zipCode: values.zipCode,
                },
              }).then(() => {
                navigate('/order/complete');
              });
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>購入手続き</title>
      </Helmet>

      <WidthRestriction>{renderContents()}</WidthRestriction>
    </>
  );
};
