const getAnectodeWithMostVotes = (votes) => {
  let indexOfLargest = 0;

  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > votes[indexOfLargest]) {
      indexOfLargest = i;
    }
  }
  return indexOfLargest;
};

export default getAnectodeWithMostVotes