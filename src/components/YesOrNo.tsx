import { useSuspenseQuery } from '@tanstack/react-query';

const fetchYesOrNo = async (): Promise<string> => {
  const response = await fetch("https://yesno.wtf/api123");
  const data = await response.json();
  return data.answer;
};

const YesOrNo = () => {
  const { data: answer } = useSuspenseQuery({
    queryKey: ['yesOrNo'],
    queryFn: fetchYesOrNo,
    retry: false,
  });

  return <p>{answer}</p>;
};

export default YesOrNo;