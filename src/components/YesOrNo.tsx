import { useState, useEffect } from "react";

const fetchYesOrNo = async (): Promise<string> => {
  const response = await fetch("https://yesno.wtf/api");
  const data = await response.json();
  return data.answer;
}

const YesOrNo = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [answer, setAnswer] = useState("")

  useEffect(() => {
    setIsLoading(true)
    fetchYesOrNo()
      .then((answer) => {
        setAnswer(answer)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) { return <p>Loading...</p> }
  return (
      <p>{answer}</p>
  );
}
export default YesOrNo;
