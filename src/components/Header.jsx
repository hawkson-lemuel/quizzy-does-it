import React from 'react';
import { Link } from 'react-router-dom';

export default function Header ({button}) {
    return (
        <header className="main-header">
            <p className="title">Quizzy Does It!</p>
            {
                button && (
                    <Link to={button.route}>
                        <button className="main-header-button">{button.text}</button>
                    </Link>
                )
            }
        </header>
    )
}