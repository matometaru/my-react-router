import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';
import { InputNumber } from 'antd'

export type MyInputProps = {
  placeholder?: string;
} & Omit<FieldWrapperProps, 'renderField'>;

const MyInput = ({ name, label, placeholder }: MyInputProps) => {
  return (
    <FieldWrapper
      name={name}
      label={label}
      renderField={(field) => (
        <InputNumber
          {...field}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default MyInput;
