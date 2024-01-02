import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const MapContainer = () => {
    const mapStyles = {
        height: '60vh',
        width: '100%',
    };

    const defaultCenter = {
        lat: 50.44805204723655,
        lng: 30.45191458142184,
    };

    const location =
        {
            name: 'QuickGlow studio',
            location: defaultCenter,
        }

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={19}>
                <Marker key={location.name} position={location.location}/>
            </GoogleMap>
        </LoadScript>
    );
};

export default MapContainer;
