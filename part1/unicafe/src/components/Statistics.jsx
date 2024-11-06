import StatisticsLine from "./StatisticsLine";

const Statistics = ({feedbacks}) => {
  return (
    <table>
      <StatisticsLine label={"good"} value={feedbacks.good}></StatisticsLine>
      <StatisticsLine label={"neutral"} value={feedbacks.neutral}></StatisticsLine>
      <StatisticsLine label={"bad"} value={feedbacks.bad}></StatisticsLine>
      <StatisticsLine label={"total"} value={feedbacks.total}></StatisticsLine>
      <StatisticsLine label={"average"} value={feedbacks.total / 3}></StatisticsLine>
      <StatisticsLine label={"positive"} value={(feedbacks.good / feedbacks.total) * 100 + "%"}></StatisticsLine>
    </table>
  );
};

export default Statistics
