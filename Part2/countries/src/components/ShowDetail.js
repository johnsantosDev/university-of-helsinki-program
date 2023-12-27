import React from 'react'
import CountryInfo from './CountryInfo'

const ShowDetail = ({showDetail, index, filteredCountries}) => {
    
  return (
    <>
      {showDetail
      ? <CountryInfo country = {filteredCountries[index]}/>
      : ''
    }  
    </>
  )
}

export default ShowDetail