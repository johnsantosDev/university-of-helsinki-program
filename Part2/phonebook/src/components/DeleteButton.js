import React from 'react'

import personService from '../services/persons'

const DeleteButton = ({person, fetchData}) => {

    const deletePerson = () => {
        if(window.confirm(`Delete ${person.name} ?`))
        console.log(person)
        personService
            .deletePerson(person.id)
            .then(response => response.status === 200 ? fetchData : console.log('error'))
    }

  return (
    <>
        <button onClick={deletePerson}>delete</button>
    </>
  )
}

export default DeleteButton