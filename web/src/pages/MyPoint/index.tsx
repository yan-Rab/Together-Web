import React, {useEffect, useState} from 'react';

import LogOut from '../../components/LogOut/index';
import api from '../../services/api';

import './styles.css';

import Dropzone from '../../components/Dropzone/index';
import {Map, TileLayer, Marker} from 'react-leaflet';
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

    const [selectedFile, setSelectedFile] = useState<File>();

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
        const id = localStorage.getItem("pointId");

        api.get<PointsResponse>(`/point/${id}`).then(response => {

            setInforsPoint(response.data.point);
            setImage(response.data.image_uri);
            setItems(response.data.serializedItems)
  
        })
            
    }, [])
   
    return(
        <div className = "container-my-point">

        <header>
            <section>

                <span>
                    <legend>{inforsPoint.title}</legend>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Editar
                    </button>
                </span>
               
                <img src = {`${image}`} alt=""/>

            </section>

                <div className="modal fade" id="exampleModal"  
                role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                
                <div className="modal-dialog">
                    
                    <div className="modal-content">
                    
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <Dropzone  onFileUploaded = {setSelectedFile} />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary">Salvar alterações</button>
                        </div>
                        
                        </div>
                
                    </div>

                </div>

            <section>

                <span>
                    <legend>Dados</legend>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Editar
                    </button>
                </span>

                <div className = "infors-point">

                  <div className = "container-data">
                      <div className="group-data">
                        <strong>E-mail</strong>
                        <p>{inforsPoint.email}</p>
                      </div>

                      <div className="group-data">
                        <strong>whatsapp</strong>
                        <p>{inforsPoint.whatsapp}</p>
                      </div>
                                        
                  </div>

                  <div className = "container-data">

                      <div className = "group-data">
                        <strong>Cidade</strong>
                        <p>{inforsPoint.city}</p>
                      </div>
                      
                      <div className = "group-data">
                        <strong>Estado</strong>
                        <p>{inforsPoint.uf}</p>
                      </div>
                      
                  </div>

                    
                </div>
               
            </section>
    
        </header>

        <main>

            <section>
                <span>
                    <legend>Localização</legend>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Editar
                    </button>
                </span>
                <Map className = "leaflet-container" center = {[-3.8221074,-38.5585407]} zoom = {14}>
                    <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    
                    <Marker position = {[-3.8221074,-38.5585407]} />
                </Map>

            </section>

            <section>
                <span>
                    <legend>Items</legend>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Editar
                    </button>
                </span>

                <ul className = "group-items">
                    
                    {items.map(item => (

                        <li className = "item" key = {String(item.id)} id = "item">
                            <img src = {`${item.image_url}`} alt = "item"/>
                            <p>{item.title}</p>
                        </li>
                    ))}

                </ul>
            </section>
            
        </main>
            <LogOut />
        </div>
    )
}

export default MyPoint;