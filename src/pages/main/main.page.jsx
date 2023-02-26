import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './main.page.styles.css'

import GoogleMap from '../../components/google-map/googlemap.component';
import WeatherList from '../../components/weather-listing/weatherlist.component';

import { getGeocode, getHourlyForecast, getCurrentForecast } from '../../utils/openweather/openweather.util';

import { useState, useEffect } from 'react';

const MainPage = () => {

    let [ forecastData, setForecastData ] = useState([])
    let [ queriedList, setQueriedList ] = useState([])
    let [ searchAreaName, setSearchAreaName ] = useState('')
    let [ queriedArea, setQueriedArea ] = useState('Singapore')

    useEffect(() => {
        const getForecast = async () => {
            let forecastData = await getHourlyForecast(1.290270, 103.851959)
            let filteredData = []
            for(let i = 0; i < 3; i++){
                filteredData.push(forecastData.list[i])
            }
            setForecastData([].concat(filteredData))
            let data = await getCurrentForecast(1.290270, 103.851959)
            data.forecastData = filteredData
            data.local_name = {"en": "Singapore"}
            if(queriedList.length <= 10){
                queriedList.push(data)
                setQueriedList([].concat(queriedList))
            }
        }
        getForecast()
    }, [])


    const searchAreaForecast = async() => {
        let geocode = await getGeocode(searchAreaName)
        setQueriedArea(`${geocode[0].local_names.en ? geocode[0].local_names.en : ``} ${geocode[0].local_names.zh ? geocode[0].local_names.zh : ``}`)
        let forecastWeather = await getHourlyForecast(geocode[0].lat, geocode[0].lon)
        let filteredData = []
        for(let i = 0; i < 3; i++){
            filteredData.push(forecastWeather.list[i])
        }
        setForecastData([].concat(filteredData))
        let currentWeather = await getCurrentForecast(geocode[0].lat, geocode[0].lon)
        currentWeather.forecastData = filteredData
        currentWeather.local_name = geocode[0].local_names
        if(queriedList.length <= 10){
            queriedList.push(currentWeather)
            setQueriedList([].concat(queriedList))
        }else {
            alert("You have reached 10 query.")
        }
    }


    return (
        <>
            <div className='main-page-container'>
                <h3>Weather Platform - 3 hours forecast data</h3>
                <div className="area-inputs-container">
                    <Box
                        component="form"
                        noValidate
                        autoComplete="on"
                    >
                        <TextField label="Area Name" variant="outlined" onChange={(e) => setSearchAreaName(e.target.value)}/>
                    </Box>
                    <Button onClick={searchAreaForecast} variant="contained">Query</Button>
                </div>
                <p>Search for area name, it will display on the map (max 10 include default Singapore). The marker on map is clickable so you can look at forecast queried before</p>
                <div className='display-container'>
                    <div className='google-map-container'>
                        <GoogleMap queriedList={queriedList} setForecastData={setForecastData} setQueriedArea={setQueriedArea}/>
                    </div>
                    <div className='weather-info-container'>
                        <h5>{queriedArea}</h5>
                        <p>Data provided through OpenWeather API</p>
                        <WeatherList weatherList={forecastData}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage