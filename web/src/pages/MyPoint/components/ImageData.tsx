import React from 'react';

interface Props{
    pointTitle: string
    pointImage: string
}

const ImageData: React.FC<Props> = ({pointTitle, pointImage}) => {
    return(
        <section>

                <span>
                    <legend>{pointTitle}</legend>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ModalImage">
                        Editar
                    </button>
                </span>
               
                <img src = {`${pointImage}`} alt=""/>

        </section>
    )
}

export default ImageData;