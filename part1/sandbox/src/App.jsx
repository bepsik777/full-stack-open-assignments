import { useState } from "react";
import Button from './Button'
import Counter from './Counter'

const Hello = ({ name, age }) => {
  const getBornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old. You were born {getBornYear()}
      </p>
    </div>
  );
};

const App = () => {
  const [val, setVal] = useState(0);

  const handleIncrease = () => {
    setVal((val) => val + 1);
  };

  const handleDecrease = () => {
    if (val > 0) {
      setVal((val) => val - 1);
    }
  };

  return (
    <>
      <div>
        <h1>Greetings</h1>
        <Hello name={"Alex"} age={29}></Hello>
        <Hello name={"bejbo"} age={27}></Hello>
        <Counter val={val}></Counter>
        <Button handleClick={handleDecrease} name={"Decrease"}></Button>
        <Button handleClick={handleIncrease} name={"Increase"}></Button>
      </div>
    </>
  );
};

export default App;
