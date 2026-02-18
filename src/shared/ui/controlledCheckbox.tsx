"use client"
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Checkbox, CheckboxProps } from '@mger/ui_kit_binary_bears';


type ControlledCheckboxProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
} & Omit<CheckboxProps, 'name' | 'checked' | 'onChange' | 'defaultChecked'>


export const ControlledCheckbox = <T extends FieldValues>({
                                                            name,
                                                            control,
                                                            labelText,
                                                            ...props
                                                          }: ControlledCheckboxProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field}) => (
        <Checkbox
          {...field}
          {...props}
          labelText={labelText}
          checked={field.value}
          onChange={(e) => {
            field.onChange(e.target.checked)
          }}
        />
      )}
    />
  );
};