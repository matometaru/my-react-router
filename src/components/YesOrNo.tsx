// import { useSuspenseQuery } from '@tanstack/react-query';

// const fetchYesOrNo = async (): Promise<string> => {
//   const response = await fetch("https://yesno.wtf/api");
//   const data = await response.json();
//   return data.answer;
// };

// const fetchYesOrNoError = async (): Promise<string> => {
//   const response = await fetch("https://yesno.wtf/api123");
//   const data = await response.json();
//   return data.answer;
// };

const YesOrNo = () => {
  throw new RangeError('Error in YesOrNo 123');

  // const { data: answer } = useSuspenseQuery({
  //   queryKey: ['yesOrNo'],
  //   queryFn: fetchYesOrNo,
  //   retry: false,
  // });

  // const handleClicked = async () => {
  //   await fetchYesOrNoError()
  // }

  return (
    <>
      {/* <p>{answer}</p>
      <button onClick={handleClicked}>click</button> */}
    </>
  );
};

export default YesOrNo;