import {
  Button,
  Input,
  InputNumber,
  Checkbox,
  Radio,
} from "antd";
import MyInput from "../components/Form/MyInput";
import { useForm, Controller, FormProvider } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().min(1, 'email required'),
  age: z.number().min(0, '年齢は0以上で入力してください'),
  age2: z.number().min(0, '年齢は0以上で入力してください'),
  sex: z.enum(['male', 'female']),
  favoriteFruits: z.array(z.string()),
});

type FormValues = {
  email: string;
  age: number;
  age2: number;
  sex: 'male' | 'female',
  favoriteFruits: string[];
};

const InvoiceTable = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      email: "",
      age: 0,
      sex: 'female'
    },
    mode: "onBlur", // バリデーションはblurイベントでトリガーされる。
    resolver: zodResolver(schema),
  });
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState,
    formState: { isValid, errors }
  } = methods;

  const values = watch();

  const onSubmit = (data: FormValues) => console.log(data);
  
  return (
    <FormProvider {...methods} >
      {JSON.stringify(values, null, 2)}
      <div>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.type}</p>}
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register(`email`, {
              required: true
            })}
            className="border-2 border-gray-500"
          />
        </div>
        <div>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <>
                <div className="text-xs	text-left">
                  <pre>{JSON.stringify(field, null, 2)}</pre>
                  {/* validationのメッセージを表示するのにformStateを渡す */}
                  <pre>{JSON.stringify(formState.errors['age'], null, 2)}</pre>
                </div>
                <InputNumber {...field} placeholder="年齢を入力してください" />
                <p role="alert" className="text-sm font-semibold text-red-500">
                  {formState.errors['age']?.message}
                </p>
              </>
            )}
          />
        </div>
        <div>
          <MyInput name="age2" label="年齢" placeholder="12" />
        </div>
        {/* <div>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <>
                <div className="text-xs	text-left">
                  <pre>{JSON.stringify(field, null, 2)}</pre>
                  <pre>{JSON.stringify(formState.errors['sex'], null, 2)}</pre>
                </div>
                <Radio.Group {...field}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              </>
            )}
          />
        </div> */}
        {/* <div>
          <Controller
            name="favoriteFruits"
            control={control}
            render={({ field }) => (
              <>
                <div className="text-xs	text-left">
                  <pre>{JSON.stringify(field, null, 2)}</pre>
                  <pre>{JSON.stringify(formState.errors['favoriteFruits'], null, 2)}</pre>
                </div>
                <div>
                  <p>ラベル</p>
                  <Checkbox.Group {...field} options={['Apple', 'Pear', 'Orange']} />
                  <p role="alert" className="text-sm font-semibold text-red-500">
                    {formState.errors['favoriteFruits']?.message}
                  </p>
                </div>
              </>
            )}
          />
        </div> */}
        <Button disabled={!isValid}>
          送信
        </Button>
      </form>
    </FormProvider>
  );
};

export default function App() {
  return <InvoiceTable />;
}
