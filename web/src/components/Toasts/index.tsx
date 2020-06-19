import React from 'react';
import {toast} from 'react-toastify';



const BodyToastNotification = (icon: string, text: string) => (
    <div className = "icon-text">
        <img src={icon} alt="icone de notificação"/>
        <b>{text}</b>
    </div>
);



export default class Toasts {
    success(icon: string, text: string){ 

        return toast.success(BodyToastNotification(icon,text),{
            position: 'top-center',
            className: 'toast-success',
            closeButton: true,
            draggable: true
        })
    }

    error(icon: string, text: string){
        return toast.error(() => BodyToastNotification(icon,text),{
            position: 'top-center',
            className: 'toast-error',
            closeButton: true,
            autoClose: 3000,
            draggable: true,
        })
    }
}


