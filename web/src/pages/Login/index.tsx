import React, {FormEvent, useState, ChangeEvent} from 'react';


import {DebounceInput} from 'react-debounce-input';
import logo from '../../assets/logomarcaAlt.png';
import LinkHome from '../../components/LinkHome/index';

import svg from '../../assets/login.svg';

import './styles.css';

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';



import api from '../../services/api';
import {useHistory} from 'react-router-dom';

interface AuthResponse{
    point: number,
    token: string,
    res: Response,
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
        
        try{
            const response = await api.post<AuthResponse>('/auth', {email, password});

            if(response.data.token){
            
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("pointId", String(response.data.point));
                
                navigation.push('/MyPoint')

            }
        }catch(error){
            return error;
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
                debounceTimeout = {800} onChange = {(event) => handleSelectedValues(event)} required/>

                <label htmlFor="password">Senha</label>
                <DebounceInput name = "password" type = "password" 
                debounceTimeout = {800} onChange = {(event) => handleSelectedValues(event)} required/>

                <button type = "submit">
                    Logar 
                </button>
                
            </form>
            <ToastContainer limit = {1} className = "toast-container" />
        </div>
      
    )
}

export default Login;