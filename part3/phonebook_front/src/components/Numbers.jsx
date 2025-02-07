import Button from './Button'

const Numbers = ({ persons, filter, handler }) => persons.filter((person => person.name.includes(filter))).map(person => {
    return <div>
        <p key={person.id}>{person.name} {person.number}</p>
        <Button text={"delete button " + person.id} number handler={() => handler(person.id)} />
    </div>
})


export default Numbers