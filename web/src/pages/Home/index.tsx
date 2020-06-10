import React from 'react';
import logo from '../../assets/logomarcaAlt.png';
import unidos from '../../assets/unidos.png';
import login from '../../assets/login.png';
import { Link } from 'react-router-dom';
import './styles.css';

const Home = () => {
    return(
        <div className = "home-container">
          
            <header>
                <img src = {logo} alt = "Hope Angels" />
                <h1>Home</h1>
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

                <img src = {unidos} alt = "Unidos" />

            </main>
        </div>
    )
}

export default Home;