import mongoose from 'mongoose'

console.log('process:', process.argv)

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

console.log('process.argv after password:', process.argv)
console.log('process.argv[2] after password:', process.argv[2])



const url = `mongodb+srv://fullstack:${password}@cluster0.kjlnuld.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

console.log('Note properties: ', Object.getOwnPropertyNames(Note))

console.log('Note methods: ', Object.getOwnPropertyNames(Note).filter((property) =>  typeof Note[property] === 'function'))

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const note = new Note({
      content: 'HTML is Easy',
      date: new Date(),
      important: true,
    })

    return note.save()
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))