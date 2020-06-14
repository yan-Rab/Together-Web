import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';


interface ItemsResponse{
    id: number,
    title: string,
    image_url: string,
}

interface Props{
    setPointItems: (items: number[]) => void
    pointItems: number[]
}

const Items: React.FC<Props> = ({setPointItems, pointItems}) => {

    const [ items, setItems ] = useState<ItemsResponse[]>([]);
    

    function handleSelectedItems(id: number){

        const alreadySelectedItems = pointItems.findIndex(item => item === id);

        if(alreadySelectedItems >= 0){

            const itemsSelect = pointItems.filter(item => item !== id)
            setPointItems(itemsSelect)
        
        }else{
           
            setPointItems([...pointItems, id])
        }

        console.log(pointItems)
    }

    useEffect(() => {
        api.get<ItemsResponse[]>('items').then(response => {
            setItems(response.data)
        })

       
    },[])
    
    return (
        <>  
            <h3>Selecione os items que seu ponto arrecada</h3>
            <ul className = "group-items">
             
            {items.map(item => (
                <li onClick = {() => handleSelectedItems(item.id) } 
                className = {pointItems.includes(item.id) ? 'selected' : 'item'} 
                key = {String(item.id)} id = "item">
                    <img src = {`${item.image_url}`} alt = "item"/>
                    <p>{item.title}</p>
                </li>
            ))}
            </ul>
       </>
    )
}

export default Items;