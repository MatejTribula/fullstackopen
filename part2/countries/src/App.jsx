import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './components/Country'
import Filter from './components/Filter'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [detail, setDetail] = useState(false)
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    if (filter !== '') {
      // console.log("fired effect")
      axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response) => {
        // console.log("data")
        const filteredCountries = response.data.filter(country => country.name.common.includes(filter))
        const newCountries = filteredCountries.slice(0, 10)

        // console.log(newCountries)
        setCountries(newCountries)
      }).catch(error => console.log(error))
    }
  }, [filter])

  useEffect(() => {
    const APIKEY = import.meta.env.VITE_WEATHER_KEY

    countries.forEach(country => {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital},${country.cca2}&limit=1&appid=${APIKEY}`
      // console.log(geoUrl)
      axios.get(geoUrl).then(response => {
        // console.log(response.data)
        const { lat, lon } = response.data[0];
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
        axios.get(weatherUrl).then(response => {
          // console.log(response.data)
          setWeatherData(weatherData.concat(response.data))
        })
      })
    })
  }, [countries])





  return (
    <div>
      <h1>country search</h1>
      <Filter filter={filter} setFilter={setFilter} />

      {(() => {
        switch (countries.length) {
          case 0:
            return <p>No countries found</p>
            break;
          case 1:

            { console.log(weatherData[0]) }
            return <Country data={countries[0]} weather={weatherData[0]} />

            break;

          case 10:
            return <Country data={countries[0]} weather={weatherData[0]} />
            break;

          default:
            return (
              <div>

                {countries.map((country, index) => (
                  <>
                    {detail ? (
                      <>
                        <Country data={country} />
                        <button onClick={() => setDetail(!detail)}>Click for less detail</button>
                      </>
                    ) : (
                      <>
                        <Country data={country} weather={weatherData[index]} />
                        <button onClick={() => setDetail(!detail)}>Click for more detail</button>
                      </>
                    )}
                  </>

                ))}
              </div>
            )
        }
      })()}
    </div >
  )
}

export default App