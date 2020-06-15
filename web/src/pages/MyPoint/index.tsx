import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

const MyPoint = () => {
    const navigation = useHistory();

    function deslog(){
        localStorage.clear();
        navigation.push('/');
    }
    useEffect(() => {
        console.log(localStorage.getItem('token'))
    })
    return(
        <div className = "container-my-point">
            <h1>My point</h1>
            <button className = "but-deslog" onClick = {deslog}>Deslogar</button>
        </div>
    )
}

export default MyPoint;