import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import cloudLogo from '../../assets/cloudy.png'
import lightningRainLogo from '../../assets/lightning-and-rain.png'
import rainingLogo from '../../assets/raining.png'
import sunnyLogo from '../../assets/sunny.png'

import './weatherlist.component.styles.css'

const WeatherList = ({ weatherList=[] }) => {
  return (
    <List sx={{ width: '100%',height: '100%', bgcolor: 'background.paper' }}>
        {
            weatherList.map((weather, index) => {
                return (
                    <ListItem key={`weather-list-item-${index}`}>
                        <ListItemAvatar>
                            {
                                weather.weather[0]["main"] === "Clouds" ? <img className='logo-icon' src={cloudLogo}></img>
                                : weather.weather[0]["main"] === "Rain" ? <img className='logo-icon' src={rainingLogo}></img>: null 
                            }
                        </ListItemAvatar>
                        <div className='weather-info'>
                            <div className='weather-info-section-1'>
                                <h5>{`Weather: ${weather.weather[0]["main"]} - ${weather.weather[0]["description"]}`}</h5>
                                <h5>{`Time: ${weather.dt_txt} (UTC)`}</h5>
                                <h5>{`Humidity: ${weather.main.humidity}%`}</h5>
                                <h5>{`Visibility: ${weather.visibility/1000}km`}</h5>
                            </div>
                            <div className='weather-info-section-2'>
                                <h5>{`Temperature: ${weather.main.temp}K`}</h5>
                                <h5>{`Max Temperature: ${weather.main.temp_max}K`}</h5>
                                <h5>{`Min Temperature: ${weather.main.temp_min}K`}</h5>
                                <h5>{`Wind Speed: ${weather.wind.speed}m/s`}</h5>
                            </div>
                        </div>
                    </ListItem>
                )
            })
        }

    </List>
  );
}

export default WeatherList