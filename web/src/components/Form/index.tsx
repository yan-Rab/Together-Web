import React, { useState, useEffect, ChangeEvent } from 'react';

import {Map, TileLayer, Marker} from 'react-leaflet';
import './styles.css';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';

interface IBGEUfs{
    sigla: string;
}

interface IBGECity{
    nome: string,
}

const Form = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp: "",
    })

    const [dataSelects, setDataSelects] = useState({
        uf: "",
        city: ""
    })

    const [Ufs, setUfs] = useState<String[]>([])
    const [cities, setCities] = useState<String[]>([]);

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
    }, [])

    useEffect(() => {
        axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${dataSelects.uf}/municipios`)
        .then(response => {
            const initialCities = response.data.map(city => city.nome);
            setCities(initialCities)
        })
    }, [dataSelects.uf])

    return(
        <form>
            <div className="group-input">

                <div className = "inputs">
                    <label htmlFor = "name">Nome</label>
                    <DebounceInput debounceTimeout = {800} id = "name" name = "name" type="text" onChange = {handleFormValues}/>
                </div>

                <div className="inputs">
                    <label htmlFor="whatsapp">Whatsapp</label>
                    <DebounceInput debounceTimeout = {800} type="text" name = "whatsapp" id="whatsapp" onChange = {handleFormValues}/>
                </div>
                
            </div>

            
            <div className= "inputs">
                <label htmlFor="email">E-mail</label>
                <DebounceInput debounceTimeout = {800} type="text" id="email" name = "email"onChange = {handleFormValues} />
            </div>
            

            <Map center = {[-3.8302032,-38.5613864]} zoom = {16}>
                <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position = {[-43.45345, -44.34634]} />
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
           
        </form>
    )
}

export default Form;
