import React from 'react'

const Search = ({searchName, handleChange}) => {
  return (
    <div>
        <label>Filter shown with</label>
        <input 
            value={searchName}
            onChange={handleChange}
        />
    </div>
  )
}

export default Search