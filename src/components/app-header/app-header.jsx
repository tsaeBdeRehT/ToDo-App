import React from "react";

import './app-header.css';
import iconDark from '../../images/icon-moon.svg';
import iconLight from '../../images/icon-sun.svg';

const AppHeader = ({themeChange}) => {
    return (
        <div className="header">
            <h1 className="header__name">TODO</h1>
            <button className="header__change-button"
                    onClick={themeChange}
            >
                <img src={iconDark} className="moon"/>
                <img src={iconLight} className="sun"/>
            </button>
        </div>

    );
};

export default AppHeader;