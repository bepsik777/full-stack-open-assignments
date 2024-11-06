const Statistics = ({feedbacks}) => {
  return (
    <div>
      <p>good: {feedbacks.good}</p>
      <p>neutral: {feedbacks.neutral}</p>
      <p>bad: {feedbacks.bad}</p>
      <p>total: {feedbacks.total}</p>
      <p>average: {feedbacks.total / 3}</p>
      <p>positive: {feedbacks.total === 0 ? "" : (feedbacks.good / feedbacks.total) * 100 + "%"}</p>
    </div>
  );
};

export default Statistics
