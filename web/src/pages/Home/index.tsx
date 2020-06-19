import React from 'react';
import logo from '../../assets/logomarcaAlt.png';
import uniao from '../../assets/jovens.png';
import login from '../../assets/login.png';
import { Link } from 'react-router-dom';
import './styles.css';
import {BsBoxArrowInRight} from 'react-icons/bs'
const Home = () => {
    return(
        <div className = "home-container">
          
            <header>
                
                <img src = {logo} alt = "Hope Angels" />
                <Link className = "link-login" style = {{textDecoration: 'none'}} to = "/Login">
                    <i>Meu Ponto</i>
                    <BsBoxArrowInRight style ={{width: '30px', height:'30px'}}/>
                </Link>

            </header>

            <main>
                <legend>
                    <p>A mão que você precisa para mudar o mundo!</p>

                    <sub>
                        Nosso objetivo é diminuir o espaço entre doadores e arrecadadores e assim mudar
                        a vida de cada vez mais pessoas.
                    </sub>

                    <Link to = "/Points">
                        <span><img src = {login} alt = "icone de login"/></span>
                         <h4>Cadastre seu ponto de arrecadação</h4>
                    </Link>
                    
                </legend>

                <img src = {uniao} alt = "Unidos" />

            </main>
        </div>
    )
}

export default Home;