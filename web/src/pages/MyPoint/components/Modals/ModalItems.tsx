import React, { useState, useEffect } from 'react';
import Items from '../../../../components/Items/index';
import success from '../../../../assets/tick.png';
import Toasts from '../../../../components/Toasts/index';

import api from '../../../../services/api';
const toast = new Toasts();
interface Props {
    itemsPoint : number[]
}

const ModalItems: React.FC<Props> = ({itemsPoint}) => {

    const [selectedItems, setSelectedItems] = useState<number[]>(itemsPoint);
 
    useEffect(() => {
       
    },[selectedItems]);

   async function handleUpdateItems(){
       const id = localStorage.getItem('pointId');
       selectedItems.splice(0,1);
       console.log(selectedItems)
        const response = await api.put('/pointItems', {items:selectedItems,id});
        toast.success(success,response.data.message)
    }

    return(
        <div className="modal fade" id="ModalItems"  
      role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
      
      <div className="modal-dialog .modal-dialog-scrollable">
          
          <div className="modal-content" style = {{maxWidth:'450px'}}>
          
              <div className="modal-header">
                  <h5 className="modal-title" id="ModalLabel">Items do Ponto</h5>
                  <button type="button" className="close" style = {{color: 'gray'}} data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              
              <div className="modal-body" style = {{padding: '20px'}}>
                
                <Items pointItems = {selectedItems} setPointItems = {setSelectedItems}/>
                
              
              </div>

              <div className="modal-footer">
                  
                  <button type="button" onClick = {handleUpdateItems} className="btn btn-primary" data-dismiss = 'modal'>Salvar alterações</button>
              </div>
              
              </div>
      
          </div>

      </div>
    )
}

export default ModalItems;