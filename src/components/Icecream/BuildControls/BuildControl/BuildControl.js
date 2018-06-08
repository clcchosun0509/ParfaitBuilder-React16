import React from 'react';
import classes from './BuildControl.css'

//레이블과 버튼 2개로 구현한 컨트롤러 일부 구현 (재료의 선택용도)
//disabled 속성은 재료가 0개로써 더 이상 제거가 불가능하면 true가 되어서 disabled CSS pseudo class가 작동된다.
const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>제거</button>
        <button className={classes.More} onClick={props.added}>추가</button>
    </div>    
);

export default buildControl;