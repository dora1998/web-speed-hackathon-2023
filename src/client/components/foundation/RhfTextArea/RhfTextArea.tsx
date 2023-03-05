import type { ComponentProps } from 'react';
import type { ControllerProps, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { TextArea } from '../TextArea';

type Props<T extends FieldValues, U extends Path<T>> = Omit<ControllerProps<T, U>, 'render'> &
  Omit<ComponentProps<typeof TextArea>, 'value' | 'onChange'>;

export const RhfTextArea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  control,
  name,
  rules,
  ...rest
}: Props<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <TextArea {...field} {...rest} />}
      rules={rules}
    ></Controller>
  );
};
