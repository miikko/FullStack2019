import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from "./components/Countries"

const Filter = ({ handleFilterChange, countryName }) => (
  <form>
    find countries
    <input
      value={countryName}
      onChange={handleFilterChange}
    />
  </form>
)

const App = () => {
  const [countryName, setCountryName] = useState("")
  const [countries, setCountries] = useState([])
  const [chosenCountries, setChosenCountries] = useState([])
  const [chosenCityName, setChosenCityName] = useState("")
  const [cityWeather, setCityWeather] = useState([])


  //Get api key from local .env file
  //This file is in filtered in .gitignore so in order to use it 
  //the user needs to create .env file and add their own key:
  //REACT_APP_API_KEY=INSERT_API_KEY_HERE
  const apiKey = process.env.REACT_APP_API_KEY

  const handleFilterChange = (event) => {
    const value = event.target.value
    setCountryName(value)
    const filteredCountries = countries.filter(
      country => country.name.toUpperCase().includes(
        value.toUpperCase()
      )
    )
    setChosenCountries(filteredCountries)
    if (filteredCountries.length === 1) {
      setChosenCityName(filteredCountries[0].capital)
    }
  }

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => { setCountries(response.data) })
  }, [])

  useEffect(() => {
    if (chosenCityName !== "") {
      const url = "http://api.apixu.com/v1/current.json?key="
        .concat(apiKey, "&q=", chosenCityName)
      axios
        .get(url)
        .then(response => { setCityWeather(response.data) })
    }
  }, [chosenCityName])

  return (
    <div>
      <Filter
        handleFilterChange={handleFilterChange}
        countryName={countryName}
      />
      <Countries
        countries={chosenCountries}
        setChosenCountries={setChosenCountries}
        setChosenCityName={setChosenCityName}
        cityWeather={cityWeather}
      />
    </div>
  )
}

export default App;
