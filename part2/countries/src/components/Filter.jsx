const Filter = ({ filter, setFilter }) => {
    return <>
        <label htmlFor='filter'>look for the countries </label>
        <input type="text" id='filter' value={filter} onChange={(e) => {
            setFilter(e.target.value)
        }} />
    </>
}

export default Filter