import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, onLike, onDelete, user }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs
        .sort((prev, curr) =>
          prev.like > curr.like ? -1 : prev.like < curr.like ? 1 : 0
        )
        .map((blog) => (
          <Blog
            user={user}
            onDelete={onDelete}
            onLike={onLike}
            blog={blog}
            key={blog.id}
          ></Blog>
        ))}
    </div>
  )
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    onLike: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default BlogList
