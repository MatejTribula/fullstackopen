const Form = ({ person, handler, nameHandler, numberHandler }) => {
    return <form onSubmit={handler}>
        <div>
            name: <input value={person.name} onChange={nameHandler} />
            number: <input value={person.number} onChange={numberHandler} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}

export default Form