import React from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';
const LogOut = () => {
    const navigation = useHistory();

    function deslog(){
        localStorage.clear();
        navigation.push('/');
    }
    return(
        <div>
              <button className = "but-deslog" onClick = {deslog}>Deslogar</button>
        </div>
    )
}

export default LogOut;