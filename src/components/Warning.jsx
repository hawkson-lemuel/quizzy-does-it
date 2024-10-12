import React from 'react';
import warningImg from '../assets/warning.png';

export default function Warning ({message}) {
    return (
        <div className="icon-wrapper" >
            <img className="icon" src={warningImg} />
            {
                message ? <p style={{color:'#FE88A6', fontSize:'20px', textAlign:'center'}}>{message}</p>:null
            }
        </div>
    )
}