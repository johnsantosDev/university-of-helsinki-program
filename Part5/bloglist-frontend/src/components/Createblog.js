import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ createBlog, setSuccessMsg, setOperation }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    createBlog(newBlog)
    setSuccessMsg(`a new Blog ${title}! by ${author} added`)
    setTimeout(() => {
      setSuccessMsg(null)
    }, 5000)
    setOperation(true)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <div className='formDiv'>
        <h2>Create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              placeholder="title"
              id='title'
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder='author'
              id='author'
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              placeholder='url'
              id='url'
            />
          </div>
          <button type="submit" id='create'>Create</button>
        </form>
      </div>
    </>
  )
}

CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setSuccessMsg: PropTypes.func.isRequired,
  setOperation: PropTypes.func.isRequired
}
export default CreateBlog