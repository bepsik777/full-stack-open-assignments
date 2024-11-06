import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics"

const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
  });
  

  const handleFeedback = (label) => {
    label = label.toLowerCase();

    setFeedbacks({
      ...feedbacks,
      [label]: feedbacks[label] + 1,
      total: feedbacks.total + 1
    });
  };

  return (
    <>
      <h2>Give feedback</h2>
      <div>
        <Button handleClick={handleFeedback} label={"Good"}></Button>
        <Button handleClick={handleFeedback} label={"Neutral"}></Button>
        <Button handleClick={handleFeedback} label={"Bad"}></Button>
      </div>
      <h2>Statistics</h2>
      <Statistics feedbacks={feedbacks}></Statistics>
    </>
  );
};

export default App;
