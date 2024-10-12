import React from 'react';
import loaderImg from '../assets/loading.gif';

export default function Loader ({message}) {
    return (
        <div className="icon-wrapper">
            <img className="icon" src={loaderImg} />
            {
                message ? <p style={{color:'#FE88A6', fontSize:'20px'}}>{message}</p>:null
            }
        </div>
    )
}