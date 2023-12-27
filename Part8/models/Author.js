import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  bookCount: {
    type: Number,
    default: 0
  },
  born: {
    type: Number,
  },
})

const Author = mongoose.model('Author', authorSchema)
export default Author