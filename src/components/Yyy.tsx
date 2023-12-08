import {
  Button,
  Input,
  InputNumber,
  Checkbox,
  Radio,
} from "antd";
import MyInput from "../components/Form/MyInput";
import MyBirthday from "../components/Form/MyBirthday";
import { useForm, Controller, FormProvider } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().min(1, 'email required'),
  age: z.number().min(0, '年齢は0以上で入力してください'),
  birthday: z.string()
    .refine((val) => {
      const date = new Date(val);
      const cutoff = new Date('1990-01-01');
      return date >= cutoff;
    }, '誕生日は1990年以降である必要があります'),
  sex: z.enum(['male', 'female']),
  favoriteFruits: z.array(z.string()),
});

type FormValues = {
  email: string;
  age: number;
  birthday: string;
  sex: 'male' | 'female',
  favoriteFruits: string[];
};

const InvoiceTable = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      email: "",
      age: 0,
      birthday: '',
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
          <MyInput name="age" label="年齢" placeholder="12" />
        </div>
        <div>
          <MyBirthday
            name="birthday"
            onChange={(value) => {
              methods.setValue('age', value.age);
              methods.setValue('birthday', value.birthday);
              methods.trigger('age');
              methods.trigger('birthday');
            }}
          />
        </div>
        <div>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <>
                <Radio.Group {...field}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              </>
            )}
          />
        </div>
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
