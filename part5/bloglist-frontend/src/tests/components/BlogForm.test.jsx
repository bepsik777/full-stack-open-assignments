import { expect, test, vi } from 'vitest'
import BlogForm from '../../components/BlogForm'
import blogs from '../../services/blogs'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('../../services/blogs', async () => ({
  default: {
    createBlog: vi.fn().mockResolvedValue({data: {error: 'error test'}}),
  },
}))

const mockHandler = vi.fn()

test('call event handler with appropriate arguments when submited', async () => {
  render(<BlogForm handleBlogs={mockHandler} handleNotification={mockHandler} blogs={[1,2,3]}></BlogForm>)
  const user = userEvent.setup()
  const submitButton = screen.getByRole('button', { name: 'Submit' })
  const nameInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')

  await user.type(authorInput, 'test')
  await user.type(nameInput, 'test')
  await user.type(urlInput, 'test')
  await user.click(submitButton)

  expect(blogs.createBlog).toHaveBeenCalledWith({
    author: 'test',
    name: 'test',
    url: 'test',
  })
})
