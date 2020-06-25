import React from 'react';
import {IoLogoWhatsapp} from 'react-icons/io';
import {MdEmail} from 'react-icons/md';

interface Props{
    dataPoint: {
        whatsapp: string,
        email: string,
        city: string,
        uf: string
    }
}

const InforsPoint: React.FC<Props> = ({dataPoint}) => {
    return(
        <section>

                <span>
                    <legend>Dados</legend>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ModalInforsPoint">
                        Editar
                    </button>
                </span>

                <div className = "infors-point">

                  <div className = "container-data">
                      <div className="group-data">

                        <strong style = {{color: '#ff6666'}}>
                          E-mail <MdEmail style = {{color: '#ff6666'}} />
                        </strong>

                        <p>{dataPoint.email}</p>
                      </div>

                      <div className="group-data">
                        <strong style = {{color: '#339999'}}>Whatsapp <IoLogoWhatsapp style = {{color: '#339999'}} /></strong>
                        <p>{dataPoint.whatsapp}</p>
                      </div>
                                        
                  </div>

                  <div className = "container-data">

                      <div className = "group-data">
                        <strong>Cidade</strong>
                        <p>{dataPoint.city}</p>
                      </div>
                      
                      <div className = "group-data">
                        <strong>Estado</strong>
                        <p>{dataPoint.uf}</p>
                      </div>
                      
                  </div>
                    
                </div>
               
            </section>
    )
}

export default InforsPoint;