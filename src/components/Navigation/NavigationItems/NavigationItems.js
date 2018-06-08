import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

//툴바 오른쪽 부분에 네비게이션 아이템 표시
const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>파르페 만들기</NavigationItem>
        <NavigationItem link="/">체크아웃</NavigationItem>
    </ul>
);

export default navigationItems;