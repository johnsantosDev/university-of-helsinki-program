import Note from "../models/note";
import User from "../models/user";

const initialNotes = [
    {
      content: 'HTML is easy',
      date: new Date(),
      important: false,
    },
    {
      content: 'Browser can execute only Javascript',
      date: new Date(),
      important: true,
    },
  ]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
    const response = await Note.find({})
    return response.map(note => note.toJSON())
}

const usersInDb = async () => {
  const response = await User.find({})
  return response.map(user => user.toJSON())
}

export default {
    initialNotes,
    nonExistingId,
    notesInDb,
    usersInDb
}