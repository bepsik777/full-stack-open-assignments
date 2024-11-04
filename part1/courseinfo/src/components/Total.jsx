const Total = ({parts}) => {
    return <p>Number of exercises {parts.reduce((prev, cv) => prev + cv.exercises, 0)}</p>
}

export default Total