import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genres, setGenres] = useState(['All genres'])
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 1000
  })
  const [selectedGenre, setSelectedGenre] = useState('All genres')
  const [booksAfterFilter, setBooksAfterFilter] = useState([])

  useEffect(() => {
    if(!result.loading) {
     const booksArray = result.data.allBooks
     setBooks(booksArray)
     booksArray.map(book => 
      book.genres.map(genre => {
        if(genres.indexOf(genre) === -1) {
          console.log(genre)
          genres.push(genre)
        }
      })
     );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books])

  useEffect(() => {
    selectedGenre === 'All genres'
    ? setBooksAfterFilter(books)
    : setBooksAfterFilter(books.filter(book => book.genres.indexOf(selectedGenre) !== -1))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books, selectedGenre])

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      {selectedGenre === 'All genre' && <div>all genres</div>}
      {selectedGenre !== 'All genre' && <div>in genre {selectedGenre}</div>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksAfterFilter.map((a) =>  {
            return (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )})}
        </tbody>
      </table>
      <br />
      {genres.map(g => <button key={g} onClick={() => setSelectedGenre(g)}>{g}</button>)}
    </div>
  )
}

export default Books
