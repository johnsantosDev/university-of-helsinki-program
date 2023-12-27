import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

import CountryInfo from './components/CountryInfo'
import ShowDetail from './components/ShowDetail'

function App() {
  const [countries, setCountries] = useState([])
  const[searchCountry, setSearchCountry] = useState('')
  const [showDetail, setShowDetail] = useState(false)
  //holds index of particular country
  const [countryIndex, setCountryIndex] = useState()
 

  const fetchData = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(fetchData, [])

  const handleChange = (event) => {
     setSearchCountry(event.target.value)
  }

  const filteredCountries = countries.filter(country => {
        if(searchCountry === '') {
          return ''
        } else if(country.name.official.toLowerCase().includes(searchCountry.toLowerCase())) {
          return country
        }
      })
  
  let filteredCountriesLength = filteredCountries.length
  
  return (
    <>
      <div>
        find countries
        <input 
          value={searchCountry}
          onChange={handleChange}
        />
      </div>
      {filteredCountries.map((country, index) => {
        if(filteredCountriesLength === 1) {
          return <CountryInfo key={index} country={country} filteredCountriesLength= {filteredCountriesLength}/>
        } else if(filteredCountriesLength <= 10) {
          return <div key={country.area}>{country.name.common}
                      <button 
                        onClick={() => {
                        setShowDetail(true)
                        setCountryIndex(index)
                      }}>show</button>
                </div>
        } else if(filteredCountriesLength === 0) {
          return ''
        }
      })}

      <ShowDetail showDetail={showDetail} filteredCountries ={filteredCountries} index={countryIndex}/>
      
      {(() => {
        if(filteredCountriesLength > 10) {
          return <p>Too many matches, specify another filter</p>
        } 
      })()}
    </>
  )
}

export default App