import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useState, useEffect} from "react";
import propTypes from "prop-types";

import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";



const Map = () => {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const {cities} = useCities();
    const {isLoading: isLoadingPosition, position: geoLocationPosition, getPosition} = useGeolocation();
    const [mapLat, mapLng] = useUrlPosition();
    
    useEffect(function(){    
        if(mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng]);


    useEffect(function(){
        if(geoLocationPosition)setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
    },[geoLocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geoLocationPosition && (<Button type={'position'} onClick={()=> getPosition()}>
                {isLoadingPosition? 'Loading ...': 'Move To Your Position'}
            </Button>)}
            <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.ft/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map(city =>(<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                <Popup>
                    <span>{city.emoji}</span><span>{city.cityName}</span>
                </Popup>
                </Marker>))}
                <ChangePosition position={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    )
}

const ChangePosition = ({position}) => {
    const map = useMap();
    map.setView(position);

    return null;
}

const DetectClick = () => {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) =>{
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}



export default Map ;

