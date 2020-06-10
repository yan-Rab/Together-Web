import React, { useState } from 'react';
import logo from '../../assets/logomarcaAlt.png';
import './styles.css';
import {BsBoxArrowInLeft} from 'react-icons/bs';

import { Link } from 'react-router-dom';

import Dropzone from '../../components/Dropzone/index';
import Form from '../../components/Form/index';

const Points = () => {
    const [selectedFile, setSelectedFile] = useState<File>()

    return(

        <div className = "points-container">
            <header>
                <img src = {logo} alt = "Hope Angels" />
                <Link to = "/" style = {{textDecoration: "none"}}>
                    <span>
                        <BsBoxArrowInLeft style = {{width: "30px", height: "30px"}} /> 
                        Voltar para Home
                    </span>
                </Link>
            </header> 

            <main>
                <div className = "register-container">
                    <h2>Insira as informações do seu ponto<br/> de arrecadação</h2>
                    <Dropzone onFileUploaded = {setSelectedFile} />

                    <Form />
                </div>
            </main>
        </div>
    )
}

export default Points;