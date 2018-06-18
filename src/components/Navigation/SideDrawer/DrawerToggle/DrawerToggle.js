import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
     <div></div>    {/* 세줄의 아이콘을 표시하기 위한 조치(모바일에서만 보인다.) */}
     <div></div>
     <div></div>
    </div>
);

export default drawerToggle;