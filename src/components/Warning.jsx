import React from 'react';
import warningImg from '../assets/warning.png';

export default function Warning ({message}) {
    return (
        <div className="icon-wrapper" style={{width:'100%', paddingTop:'100px'}}>
            <img className="icon"  style={{width:'50px'}} src={warningImg} />
            {
                message ? <p style={{color:'#FE88A6', fontSize:'20px'}}>{message}</p>:null
            }
        </div>
    )
}