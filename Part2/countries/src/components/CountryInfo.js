import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Weather from './Weather'

const CountryInfo = ({country, filteredCountriesLength}) => {

  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState(country.capital[0])

  const fetchWeather = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(response => {
        setWeather(response.data)
        setCapital(response.data.name)
      })
  }

  useEffect(fetchWeather, [])

  return (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>Languages: </h2>
        <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png}/>
        {
          (filteredCountriesLength === 1)
          ? <Weather weather={weather} capital={capital}/>
          : ''
        }
        
    </div>
  )
}

export default CountryInfo