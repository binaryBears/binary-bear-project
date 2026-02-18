"use client"
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import {Input} from '@mger/ui_kit_binary_bears'

type InputProps = React.ComponentPropsWithoutRef<typeof Input>

type ControlledInputProps<T  extends FieldValues> = {
  name: FieldPath<T>      // Только существующие поля
  control: Control<T>     // Control для формы типа T
  error?: string // кастомная ошибка извне
} & Omit<InputProps, 'name' | 'error'>

export const ControlledInput = <T extends FieldValues>({
                                                         name,
                                                         control,
                                                         error: customError,
                                                         ...props
                                                       }: ControlledInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          {...props}
          value={field.value ?? ''}
          error={error?.message || customError}
        />
      )} />
  );
};
