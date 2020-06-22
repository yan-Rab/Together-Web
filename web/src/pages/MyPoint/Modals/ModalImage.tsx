import React from 'react';
import Dropzone from '../../../components/Dropzone/index';
import { DebounceInput } from 'react-debounce-input';
interface Props{
  setImagePoint: (image: File) => void
}
const ModalImage: React.FC<Props> = ({setImagePoint}) => {

  return(
    <div className="modal fade" id="ModalImage"  
      role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
      
      <div className="modal-dialog">
          
          <div className="modal-content">
          
              <div className="modal-header">
                  <h5 className="modal-title" id="ModalLabel">Nome e Imagem do Ponto</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div className="modal-body">
                
                <form>
                  <div className = "inputs">
                    <label htmlFor = "title">Nome</label>
                    <DebounceInput debounceTimeout = {800} id = "title" name = "title" type="text" onChange = {() => {}}/>
                  </div>
                </form>

                <br></br>
                <Dropzone onFileUploaded = {setImagePoint} />
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

export default ModalImage;