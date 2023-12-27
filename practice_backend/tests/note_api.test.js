import mongoose from 'mongoose'
import supertest from 'supertest'

import app from '../app'
import Note from '../models/note'
import test_helper from './test_helper'

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(test_helper.initialNotes[0])
  await noteObject.save()
  noteObject = new Note(test_helper.initialNotes[1])
  await noteObject.save()
})

describe('api testing', () => {
    test('notes are returned as json', async () => {
        await api
          .get('/api/notes')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      }, 100000)

      test('all notes are returned', async () => {

        const notes = await test_helper.notesInDb() 
      
        expect(notes).toHaveLength(test_helper.initialNotes.length)
      })
      
      test('a specific note is within the returned notes', async () => {
        
        const notes = await test_helper.notesInDb()

        const contents = notes.map(note => note.content)
      
        expect(contents).toContain('HTML is easy')
      })

      test('a valid note can be added', async () => {
        const newNote = {
          content: 'github is good for developers',
          important: true
        }

        await api
          .post('/api/notes')
          .send(newNote)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const notes = await test_helper.notesInDb()

        const contents = notes.map(note => note.content)

        expect(contents).toHaveLength(test_helper.initialNotes.length + 1)
        expect(contents).toContain('github is good for developers')
      })

      test('notes without content will not be saved to database', async () => {
        const newNote = {
          important: false
        }

        await api
          .post('/api/notes')
          .send(newNote)
          .expect(400)
        
        const notes = await test_helper.notesInDb()

        expect(notes).toHaveLength(test_helper.initialNotes.length)
      })

      test('a specific note can be viewed', async () => {
        const notesAtStart = await test_helper.notesInDb()

        const noteToView = notesAtStart[0]

        const resultNote = await api
          .get(`/api/notes/${noteToView.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)
        
        const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

        expect(resultNote.body).toEqual(processedNoteToView)

      })

      test('a note can be deleted', async () => {
        const notesAtStart = await test_helper.notesInDb()

        const noteToDelete = notesAtStart[0]

        await api
          .delete(`/api/notes/${noteToDelete.id}`)
          .expect(204)
        
        const notesAtEnd = await test_helper.notesInDb()

        const contents = notesAtEnd.map(note => note.content)

        expect(notesAtEnd).toHaveLength(test_helper.initialNotes.length - 1)
        expect(contents).not.toContain(noteToDelete.content)

      })
})

afterAll(() => {
  mongoose.connection.close()
})
