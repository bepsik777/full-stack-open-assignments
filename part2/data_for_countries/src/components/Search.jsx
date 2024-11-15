const Search = ({value, setValue}) => {
    return (
        <form action="#">
            <label htmlFor="filter">Find countries</label>            
            <input type="text" id="filter" value={value} onChange={setValue} />
        </form>
    )
}

export default Search