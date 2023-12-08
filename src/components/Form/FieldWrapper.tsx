import { Controller, useFormContext, FieldError, ControllerRenderProps } from 'react-hook-form';

export type FieldWrapperProps = {
  name: string;
  label?: string;
  renderField: (field: ControllerRenderProps) => React.ReactNode;
};

const FieldWrapper = ({ name, label, renderField }: FieldWrapperProps) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name] as FieldError | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <p>{label}</p>
          {renderField(field)}
          { error && (
            <p role="alert" className="text-sm font-semibold text-red-500">
              {error.message}
            </p>
          )}
        </>
      )}
    />
  );
};

export default FieldWrapper;
