// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

// const password = process.argv[2]

// const url =
//     `mongodb+srv://trib:${password}@cluster0.wqnk6.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=cluster0`

// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// // creating
// const personSchema = new mongoose.Schema({
//     name: String,
//     number: Number,
// })

// const Person = mongoose.model('Person', personSchema)

// if (process.argv[4]) {
//     const person = new Person({
//         name: process.argv[3],
//         number: process.argv[4]
//     })

//     person.save().then(result => {
//         console.log('person added!')
//         mongoose.connection.close()
//     })
// }
// else {
//     // fetching
//     console.log("phonebook:")
//     Person.find({}).then(result => {
//         result.forEach(person => {
//             console.log(person.name + " " + person.number)
//         })
//         mongoose.connection.close()
//     })
// }