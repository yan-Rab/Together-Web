import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import {DebounceInput} from 'react-debounce-input';
import axios from 'axios';
import {IoLogoWhatsapp} from 'react-icons/io';
import {MdEmail} from 'react-icons/md';
import api from '../../../../services/api';
import Toasts from '../../../../components/Toasts/index';
import success from '../../../../assets/tick.png';
const toast = new Toasts();

interface IBGEUfs{
  sigla: string;
}

interface IBGECity{
  nome: string,
}

interface Props{
  dataPoint: {
      title: string,
      whatsapp: string,
      email: string,
      city: string,
      uf: string
  }
}


const ModalInforsPoint: React.FC<Props> = ({dataPoint}) => {

  const [ufs, setUfs] = useState<String[]>([])
  const [cities, setCities] = useState<String[]>([])
  const [formData, setFormData] = useState({
    email: dataPoint.email,
    whatsapp: dataPoint.whatsapp,
    city: dataPoint.city,
    uf: dataPoint.uf,
    title: dataPoint.title
  })

  useEffect(() => {
    setFormData(dataPoint)
  }, [dataPoint]);

  function defaultValues(){
    setFormData(dataPoint)
  }

  function handleInputValues(event: ChangeEvent<HTMLInputElement>){
    const names = event.target.name;
    const values = event.target.value;
    
    setFormData({...formData, [names]: values})
  }

  function handleSelectValues(event: ChangeEvent<HTMLSelectElement>){
    const names = event.target.name;
    const values = event.target.value;
    
    setFormData({...formData, [names]: values})
  }

  async function handleFormValues(event: FormEvent){
    event.preventDefault();
    const {whatsapp,email,city,uf, title} = formData;
    
    const id = localStorage.getItem('pointId');
    const response = await api.put('/dataPointSecundary', {
      whatsapp,
      email,
      city,
      uf,
      id,
      title
    });

    toast.success(success,response.data.message);
  }

  useEffect(() => {
 
    axios.get<IBGEUfs[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => {
        const ufs = response.data.map(uf => uf.sigla)
        setUfs(ufs)
        
    })
  }, [])

  useEffect(() => {

    axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.uf}/municipios`)
    .then(response => {
        const initialCities = response.data.map(city => city.nome);
        setCities(initialCities)
    })

}, [formData.uf]);

  return(
    <div className="modal fade" id="ModalInforsPoint"  
    role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                
      <div className="modal-dialog">
          
          <div className="modal-content">
          
              <div className="modal-header">
                  <h5 className="modal-title" id="ModalLabel">Dados do ponto</h5>
                  <button type="button" onClick = {defaultValues} className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <form onSubmit = {handleFormValues}>
              <div className="modal-body" style = {{padding: '10px'}}>
                
                  <div className="group-input">

                    <div className = "inputs">
                      <label htmlFor = "title">Nome</label>
                      <DebounceInput 
                      debounceTimeout = {800} id = "title" name = "title" type="text" 
                      onChange = {handleInputValues} placeholder = {formData.title} value = {formData.title} />
                    </div>

                    <div className="inputs">
                        <label htmlFor="whatsapp" style = {{color: '#339999'}}>
                          Whatsapp <IoLogoWhatsapp style = {{color: '#339999'}} />
                        </label>
                        <DebounceInput value = {formData.whatsapp}
                         debounceTimeout = {800} type="text" name = "whatsapp" id="whatsapp" 
                        onChange = {handleInputValues} placeholder = {formData.whatsapp}/>
                    </div>

                    <div className= "inputs" style = {{width: '100%'}}>
                        <label htmlFor="email" style = {{color: '#ff6666'}}>
                          E-mail <MdEmail style = {{color: '#ff6666'}} />
                        </label>
                        <DebounceInput value = {formData.email}
                        debounceTimeout = {800} type="email" id="email" name = "email"
                        onChange = {handleInputValues} placeholder = {formData.email}/>
                    </div>

                    <div className="group-input">
                  
                      <div className="inputs">
                          <select name="uf" id="uf" onChange = {handleSelectValues}>
                              <option value= {dataPoint.uf}>UF</option>
                              {ufs.map(uf => (
                                <option key = {`${uf}`} value = {`${uf}`}>{uf}</option>
                              ))}
                          </select>
                      </div>

                      <div className="inputs">
                          <select name="city" id="city" onChange = {handleSelectValues}>
                            <option value = {dataPoint.city} >Cidade</option>
                              {cities.map(city => (
                                <option  key = {`${city}`} value = {`${city}`}>{city}</option>
                              ))}
                          </select>
                      </div>
            
                    </div>

                   
              
                  </div>

                
              </div>

              <div className="modal-footer">
                 
                  <button type="submit" className="btn btn-primary" >Salvar alterações</button>
              </div>

              </form>
              </div>
      
          </div>

    </div>
  )
}

export default ModalInforsPoint