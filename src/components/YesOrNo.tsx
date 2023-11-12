import { useQuery } from '@tanstack/react-query';

const fetchYesOrNo = async (): Promise<string> => {
  const response = await fetch("https://yesno.wtf/api");
  const data = await response.json();
  return data.answer;
};

const YesOrNo = () => {
  const { data: answer, isLoading, error } = useQuery({
    queryKey: ['yesOrNo'],
    queryFn: fetchYesOrNo,
  });

  if (isLoading) return <p>Loading 2...</p>;
  if (error) return <p>Error occurred!</p>;

  return <p>{answer}</p>;
};

export default YesOrNo;