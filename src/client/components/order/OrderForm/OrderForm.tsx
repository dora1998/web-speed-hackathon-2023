import { useFormik } from 'formik';
import type { FC } from 'react';
import { useEffect } from 'react';

import { useZipcode } from '../../../hooks/useZipcode';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import * as styles from './OrderForm.styles';

type OrderFormValue = {
  zipCode: string;
  prefecture: string;
  city: string;
  streetAddress: string;
};

type Props = {
  onSubmit: (orderFormValue: OrderFormValue) => void;
};

export const OrderForm: FC<Props> = ({ onSubmit }) => {
  const { handleChange, handleSubmit, setFieldValue, values } = useFormik<OrderFormValue>({
    initialValues: {
      city: '',
      prefecture: '',
      streetAddress: '',
      zipCode: '',
    },
    onSubmit,
  });
  const { zipcode } = useZipcode(values.zipCode);

  useEffect(() => {
    if (zipcode == null) {
      return;
    }

    const address = [...zipcode.address];
    const prefecture = address.shift();
    const city = address.join(' ');

    setFieldValue('prefecture', prefecture);
    setFieldValue('city', city);
  }, [setFieldValue, zipcode]);

  return (
    <div className={styles.container()}>
      <form className={styles.form()} data-testid="order-form" onSubmit={handleSubmit}>
        <div className={styles.inputList()}>
          <TextInput
            required
            id="zipCode"
            label="郵便番号"
            onChange={handleChange}
            placeholder="例: 1500042"
            value={values.zipCode}
          />
          <TextInput
            required
            id="prefecture"
            label="都道府県"
            onChange={handleChange}
            placeholder="例: 東京都"
            value={values.prefecture}
          />
          <TextInput
            required
            id="city"
            label="市区町村"
            onChange={handleChange}
            placeholder="例: 渋谷区宇田川町"
            value={values.city}
          />
          <TextInput
            required
            id="streetAddress"
            label="番地・建物名など"
            onChange={handleChange}
            placeholder="例: 40番1号 Abema Towers"
            value={values.streetAddress}
          />
        </div>
        <div className={styles.purchaseButton()}>
          <PrimaryButton size="lg" type="submit">
            購入
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
