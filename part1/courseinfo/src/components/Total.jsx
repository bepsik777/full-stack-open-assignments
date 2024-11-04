const Total = ({exercises}) => {
    return <p>Number of exercises {exercises.map((prev, cv) => prev + cv, 0)}</p>
}

export default Total