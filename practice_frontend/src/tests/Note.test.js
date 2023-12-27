import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from '../components/Note'

const note = {
  content: 'Component testing is done with react-testing-library',
  important: true
}

test('renders content', () => {
  //   render(<Note note={note} />)
  //   const element = screen.getByText('Component testing is done with react-testing-library')
  //   expect(element).toBeDefined()

  const { container } = render(<Note note={note}/>)
  const div = container.querySelector('.note')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')

  screen.debug()
  screen.debug(div)
})

test('clickling the button calls event handler once', async () => {
  const mockHandler = jest.fn()
  //console.log('mockHandler: ', mockHandler)

  render(<Note note={note} toggleImportance={mockHandler}/>)

  const user = userEvent.setup()
  //console.log('user: ', user)

  const button = screen.getByText('make not important')
  //console.log('button: ', button)

  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)

  console.log('mock hanlder: ', mockHandler.mock.calls)
})

test('does not render this', () => {
  const note = {
    content: 'This is a reminder',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})