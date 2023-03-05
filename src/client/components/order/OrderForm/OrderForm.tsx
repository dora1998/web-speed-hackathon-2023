import type { FC } from 'react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useZipcode } from '../../../hooks/useZipcode';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { RhfTextInput } from '../../foundation/RhfTextInput/RhfTextInput';

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
  const { control, handleSubmit, setValue } = useForm<OrderFormValue>({
    defaultValues: {
      city: '',
      prefecture: '',
      streetAddress: '',
      zipCode: '',
    },
  });
  const rawZipCode = useWatch({ control, name: 'zipCode' });
  const { zipcode } = useZipcode(rawZipCode);

  useEffect(() => {
    if (zipcode == null) {
      return;
    }

    const address = [...zipcode.address];
    const prefecture = address.shift();
    const city = address.join(' ');

    setValue('prefecture', prefecture ?? '');
    setValue('city', city);
  }, [setValue, zipcode]);

  return (
    <div className={styles.container()}>
      <form className={styles.form()} data-testid="order-form" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputList()}>
          <RhfTextInput required control={control} label="郵便番号" name="zipCode" placeholder="例: 1500042" />
          <RhfTextInput required control={control} label="都道府県" name="prefecture" placeholder="例: 東京都" />
          <RhfTextInput required control={control} label="市区町村" name="city" placeholder="例: 渋谷区宇田川町" />
          <RhfTextInput
            required
            control={control}
            label="番地・建物名など"
            name="streetAddress"
            placeholder="例: 40番1号 Abema Towers"
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
