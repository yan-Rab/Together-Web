import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import {Map, TileLayer, Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import './styles.css';

import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';
import Items from '../Items/index';
import {IoIosAdd} from 'react-icons/io';
import Dropzone from '../Dropzone/index';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';

interface IBGEUfs{
    sigla: string;
}

interface IBGECity{
    nome: string,
}



const Form = () => {
    const navigation = useHistory();
    const [selectedFile, setSelectedFile] = useState<File>()

    const [formData, setFormData] = useState({
        title: "",
        email: "",
        whatsapp: "",
        hash: ""
    });

    const [dataSelects, setDataSelects] = useState({
        uf: "0",
        city: "0"
    });

    const [Ufs, setUfs] = useState<String[]>([]);
    const [cities, setCities] = useState<String[]>([]);
    const [positionCurrent, setPositionCurrent] = useState<[number,number]>([0,0])
    const [selectedPosition, setSelectedposition] = useState<[number,number]>([0,0]);
    const [items, setItems] = useState<number[]>([]);

    useEffect(() => {
        navigator.geolocation.watchPosition(position => {
            setPositionCurrent([position.coords.latitude, position.coords.longitude]);
            
        })
    },[])


    function handleFormValues(event: ChangeEvent<HTMLInputElement>){
        const names = event.target.name;
        const values = event.target.value;
        
        setFormData({...formData, [names]: values})
        
    }

    function handleSelectValues(event: ChangeEvent<HTMLSelectElement>){
        const names = event.target.name;
        const values = event.target.value;

        setDataSelects({...dataSelects, [names]: values})
    }


    useEffect(() => {
        axios.get<IBGEUfs[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
            const ufs = response.data.map(uf => uf.sigla)
            setUfs(ufs)
            
        })
    }, []);

    useEffect(() => {

        axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${dataSelects.uf}/municipios`)
        .then(response => {
            const initialCities = response.data.map(city => city.nome);
            setCities(initialCities)
        })

    }, [dataSelects.uf]);

    function handleSelectedPosition(event: LeafletMouseEvent){
        const latitude = event.latlng.lat;
        const longitude = event.latlng.lng;
        setSelectedposition([latitude, longitude]);
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        const {title, email, whatsapp, hash} = formData;
        const {city, uf} = dataSelects;
        const [latitude, longitude] = selectedPosition;
        

        const data = new FormData();
        data.append('title', title);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('city', city);
        data.append('uf', uf);
        data.append('latitude', String(latitude));
        data.append('longitude', String (longitude));
        data.append('items', items.join(','));
        data.append('hash', hash);
        if(selectedFile){
            data.append('image', selectedFile)
        }
            
       await api.post('/point', data);
       
       navigation.push('/');
    }

    return(
        <form onSubmit = {handleSubmit} >
            
            <Dropzone onFileUploaded = {setSelectedFile} />
            <div className="group-input">

                <div className = "inputs">
                    <label htmlFor = "title">Nome</label>
                    <DebounceInput debounceTimeout = {800} id = "title" name = "title" type="text" onChange = {handleFormValues}/>
                </div>

                <div className="inputs">
                    <label htmlFor="whatsapp">Whatsapp</label>
                    <DebounceInput debounceTimeout = {800} type="text" name = "whatsapp" id="whatsapp" onChange = {handleFormValues}/>
                </div>
                
            </div>

            <div className  = "group-input">

                <div className= "inputs">
                    <label htmlFor="email">E-mail</label>
                    <DebounceInput debounceTimeout = {800} type="email" id="email" name = "email"onChange = {handleFormValues} />
                </div>

                <div className= "inputs">
                    <label htmlFor="hash">Senha</label>
                    <DebounceInput debounceTimeout = {800} type="password" id="hash" name = "hash" onChange = {handleFormValues} />
                </div>

            </div>
           
            <h3>Informe o endereço no mapa</h3>

            <Map center = {positionCurrent} zoom = {14} onclick = {handleSelectedPosition} >
                <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                <Marker position = {selectedPosition} />
            </Map>
            
            <div className="group-input">

                <div className="inputs">
                    <select name="uf" id="uf" onChange = {handleSelectValues}>
                        <option value="">UF</option>
                            {Ufs.map(uf => [
                            <option key = {String(uf)} value={String(uf)}>
                                {uf}
                            </option>
                        ])}
                    </select>
                </div>

                <div className="inputs">
                    <select name="city" id="city" onChange = {handleSelectValues}>
                        <option value=''>Cidade</option>
                        {cities.map(city => (
                            <option key = {String(city)} value= {String(city)}>{city}</option>
                        ))}
                    </select>
                </div>
            
            </div>
           
            <Items  pointItems = {items} setPointItems = {setItems} />

            <div className = "container-but-submit">
                <button className = "submit" type = "submit">
                    <span><IoIosAdd style = {{width: "35px", height: "35px"}}/></span>
                    <i style = {{paddingLeft: '30px'}}>Cadastrar ponto</i>
                </button>
            </div>
            
        </form>
    )
}

export default Form;
