import React, { useState } from 'react';
import {Map, TileLayer, Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
interface Props {
    latitude: number,
    longitude: number,
}

const MapPoint: React.FC<Props> = ({latitude, longitude}) => {
    const [selectedPosition, setSelectedPosition] = useState<[number,number]>([0,0])
    
    function handleSelectedPosition(event: LeafletMouseEvent){
    
        const latitude = event.latlng.lat;
        const longitude = event.latlng.lng;
        
        setSelectedPosition([latitude, longitude]);
    }

    return(
        <section>
        <span>
            <legend>Localização</legend>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ModalMap">
                Editar
            </button>
        </span>

        <Map className = "leaflet-container" center = {[latitude,longitude]} onclick = {handleSelectedPosition} zoom = {14}>
            <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            <Marker position = {selectedPosition} />
        </Map>

    </section>
    )
}

export default MapPoint;