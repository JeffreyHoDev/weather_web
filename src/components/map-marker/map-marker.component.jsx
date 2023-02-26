import cloudLogo from '../../assets/cloudy.png'
import lightningRainLogo from '../../assets/lightning-and-rain.png'
import rainingLogo from '../../assets/raining.png'
import sunnyLogo from '../../assets/sunny.png'
import questionMarkLogo from '../../assets/question-mark.png'

import './map-marker.component.styles.css'

const markerWrapperStyle = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer'
}

const MapMarker = ({ query, setForecastData, setQueriedArea }) => {
    let weather = query.weather[0]["main"];
    const setupForecastDetailsHandler = () => {
        setForecastData(query.forecastData)
        setQueriedArea(`${query.local_name.en ? query.local_name.en : ``} ${query.local_name.zh ? query.local_name.zh : ``}`)
    }
    return (
        <>
            {
                weather === "Clouds" ? 
                <div style={markerWrapperStyle} onClick={setupForecastDetailsHandler}><img className='marker-logo' src={cloudLogo}></img></div>
                : weather === "Rain" ? 
                <div style={markerWrapperStyle} onClick={setupForecastDetailsHandler}><img className='marker-logo' src={rainingLogo}></img></div>
                : <div style={markerWrapperStyle} onClick={setupForecastDetailsHandler}><img className='marker-logo' src={questionMarkLogo}></img></div>
            }
        </>
    )
}

export default MapMarker;