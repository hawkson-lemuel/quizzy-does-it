import React from 'react';
import { Link } from 'react-router-dom';
import { QUIZ_CATEGORIES } from '../utils/routes';

export default function Header ({button}) {
    return (
        <header className="main-header">
            <Link to={QUIZ_CATEGORIES}>
                <p className="title">Quizzy Does It!</p>
            </Link>
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