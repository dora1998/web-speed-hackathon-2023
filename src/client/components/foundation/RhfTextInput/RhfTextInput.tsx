import type { ComponentProps } from 'react';
import type { ControllerProps, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { TextInput } from '../TextInput';

type Props<T extends FieldValues, U extends Path<T>> = Omit<ControllerProps<T, U>, 'render'> &
  Omit<ComponentProps<typeof TextInput>, 'value' | 'onChange'>;

export const RhfTextInput = <
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
      render={({ field }) => <TextInput {...field} {...rest} />}
      rules={rules}
    ></Controller>
  );
};
