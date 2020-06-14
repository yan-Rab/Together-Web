import React, {FormEvent, useState, ChangeEvent} from 'react';

import {BsBoxArrowInLeft} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input';
import logo from '../../assets/logomarcaAlt.png';
import './styles.css';
const Login = () => {
    const [formData, setFormData] = useState({email: '', password: ''});

    function handleSelectedValues(event: ChangeEvent){

    }

    return(
        <>
        <div style = {{display: 'flex',marginTop:'20px', paddingLeft:"40px"}}>
            <Link to = "/" style = {{textDecoration: "none",margin: '20px'}}>
                <span style = {{fontFamily:'Roboto', fontSize:"18px"}}>
                    <BsBoxArrowInLeft style = {{width: "30px", height: "30px", marginRight:'10px'}} /> 
                    Voltar para Home
                </span>
            </Link>
        </div>

        <div className = "login-container">  
            <form>
            <img src={logo} alt="Together"/>
                <label htmlFor="email">E-mail</label>
                <DebounceInput name = "email" type = "email" 
                debounceTimeout = {800} onChange = {(event) => handleSelectedValues(event)} />

                <label htmlFor="password">Senha</label>
                <DebounceInput name = "password" type = "password" 
                debounceTimeout = {800} onChange = {(event) => handleSelectedValues(event)} />

                <button type = "submit">Logar</button>
                
            </form>
           
        </div>
        </>
    )
}

export default Login;