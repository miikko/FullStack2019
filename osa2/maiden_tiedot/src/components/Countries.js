import React from 'react'

const Countries = ({ countries, setChosenCountries, setChosenCityName, cityWeather }) => {
    let content = <p>Too many matches, specify another filter</p>
    if (countries.length <= 0) {
        content = <p>No matching countries found</p>
    } else if (countries.length === 1) {
        content = <Country country={countries[0]} cityWeather={cityWeather} />
    } else if (countries.length < 10) {
        content = <table>
            <tbody>
                {countries.map(
                    country =>
                        <tr key={country.alpha2Code}>
                            <td>{country.name}</td>
                            <td>
                                <Button
                                    setChosenCountries={setChosenCountries}
                                    setChosenCityName={setChosenCityName}
                                    country={country}
                                />
                            </td>
                        </tr>
                )}
            </tbody>
        </table>
    }
    return content
}

const Country = ({ country, cityWeather }) => {
    return (
        <>
            <h1>{country.name}</h1>
            <table>
                <tbody>
                    <tr><td>capital {country.capital}</td></tr>
                    <tr><td>population {country.population}</td></tr>
                </tbody>
            </table>
            <h2>languages</h2>
            <ul>
                {country.languages.map(
                    language => <li key={language.name}>{language.name}</li>
                )}
            </ul>
            <img src={country.flag} alt="Country flag" width="500" height="500" />
            <Weather cityWeather={cityWeather} />
        </>
    )
}

const Button = ({ setChosenCountries, setChosenCityName, country }) => {
    const onClickHandler = () => {
        setChosenCountries([country])
        setChosenCityName(country.capital)
    }
    return (
        <button onClick={onClickHandler}>show</button>
    )
}

const Weather = ({ cityWeather }) => {
    //On first Weather-component render, the results from Api request don't 
    //arrive fastenough so this if-statement is required. Otherwise the app
    //will crash since cityWeather is not set. 
    if (Object.keys(cityWeather).length > 0) {
        return (
            <>
                <h2>Weather in {cityWeather.location.name}</h2>
                <p><b>temperature:</b> {cityWeather.current.temp_c} Celsius</p>
                <img src={cityWeather.current.condition.icon} alt="Weather icon" />
                <p>
                    <b>wind:</b> {cityWeather.current.wind_kph} direction {cityWeather.current.wind_dir}
                </p>
            </>
        )
    }
    return (<p>empty</p>)
}

export default Countries