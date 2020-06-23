import React from 'react';

interface Props{
    PointTitle: string
    Pointimage: string
}

const ImageData: React.FC<Props> = ({PointTitle, Pointimage}) => {
    return(
        <section>

                <span>
                    <legend>{PointTitle}</legend>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ModalImage">
                        Editar
                    </button>
                </span>
               
                <img src = {`${Pointimage}`} alt=""/>

        </section>
    )
}

export default ImageData;