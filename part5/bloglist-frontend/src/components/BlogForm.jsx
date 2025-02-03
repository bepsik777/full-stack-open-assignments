import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ handleBlogs, blogs, handleNotification }) => {
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = async (e) => {
    e.preventDefault()
    try {
      const newBlog = await blogService.createBlog({ name, author, url })
      handleNotification(`new blog ${name} was created`)
      handleBlogs([...blogs, newBlog.data])
      setName('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      console.log('error: ', e.response.data.error)
      handleNotification(e.response.data.error)
    }
  }

  return (
    <form action="#" onSubmit={handleBlogCreation}>
      <div>
        <label htmlFor="name">title:</label>
        <input
          type="text"
          value={name}
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          value={author}
          id="author"
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button>Submit</button>
    </form>
  )
}

export default BlogForm
