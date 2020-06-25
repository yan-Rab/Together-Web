import React, { useState } from 'react';
import Dropzone from '../../../../components/Dropzone/index';
import api from '../../../../services/api';
import Toasts from '../../../../components/Toasts/index';
import success from '../../../../assets/tick.png';
const toast = new Toasts();

const ModalImage = () => {

  const [newImage, setNewImage] = useState<File>();

  async function handleFormValues(){
  
    const id = localStorage.getItem('pointId');

    const data = new FormData();
    
    if(newImage){
      data.append('image', newImage)
    }
    
    const response = await api.put(`/dataPointPrimary/${id}`, data);
    
    toast.success(success, response.data.message);
    
  }

  return(
    <div className="modal fade" id="ModalImage"  
      role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
      
      <div className="modal-dialog">
          
          <div className="modal-content">
          
              <div className="modal-header">
                  <h5 className="modal-title" id="ModalLabel">Imagem do Ponto</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
             
              <div className="modal-body">
                <Dropzone onFileUploaded = {setNewImage} />
              </div>

              <div className="modal-footer">
                 
                  <button type="button" onClick = {handleFormValues} className="btn btn-primary">Salvar alterações</button>
              </div>
              
              </div>
      
          </div>

      </div>
  )
}

export default ModalImage;