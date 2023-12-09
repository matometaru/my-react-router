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
        <div className="text-left pb-4">
          { label && (<label className="block text-sm font-semibold mb-1">{label}</label>)}
          {renderField(field)}
          { error && (
            <p role="alert" aria-label={error.message} className="absolute text-sm font-semibold text-red-500">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default FieldWrapper;
