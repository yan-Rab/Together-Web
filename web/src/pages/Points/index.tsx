import React from 'react';
import logo from '../../assets/logomarcaAlt.png';
import './styles.css';



import LinkHome from '../../components/LinkHome/index';

import Form from '../../components/Form/index';

const Points = () => {

    return(

        <div className = "points-container">
            <header>
                
                <img src = {logo} alt = "Hope Angels" />
                <LinkHome />

            </header> 

            <main>
                <div className = "register-container">
                    <h2>Insira as informações do seu ponto<br/> de arrecadação</h2>

                    <Form />
                </div>
            </main>
        </div>
    )
}

export default Points;