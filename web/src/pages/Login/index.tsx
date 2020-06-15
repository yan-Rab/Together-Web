import React, {FormEvent, useState, ChangeEvent} from 'react';


import {DebounceInput} from 'react-debounce-input';
import logo from '../../assets/logomarcaAlt.png';
import LinkHome from '../../components/LinkHome/index';
import svg from '../../assets/login.svg';
import './styles.css';

import api from '../../services/api';
import {useHistory} from 'react-router-dom';
interface AuthResponse{
    point: number,
    token: string,
}



const Login = () => {
   
    const [formData, setFormData] = useState({email: '', password: ''});
    const navigation = useHistory();

    function handleSelectedValues(event: ChangeEvent<HTMLInputElement>){
        const names = event.target.name;
        const values = event.target.value;

        setFormData({...formData, [names]: values});
    }

   async function handleFormValues(event: FormEvent){
        event.preventDefault();

        const { email, password } = formData;

        const auth = await api.post<AuthResponse>('/auth', {email, password});

        if(auth.data.token){
            localStorage.setItem("token", auth.data.token);
            localStorage.setItem("pointId", String(auth.data.point));
            alert('Ponto de arrecadação cadastrado!')
            navigation.push('/MyPoint')
        }
    }
    
    return(
      
        <div className = "login-container">  
       
            <div className = "infors">
                
                <LinkHome />
                <img src={svg} alt="Ilustração"/>
                <p>Seja bem vindo!</p>

            </div>
            
            <form onSubmit = {handleFormValues}>

                <img src={logo} alt="Together"/>
                <label htmlFor="email">E-mail</label>
                <DebounceInput name = "email" type = "email" 
                debounceTimeout = {800} onChange = {(event) => handleSelectedValues(event)} />

                <label htmlFor="password">Senha</label>
                <DebounceInput name = "password" type = "password" 
                debounceTimeout = {800} onChange = {(event) => handleSelectedValues(event)} />

                <button type = "submit">
                    Logar 
                </button>
                
            </form>
            
        </div>
      
    )
}

export default Login;