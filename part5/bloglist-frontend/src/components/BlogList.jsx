import Blog from "./Blog"

const BlogList = ({blogs}) => {
    return (
        <div>
            <h2>Blogs</h2>
            {blogs.map(blog => <Blog blog={blog} key={blog.id}></Blog>)}
        </div>
    )
}

export default BlogList