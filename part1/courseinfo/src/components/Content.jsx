const Part = ({ part, exercises }) => {
  return <p>{part + " " + exercises}</p>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part part={part.name} exercises={part.exercises}></Part>)}
    </>
  );
};

export default Content
