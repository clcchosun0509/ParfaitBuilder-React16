import React, {Fragment} from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';

//모바일 제품에서 사용될 sideDrawer
const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]; //기본 상태는 Close 상태
    if (props.open) { //만약 Layout.js의 ShowSideDrawer가 true이면 SideDrawer가 표시되도록 Close 클래스 대신 Open 클래스를 사용한다.
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div> 
        </Fragment>
    );  
};

export default sideDrawer;