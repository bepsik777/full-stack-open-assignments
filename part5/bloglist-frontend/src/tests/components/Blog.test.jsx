import { expect, test, vi } from 'vitest'
import Blog from '../../components/Blog'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const blog = {
  name: 'test',
  author: 'test',
  url: 'www.test.com',
  like: 69,
  user: {username: 'test', id: 'test'}
}

test('does not render blog url or likes by default', async () => {  
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.expanded-blog-data')  
  expect(div).toBeNull()
})

test('url and likes are rendered when show button is clickd', async () => {
  const testUser = {id: 'test'}
  const { container } = render(<Blog blog={blog} user={testUser}/>)
  const showButton = container.querySelector('.show-blog-details')
  const user = userEvent.setup()
  await user.click(showButton)
  const likes = screen.getByText('69')
  const url = screen.getByText('www.test.com')
  expect(likes).toBeDefined()
  expect(url).toBeDefined()  
})

test('event handler called twice when like button clicked twice', async () => {
  const testUser = {id: 'test'}
  const mockHandler = vi.fn()
  const { container } = render(<Blog blog={blog} user={testUser} onLike={mockHandler}/>)
  const showButton = container.querySelector('.show-blog-details')
  const user = userEvent.setup()
  await user.click(showButton)
  const likeButton = screen.getByRole('button', {name: 'like'})
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls.length).toBe(2)  
})
