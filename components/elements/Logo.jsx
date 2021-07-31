import React from 'react';
import LogoStyle from 'components/elements/Logo.module.css';


function Logo() {
    return (
        <div>
            <h1 className={LogoStyle.logoName}>
            &lt; <span className={LogoStyle.name}>Refactored</span> /&gt;
            </h1>
        </div>
    );
}

export default Logo;
