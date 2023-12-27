import React from 'react'

import Person from './Person'

const Filter = ({persons, searchName, fetchData}) => {
  return (
    <div>
        <ul>
        {persons.filter(person => {
          if(searchName === '') {
            return person
          } else if(person.name.toLowerCase().includes(searchName.toLowerCase())) {
            return person
          }
        }).map(person => <Person key={person.id} person={person} fetchData={fetchData}/>)}
      </ul>
    </div>
  )
}

export default Filter