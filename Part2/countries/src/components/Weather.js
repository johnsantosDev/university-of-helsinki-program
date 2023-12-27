import React from 'react'

const Weather = ({weather, capital}) => {
    
  return (
    <div>
        <h2>Weather in {capital}</h2>
        {
            (() => {
                while(weather.name === capital) {
                    return <>
                    <p>temperature {weather.main.temp} Celcious</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
                    <p>wind {weather.wind.speed} m/s</p>
                    </>
                }
            })()
        }
        
    </div>
  )
}

export default Weather