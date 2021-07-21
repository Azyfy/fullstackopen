const mongoose = require("mongoose")

/*
process.argv.forEach((val, index) => {
    console.log(`argv ${index}: ${val}`);
  });
*/

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
else if(process.argv.length < 3 && process.argv.length < 6){
    if(!process.argv[3] || !process.argv[4]) {
    console.log("Person name or person number cant be empty. node mongo.js <password> <person name> <person number>")
    process.exit(1)
    }
}
else if (process.argv.length > 5) {
    console.log("Too many arguments. node mongo.js <password> <person name> <person number>")
    process.exit(1)
}



const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.ocw18.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 3) {

    Person.find({}).then( result => {
        console.log("Phonebook:")
        result.forEach( person => {
            console.log(person)
        })
        mongoose.connection.close()
    })

}
else {
    const person = new Person({
        name: `${personName}`,
        number: `${personNumber}`
    })

    person.save().then( result => {
        console.log(`Added ${result.name} number ${result.number} to the phonebook`)
        mongoose.connection.close()
    })
}