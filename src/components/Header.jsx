import React from 'react';
import { Link } from 'react-router-dom';

export default function Header ({button}) {
    return (
        <header className="main-header">
            <p className="title">Quizzy Does It!</p>
            {
                button && (
                    <Link to={button.route}>
                        <button style={{background:'none', border:'none', color:'#FE88A6', fontWeight:'bold'}}>{button.text}</button>
                    </Link>
                )
            }
        </header>
    )
}