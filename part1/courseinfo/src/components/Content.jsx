const Part = ({ part, exercise }) => {
  return <p>{part + " " + exercise}</p>;
};

const Content = ({ parts, exercises }) => {
  return (
    <>
      <Part part={parts[0]} exercise={exercises[0]}></Part>
      <Part part={parts[1]} exercise={exercises[1]}></Part>
      <Part part={parts[2]} exercise={exercises[2]}></Part>
    </>
  );
};

export default Content
