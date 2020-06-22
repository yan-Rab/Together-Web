import React, {useEffect, useState, ChangeEvent} from 'react';
import {DebounceInput} from 'react-debounce-input';
import axios from 'axios';

interface IBGEUfs{
  sigla: string;
}

interface IBGECity{
  nome: string,
}

const ModalInforsPoint = () => {

  const [ufs, setUfs] = useState<String[]>([])
  const [cities, setCities] = useState<String[]>([])
  const [dataSelects, setDataSelects] = useState({
    uf: "0",
    city: "0"
  });

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
  })

  useEffect(() => {

    axios.get<IBGECity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${dataSelects.uf}/municipios`)
    .then(response => {
        const initialCities = response.data.map(city => city.nome);
        setCities(initialCities)
    })

}, [dataSelects.uf]);

  return(
    <div className="modal fade" id="ModalInforsPoint"  
    role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                
      <div className="modal-dialog">
          
          <div className="modal-content">
          
              <div className="modal-header">
                  <h5 className="modal-title" id="ModalLabel">Dados do ponto</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div className="modal-body">
                <form>
                  <div className="group-input">

                    <div className= "inputs">
                        <label htmlFor="email">E-mail</label>
                        <DebounceInput debounceTimeout = {800} type="email" id="email" name = "email"onChange = {() =>{}} />
                    </div>

                    <div className="inputs">
                        <label htmlFor="whatsapp">Whatsapp</label>
                        <DebounceInput debounceTimeout = {800} type="text" name = "whatsapp" id="whatsapp" onChange = {() => {}} />
                    </div>

                    <div className="group-input">
                  
                    <div className="inputs">
                        <select name="uf" id="uf" onChange = {handleSelectValues}>
                            <option value="">UF</option>
                            {ufs.map(uf => (
                              <option key = {`${uf}`} value = {`${uf}`}>{uf}</option>
                            ))}
                        </select>
                    </div>

                    <div className="inputs">
                        <select name="city" id="city" onChange = {handleSelectValues}>
                            <option value=''>Cidade</option>
                            {cities.map(city => (
                              <option key = {`${city}`} value = {`${city}`}>{city}</option>
                            ))}
                        </select>
                    </div>
            
                  </div>
              
                  </div>

                </form>
              </div>

              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                  <button type="button" className="btn btn-primary">Salvar alterações</button>
              </div>
              
              </div>
      
          </div>

    </div>
  )
}

export default ModalInforsPoint