import React, {Fragment} from 'react';
import classes from './Layout.css';

//툴바, 사이드바, 백드롭을 사용할 stateless 컴포넌트
//자식 컴포넌트를 사용하기 위해 {props.children}을 추가함
const layout = (props) => (
    <Fragment>
        <div>툴바, 사이드바, 백드롭</div>
        <main className={classes.Content}>
            {props.children} 
        </main>
    </Fragment>
);

export default layout;