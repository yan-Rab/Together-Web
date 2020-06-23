import React, {useEffect, useState} from 'react';
import LogOut from '../../components/LogOut/index';
import api from '../../services/api';
import './styles.css';

import LinkHome from '../../components/LinkHome/index';

import ImageData from './components/ImageData';
import InforsPoint from './components/InforsPoint';
import MapPoint from './components/MapPoint';
import ItemsPoint from './components/ItemsPoint';

import ModalImage from './components/Modals/ModalImage';
import ModalInforsPoint from './components/Modals/ModalInforsPoint';
import ModalItems from './components/Modals/ModalItems';

interface PointsResponse{
    image_uri: string,
    point: {
        title: string,
        email:  string,
        latitude: number,
        longitude: number,
        whatsapp: string,
        city: string,
        uf: string,
    }

    serializedItems: {
        title: string,
        id: number,
        image_url: string,
    }[]
   
}

interface ItemData{
        title: string,
        id: number,
        image_url: string,
}

const MyPoint = () => {
 
    const [image, setImage] = useState('0');

    const [UpdateImage, setUpdateImage] = useState<File>()

    const [inforsPoint, setInforsPoint] = useState({
        title: '',
        email: '',
        whatsapp: '',
        uf: '',
        city: '',
        latitude: 0,
        longitude: 0
       
    })

    const [items, setItems] = useState([{} as ItemData]);


    useEffect(() => {
        console.log(UpdateImage)
    }, [UpdateImage])

    useEffect(() => {
        const id = localStorage.getItem("pointId");

        api.get<PointsResponse>(`/point/${id}`).then(response => {

            setInforsPoint(response.data.point);
            setImage(response.data.image_uri);
            setItems(response.data.serializedItems)
  
        })
            
    }, [])

    function SerializedItems(){
        const serializedItems = items.map(item => item.id);
        return serializedItems;
    }
   
    return(
        <div className = "container-my-point">
       
                <header>
                    <span>
                        <LinkHome />
                        <LogOut />
                    </span>
                   
                  
                    
                </header>

                <div className = 'infors-primary'>
                    <ImageData PointTitle = {inforsPoint.title} Pointimage = {image} />
                    <ModalImage setImagePoint = {setUpdateImage} />
                    

                    <InforsPoint DataPoint = {inforsPoint} />
                    <ModalInforsPoint />
            
                </div>
            
                <div className = 'infors-secundary'>
                    
                    <MapPoint latitude = {inforsPoint.latitude} longitude = {inforsPoint.longitude} />
                    
                    <section>
                        <span>
                            <legend>Items</legend>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ModalItems">
                                Editar
                            </button>
                        </span>

                        <ItemsPoint itemsPoint = {items}/>
                        <ModalItems itemsPoint = {SerializedItems()}/>
                    </section>
                    
                </div>
           
       

           
        </div>
    )
}

export default MyPoint;