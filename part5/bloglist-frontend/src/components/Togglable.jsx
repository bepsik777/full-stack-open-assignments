import { useState } from 'react'

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = visible ? '' : 'none'
  const hideWhenVisible = visible ? 'none' : ''

  return (
    <div>
      <div>
        <button style={{ display: hideWhenVisible }} onClick={() => setVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={{ display: showWhenVisible }}>{children}</div>
    </div>
  )
}

export default Togglable
