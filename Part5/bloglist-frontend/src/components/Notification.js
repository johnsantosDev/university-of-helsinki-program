import React from 'react'

const Notification = ({ operation, successMsg, errorMsg }) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const failStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(successMsg === null && errorMsg === null) {
    return null
  }

  return (
    <>
      {operation ?
        <div style={successStyle}>{successMsg}</div> :
        <div style={failStyle} className='error'>{errorMsg}</div>}
    </>
  )
}

export default Notification