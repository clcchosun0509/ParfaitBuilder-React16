import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

//웹페이지 최상단에 위치할 툴바
//nav 안에 NavigationItems를 배치하여 툴바 오른쪽 부분에 네비게이션 아이템들을 표시한다.
// DesktopOnly 설정으로 모바일 제품일 경우에는 NavigationItems에 display:none 설정을 하였다.
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;