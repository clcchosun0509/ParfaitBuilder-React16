import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

//툴바 오른쪽 부분에 네비게이션 아이템 표시
const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>파르페 만들기</NavigationItem>
        <NavigationItem link="/orders">주문 목록</NavigationItem>
    </ul>
);

export default navigationItems;