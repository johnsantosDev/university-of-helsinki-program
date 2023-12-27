import React from 'react'

import Header from './Header'

const Form = ({addName, newName, newPhoneNumber, handleChange, handleNumberChange}) => {
  return (
    <div>
        <form onSubmit={addName}>
        <Header title={'add a new'}/>
        <div>
          name: 
          <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number:
          <input value={newPhoneNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Form