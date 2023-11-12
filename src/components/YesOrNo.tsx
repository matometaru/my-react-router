import { useSuspenseQuery } from '@tanstack/react-query';
import { useErrorHandler } from 'react-error-boundary'

const fetchYesOrNo = async (): Promise<string> => {
  const response = await fetch("https://yesno.wtf/api");
  const data = await response.json();
  return data.answer;
};

const fetchYesOrNoError = async (): Promise<string> => {
  const response = await fetch("https://yesno.wtf/api123");
  const data = await response.json();
  return data.answer;
};

const YesOrNo = () => {
  const handleError = useErrorHandler()

  const { data: answer } = useSuspenseQuery({
    queryKey: ['yesOrNo'],
    queryFn: fetchYesOrNo,
    retry: false,
  });

  const handleClicked = async () => {
    try {
      await fetchYesOrNoError()
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <>
      <p>{answer}</p>
      <button onClick={handleClicked}>click</button>
    </>
  );
};

export default YesOrNo;