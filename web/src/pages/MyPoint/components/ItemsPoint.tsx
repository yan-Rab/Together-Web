import React from 'react';


interface Props{
    itemsPoint : {

        title: string,
        id: number,
        image_url: string,

    }[],

 
}

const ItemsPoint: React.FC<Props> = ({itemsPoint}) => {

    return(
        <div className = 'sectionBody'>
                
                <ul className = "group-items">
                    
                    {itemsPoint.map(item => (

                        <li  onClick = {() => {}}
                        className = "item" key = {String(item.id)} id = "item">
                            <img src = {`${item.image_url}`} alt = "item"/>
                            <p>{item.title}</p>
                        </li>
                    ))}

                </ul>
            </div>
    )
}

export default ItemsPoint;