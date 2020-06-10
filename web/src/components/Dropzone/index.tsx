import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import upload from '../../assets/cloud-computing.png';
import './styles.css';
interface Props{
    onFileUploaded : (file: File) => void
}

const Dropzone: React.FC<Props> = ({onFileUploaded}) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);

    }, [onFileUploaded])

    const { getInputProps, getRootProps } = useDropzone({
        onDrop,
        accept: "image/*"
    })


    return(
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept = "image/*" />
            {selectedFileUrl ? <img src = {selectedFileUrl} alt = "imagem do estabelecimento"  /> 
            : (
                <p>
                <img src={upload} alt="upload" style = {{width: "40px", height:"40px",marginBottom:'10px'}} />
                 imagem do seu ponto de arrecadação
                </p>
            )}
        </div>
    )
}

export default Dropzone;
