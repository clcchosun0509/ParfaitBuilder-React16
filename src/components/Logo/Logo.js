import React from 'react';
import icecreamLogo from '../../assets/images/icecream-logo.png'; //webpack에게 img를 인식시키려면 직접 import 해야한다.
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={icecreamLogo} alt="MyParfait" />
    </div>
);

export default logo;