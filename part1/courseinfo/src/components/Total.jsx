const Total = ({parts}) => {
    return <p style={{fontWeight: "bold"}}>Total of {parts.reduce((prev, cv) => prev + cv.exercises, 0)} exercises</p>
}

export default Total