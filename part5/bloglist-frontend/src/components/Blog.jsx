import { useState } from 'react'

const Blog = ({ blog, onLike, onDelete, user }) => {
  const [isHidden, setIsHidden] = useState(true)      

  return (
    <div className='blog-wrapper'>
      <div className="blog-title" data-testid="blog-title">
        <p>
          {blog.name}
          {blog.author}
        </p>
        <button onClick={() => setIsHidden(!isHidden)} className='show-blog-details'>
          {isHidden ? 'view' : 'hide'}
        </button>
      </div>
      {!isHidden && (
        <div className='expanded-blog-data'>
          <p>{blog.url}</p>
          <p className='blog-likes'>{blog.like}<button onClick={() => onLike(blog)}>like</button></p>
          <p>{blog.user.username}</p>
          {user.id === blog.user.id && <button className='blog-delete' onClick={() => onDelete(blog)}>Delete</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
