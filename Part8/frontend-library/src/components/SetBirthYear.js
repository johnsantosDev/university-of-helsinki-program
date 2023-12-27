import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { All_AUTHORS, EDIT_AUTHOR } from '../queries'

const SetBirthYear = () => {
    const [name, setName] = useState('')
    const [setBornTo, setSetBornTo] = useState('')
  
    const [ editAuthor ] = useMutation(EDIT_AUTHOR)
    const authors = useQuery(All_AUTHORS)
  
    const submit = async (event) => {
      event.preventDefault()
  
      editAuthor({ variables: { name, setBornTo } })
  
      setName('')
      setSetBornTo('')
    }

    if(authors.loading) {
        return <div>loading...</div>
    }
  
    return (
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          {/* <div>
            name
            <input
              value={name}
              onChange={({target}) => setName(target.value)}
            />
          </div> */}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option></option>
            {authors.data.allAuthors.map(author => <option key={author.name}>{author.name}</option>)}
          </select>
          <div>
            born
            <input
              type='number'
              value={setBornTo}
              onChange={({ target }) => setSetBornTo(Number(target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    )
  }

  export default SetBirthYear