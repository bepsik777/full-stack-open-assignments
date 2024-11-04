import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>CourseInfo</div>
      <div>{count}</div>
    </>
  );
}

export default App;
