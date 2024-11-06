const StatisticsLine = ({ label, value }) => {
  return (
    <tr>
      <th>{label}</th>
      <td>{value}</td>
    </tr>
  );
};

export default StatisticsLine;
