import React from 'react';
import { Link } from 'react-router-dom';
import {BsBoxArrowInLeft} from 'react-icons/bs';
import './styles.css';
const LinkHome = () => (
    <Link className = "link-home" to = "/" style = {{textDecoration: 'none'}}>
        
        <BsBoxArrowInLeft style = {{width: "30px", height: "30px"}} /> 
        <i>Voltar para Home</i>
       
    </Link>
)

export default LinkHome;