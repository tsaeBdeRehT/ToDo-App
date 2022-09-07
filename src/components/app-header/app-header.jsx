import React from "react";

import './app-header.css';
import icon from '../../images/icon-sun.svg';

const AppHeader = () => {
    return (
        <div className="header">
            <h1 className="header__name">TODO</h1>
            <div className="header__change-button"><img src={icon}/></div>
        </div>

    );
};

export default AppHeader;