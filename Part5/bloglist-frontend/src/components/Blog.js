import { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) =>  {
  const [detail, setDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteStyle = {
    color: 'red'
  }

  const toggleDetail = () => {
    setDetail(!detail)
  }

  const increaseLike = async (id) => {
    console.log('blog id: ', id)
    let like = blog.likes
    like++
    const updatedBlog = {
      likes: like
    }

    await blogService.update(id, updatedBlog)
    const response = await blogService.getAll()
    setBlogs(response)
  }

  const deleteBlog = async (id, title, author) => {
    console.log('event: ', id, title,author)

    const confirmation = await window.confirm(`Remove ${title} by ${author}`)
    if(confirmation) {
      await blogService.deleteBlog(id)
      const response = await blogService.getAll()
      setBlogs(response)
    }
  }

  if(user !== null) {
    return (
      <>
        {!detail ?
          <div style={blogStyle} className='blog'>
            {blog.title} {blog.author}
            <button onClick={toggleDetail}>view</button>
          </div> :
          <div style={blogStyle} className='blogDetail'>
            {blog.title} <button onClick={toggleDetail}>hide</button> <br />
            {blog.url} <br />
              Likes {blog.likes} <button onClick={() => increaseLike(blog.id)} className='like'>like</button> <br />
            {blog.author}
            {blog.user.id === user.id && <p><button style={deleteStyle} onClick={() => deleteBlog(blog.id, blog.title, blog.author)} className='delete'>delete</button></p>}
          </div>
        }
      </>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog