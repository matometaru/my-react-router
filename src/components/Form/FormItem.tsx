// import './FormItem.scss';

import { Controller, useFormContext } from 'react-hook-form';
import classNames from 'classnames';

type FormItemProps = {
  name: string;
  label?: string;
  defaultValue?: any;
  rules?: any;
  onChange?: any;
  component: React.ComponentType<any>;
};

const getNestedError = (errors: any, path: any) => {
  return path.split('.').reduce((obj: any, key: string) => obj && obj[key], errors);
};

const FormItem = ({ name, defaultValue = '', label, rules, component: Component, ...props }: FormItemProps) => {
  const { control, formState: { errors } } = useFormContext();
  const error = getNestedError(errors, name);
  
  return (
    <div className="FormItem">
      {label && <label htmlFor={name} className="FormItem__label">{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <Component
            field={field}
            {...field}
            {...props}
            onChange={(e: any) => {
              props.onChange?.(e);
              field.onChange(e);
            }}
          />
        )}
      />
      {error?.message && (
        <>
          <p className="errorMessage">{String(error.message)}</p>
          <div className="errorMessage__offset" />
        </>
      )}
    </div>
  );
};

export default FormItem;
