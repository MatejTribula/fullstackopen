const Country = ({ data, weather }) => {

    return <div>

        <h2>{data.name.common}</h2>
        <p>capital {data.capital}</p>
        <p>area {data.area}</p>

        <h3>languages</h3>
        {Object.values(data.languages).map((language, index) => <p key={index}>{language}</p>)}

        <img src={data.flags.png} alt="flag" />

        <h3>Weather in {data.name.capital}</h3>

        {weather !== undefined
            ? <>
                <p>temp: {Math.round(weather.main.temp - 273.15)} celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />

                <p>wind: {weather.wind.speed} m/s</p>
            </>
            : <>
                <p>no data yet</p>
            </>}

    </div>
}

export default Country