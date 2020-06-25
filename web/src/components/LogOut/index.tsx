import React from 'react';
import iconUser from '../../assets/user.png';
import './styles.css';
import { useHistory } from 'react-router-dom';
const LogOut = () => {
    const navigation = useHistory();

    function deslog(){
        localStorage.clear();
        navigation.push('/');
    }
    return(
        <div className = "logout">
            <img src = {iconUser} alt="Icon user"/>
              <button className = "but-deslog" onClick = {deslog}>Deslogar</button>
        </div>
    )
}

export default LogOut;