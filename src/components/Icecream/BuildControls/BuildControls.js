import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [ //화면에 표시할 label, type 설정
    {label: '망고', type: 'mango'},
    {label: '초콜릿', type: 'chocolates'},
    {label: '딸기', type: 'strawberries'},
    {label: '바닐라', type: 'vanilla'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>현재 가격: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => ( //BuildControl 객체 하나씩 실행, ctrl은 현재 실행되고있는 객체를 나타냄
            <BuildControl 
                key={ctrl.label} //label 하나로도 충분히 구별되므로 label로 키 설정
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/> //추가 버튼을 누르면 재료가 추가되도록 added에 함수 할당
        ))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}>주문하기</button>
    </div>
);

export default buildControls;