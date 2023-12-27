import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const FavoriteGenre = (props) => {
    const [favoriteGenre, setFavoriteGenre] = useState()
    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])

    const resultUser = useQuery(CURRENT_USER)
    const resultBook = useQuery(ALL_BOOKS)

    useEffect(() => {
        if(resultUser.data) {
            const favGenre = resultUser.data.me.favrouriteGenre
            setFavoriteGenre(favGenre)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultUser.data])

    useEffect(() => {
        if(resultBook.data) {
            const allBooks = resultBook.data.allBooks
            setBooks(allBooks)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultBook.data])

    useEffect(() => {
        if(favoriteGenre) {
            setFilteredBooks(books.filter(book => book.genres.indexOf(favoriteGenre) !== -1))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favoriteGenre])

    if(!props.show) {
        return null
    }

    if(resultBook.loading || resultUser.loading) {
        return <div>Loading...</div>
    }

  return (
    <div>
      <h2>recomendations</h2>
      <div>books in your favorite genre {favoriteGenre}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) =>  {
            return (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
}

export default FavoriteGenre