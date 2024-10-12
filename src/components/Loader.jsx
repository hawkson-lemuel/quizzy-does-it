import React from 'react';
import loaderImg from '../assets/loading.gif';

export default function Loader ({message}) {
    return (
        <div className="icon-wrapper" style={{width:'100%', paddingTop:'100px'}}>
            <img className="icon"  style={{width:'50px'}} src={loaderImg} />
            {
                message ? <p style={{color:'#FE88A6', fontSize:'20px'}}>{message}</p>:null
            }
        </div>
    )
}