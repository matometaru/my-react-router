import {
  Button,
  Input,
  InputNumber
} from "antd";
import { useForm, useFieldArray, useWatch, Control, Controller } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().min(1, '足りへん'),
  itemRows: z.array(z.object({
    itemName: z.string().min(1, 'Required'),
    unitPrice: z.number().min(1, 'Required'),
    quantity: z.number().min(1, 'Required'),
    amount: z.number().min(1, 'Required'),
    taxAmount: z.number().min(1, 'Required'),
  })),
});

// FormValues の型
type FormValues = {
  email: string;
  itemRows: {
    itemName: string;
    unitPrice: number;
    quantity: number;
    amount: number;
    taxAmount: number;
  }[];
};

// すべてのアイテムの金額を合計する TotalAmount コンポーネント
const TotalAmount = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "itemRows",
    control
  });
  const total = formValues.reduce(
    (acc, { unitPrice, quantity }) => acc + (unitPrice || 0) * (quantity || 0),
    0
  );
  return (
    <div>
      {total}
      <small>円</small>
    </div>
  );
};

// すべてのアイテムの消費税を合計する TotalTaxAmount コンポーネント
const TotalTaxAmount = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "itemRows",
    control
  });
  const total = formValues.reduce(
    (acc, { unitPrice, quantity }) =>
      acc + Math.floor(((unitPrice || 0) * (quantity || 0) * 10) / 100),
    0
  );
  return (
    <div>
      {total}
      <small>円</small>
    </div>
  );
};

// すべてのアイテムの小計 + 消費税を合計する TotalTaxAmount コンポーネント
const AllTotalAmount = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "itemRows",
    control
  });
  const total = formValues.reduce(
    (acc, { unitPrice, quantity }) =>
      acc +
      (unitPrice || 0) * (quantity || 0) +
      Math.floor(((unitPrice || 0) * (quantity || 0) * 10) / 100),
    0
  );
  return (
    <div>
      {total}
      <small>円</small>
    </div>
  );
};

const InvoiceTable = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isValid, errors }
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      itemRows: [{ itemName: "シュークリーム", quantity: 1, unitPrice: 200 }]
    },
    mode: "onBlur", // バリデーションはblurイベントでトリガーされる。
    resolver: zodResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    name: "itemRows",
    control
  });
  const values = watch();

  // itemRowsの入力状態を監視させる
  const watchFieldArray = watch("itemRows");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });
  const onSubmit = (data: FormValues) => console.log(data);
  
  return (
    <div>
      {JSON.stringify(values, null, 2)}
      <div>
        <input {...register("email")} />
        {errors.email && <p>{errors.email.type}</p>}
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <thead>
            <tr>
              <th>アイテム名</th>
              <th>単価</th>
              <th>数量</th>
              <th>金額</th>
              <th>消費税</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            {controlledFields.map((field, index) => {
              return (
                <tr key={field.id}>
                  <td>
                    <input
                      placeholder="アイテムを入力して下さい"
                      {...register(`itemRows.${index}.itemName` as const, {
                        required: true
                      })}
                      className="border-2 border-gray-500"
                    />
                  </td>
                  <td>
                    <Controller
                      name={`itemRows.${index}.unitPrice`}
                      control={control}
                      render={({ field }) => (
                        <InputNumber {...field} placeholder="アイテムを入力して下さい" />
                      )}
                    />
                  </td>
                  <td>
                    <input
                      placeholder="quantity"
                      type="number"
                      {...register(`itemRows.${index}.quantity` as const, {
                        valueAsNumber: true,
                        required: true
                      })}
                      min="0"
                      max="10"
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      {...register(`itemRows.${index}.amount` as const, {
                        valueAsNumber: true,
                        required: true
                      })}
                      value={(field.unitPrice || 0) * (field.quantity || 0)}
                      {...register(`itemRows.${index}.amount` as const, {
                        valueAsNumber: true,
                        required: true
                      })}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      {...register(`itemRows.${index}.taxAmount` as const, {
                        valueAsNumber: true,
                        required: true
                      })}
                      value={Math.floor(
                        ((field.unitPrice || 0) * (field.quantity || 0) * 10) /
                          100
                      )}
                      {...register(`itemRows.${index}.taxAmount` as const, {
                        valueAsNumber: true,
                        required: true
                      })}
                      width="16"
                    />
                  </td>
                  <td>
                    {/* クリックで行を削除するIconButtonを2行目から表示 */}
                    {index > 0 && (
                      <Button onClick={() => remove(index)}>削除</Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button
          onClick={() =>
            append({
              itemName: "",
              quantity: 0,
              unitPrice: 0,
              amount: 0,
              taxAmount: 0
            })
          }
        >
          行を追加
        </Button>
        <div>
          <table>
            <tbody>
              <tr>
                <th>
                  小計
                </th>
                <td>
                  <TotalAmount control={control} />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>
                  消費税
                </th>
                <td>
                  <TotalTaxAmount control={control} />
                </td>
              </tr>
              <tr>
                <th>
                  合計
                </th>
                <td>
                  <AllTotalAmount control={control} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button disabled={!isValid}>
          送信
        </Button>
      </form>
    </div>
  );
};

export default function App() {
  return <InvoiceTable />;
}
