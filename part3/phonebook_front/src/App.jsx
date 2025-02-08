import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Notification from './components/Notification.jsx'

import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPerson, setNewPerson] = useState({ name: "", number: "" })
  const [filter, setFilter] = useState('')
  const [nextId, setNextId] = useState(1)
  const [notification, setNotification] = useState({ message: "all good", class: "success" })


  useEffect(() => {
    personService.getAll().then(initialNotes => {
      setPersons(initialNotes)
      setNextId(initialNotes.length + 1)
    })
  }, [])

  const handleNameChange = e => {
    const copyObj = {
      ...newPerson,
      name: e.target.value
    }

    setNewPerson(copyObj)
  }

  const handleNumChange = e => {
    const copyObj = {
      ...newPerson,
      number: e.target.value
    }

    setNewPerson(copyObj)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target);

    const nameMatch = persons.find(person => person.name === newPerson.name)
    const numberMatch = persons.find(person => person.number === newPerson.number)

    if (newPerson.name === '' || newPerson.number === '') {
      const newNotif = { message: "you need to enter both name and number", class: "error" }
      setNotification(newNotif)
      setTimeout(() => setNotification({ message: "", class: "blank" }), 5000)
      return;
    }
    if (nameMatch && numberMatch) {

      const newNotif = { message: `${newName} is already in added to phonebook`, class: "error" }
      setNotification(newNotif)
      setTimeout(() => setNotification({ message: "", class: "blank" }), 5000)
      return
    }

    if (nameMatch && !numberMatch) {
      // console.log("updating existing")
      if (window.confirm(nameMatch.name + " is already in the phoneboock, replace the old number with a new one?")) {
        personService.update(nameMatch.id, newPerson).then(setPersons(persons.map(person => person.name == newPerson.name ? newPerson : person)))
        const newNotif = { message: `${nameMatch.name} has been updated with new number`, class: "success" }
        setNotification(newNotif)
        setTimeout(() => setNotification({ message: "", class: "blank" }), 5000)
        return
      }
    }

    const personToAdd = { ...newPerson, id: nextId }

    personService.create(personToAdd).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewPerson({ name: "", number: "" })
      setNextId(nextId + 1)

      const newNotif = { message: `${newPerson.name} has been added`, class: "success" }
      setNotification(newNotif)
      setTimeout(() => setNotification({ message: "", class: "blank" }), 5000)
    })
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const removeHandler = (id) => {
    console.log(id)
    if (window.confirm("Are you sure you want to delete this person?")) {
      personService.remove(id).then(() => {
        const newNotif = { message: `${persons.find(person => person.id === id).name} has been deleted`, class: "success" }
        setNotification(newNotif)
        setTimeout(() => setNotification({ message: "", class: "blank" }), 5000)
        setPersons(persons.filter(person => person.id !== id))
      }).catch(error => {
        console.log(error)
        const newNotif = { message: `${persons.find(person => person.id === id).name} has already been deleted from the server`, class: "error" }
        setNotification(newNotif)
        setTimeout(() => setNotification({ message: "", class: "blank" }), 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} classN={notification.class} />
      <Filter filter={filter} handler={handleFilter} />
      <h2>add a new</h2>
      <Form person={newPerson} handler={handleSubmit} nameHandler={handleNameChange} numberHandler={handleNumChange} />
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} handler={removeHandler} />
    </div>
  )
}

export default App
