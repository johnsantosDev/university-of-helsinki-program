import React from 'react'

import '../index.css'

const Notification = ({message, operation}) => {

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
 
    if(message === null) {
        return null
    }

  return (
    <>
        {
            operation
            ? <div style={successStyle}>{message}</div>
            : <div style={failStyle}>{message}</div>
        }
    </>
  )
}

export default Notification