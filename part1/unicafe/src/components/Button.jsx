const Button = ({label, handleClick}) => {
    return <button onClick={() => handleClick(label)}>{label}</button>
}

export default Button 