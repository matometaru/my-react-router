import { useState, useEffect } from 'react';
import { Select, Flex } from 'antd'
import dayjs from 'dayjs';

import FieldWrapper, { FieldWrapperProps } from './FieldWrapper';

const years = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

type BirthdayProps = {
  onChange?: (xxx: { birthday: string, age: number }) => void
};

const Birthday = ({ onChange }: BirthdayProps) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const calculateAge = (dateString: any) => {
    return dayjs().diff(dayjs(dateString), 'year');
  };

  const updateBirthdayAndAge = () => {
    if (year && month && day) {
      const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      onChange?.({
        birthday: formattedDate,
        age: calculateAge(formattedDate)
      });
    }
  };

  useEffect(updateBirthdayAndAge, [year, month, day]);

  return (
    <Flex align="baseline">
      <Select value={year} onChange={setYear}>
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </Select>
      <span>年</span>

      <Select value={month} onChange={setMonth}>
        <option value="">Month</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>
      <span>月</span>

      <Select value={day} onChange={setDay}>
        <option value="">Day</option>
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </Select>
      <span>日</span>
    </Flex>
  );
};

type Props = {
  onChange?: ({ birthday, age }: { birthday: string, age: number }) => void
} & Omit<FieldWrapperProps, 'renderField'>;
const MyBirthday = ({ name, label, onChange }: Props) => {
  return (
    <FieldWrapper
      name={name}
      label={label}
      renderField={(field) => (
        <Birthday
          {...field}
          onChange={onChange}
        />
      )}
    />
  );
};

export default MyBirthday;
