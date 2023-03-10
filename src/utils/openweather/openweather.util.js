export const getGeocode = async(area) => {
    let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=1&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
    let data = await response.json()
    return data
}

export const getHourlyForecast = async(lat,lng) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
    let data = await response.json()
    return data
}

export const getCurrentForecast = async(lat, lng) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
    let data = await response.json()
    return data
}