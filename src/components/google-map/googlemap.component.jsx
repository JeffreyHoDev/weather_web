import GoogleMapReact from 'google-map-react';
import MapMarker from '../map-marker/map-marker.component'

const GoogleMap = ({ queriedList, setForecastData, setQueriedArea }) => {
  const defaultProps = {
    center: {
      lat: 1.290270,
      lng: 103.851959
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '70vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {
            queriedList.map((query, index) => {
                return <MapMarker setForecastData={setForecastData} setQueriedArea={setQueriedArea} key={`marker-component-${index}`} lat={query.coord.lat} lng={query.coord.lon} query={query}/>
            })
        }
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap