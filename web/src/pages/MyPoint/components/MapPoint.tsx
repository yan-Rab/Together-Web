import React, { useState} from 'react';
import {Map, TileLayer, Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import api from "../../../services/api";
import Toasts from '../../../components/Toasts/index';
import success from '../../../assets/tick.png';

const toast = new Toasts();

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

    
   async function SetLocationPoint(){
        const latitude = selectedPosition[0];
        const longitude = selectedPosition[1];
        const id = localStorage.getItem('pointId');
        const response = await api.put('/pointLocation', {latitude,longitude,id})
        
        toast.success(success, response.data.message);
    }

    return(
        <section>
        <span>
            <legend>Localização</legend>
            <button type="button" onClick = {SetLocationPoint} className="btn btn-primary" data-toggle="modal" data-target="#ModalMap">
                Salvar 
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