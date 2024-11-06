import { useState } from "react";
import getAnectodeWithMostVotes from "./utils/getAnectodesWithMostVotes";
import anecdotes from "./data/anectodes";
import getRandomInt from "./utils/getRandomInteger";

const App = () => {  

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const indexOfAnectodesWithMostVote = getAnectodeWithMostVotes(votes)
  

  const handleClick = () => {
    const random = getRandomInt(0, anecdotes.length);
    setSelected(random);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <h2>Anectode of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <div>
        <button onClick={handleClick}>Get random anectode</button>
        <button onClick={handleVote}>Vote</button>
      </div>

      {votes[indexOfAnectodesWithMostVote] != 0 && (
        <div>
          <h2>Ancectode with most votes</h2>
          <p>{anecdotes[indexOfAnectodesWithMostVote]}</p>
          <p>has {votes[indexOfAnectodesWithMostVote]} votes</p>
        </div>
      )}
    </div>
  );
};

export default App;
