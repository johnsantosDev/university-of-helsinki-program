import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import FavoriteGenre from './components/FavoriteGenre'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loggedInUser = localStorage.getItem('token')
    setToken(loggedInUser)
  }, [])

  const logout = () => {
    setPage('logout')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
          ? <span>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommended')}>recommended</button>
              <button onClick={logout}>logout</button>
            </span>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      <Authors show={page === 'authors'}/>
      <Books show={page === 'books'} token={token} setToken={setToken}/>
      {token !== null && <NewBook show={page === 'add'} />}
      {token === null && <Login show={page === 'login'} setToken={setToken}/>}
      <FavoriteGenre show={page === 'recommended'}/>
    </div>
  )
}

export default App
