import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URL

console.log(`Connecting to ${url}`)

mongoose
  .connect(url)
  .then(() => {console.log('Connected to database')})
  .catch(err => console.log(`Error connecting to mongodb: ${err.message}`))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d{2}-\d+/.test(v) || /\d{3}-\d+/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required!'],
    minLength: 8
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('phoneBook', personSchema)

export default Person

