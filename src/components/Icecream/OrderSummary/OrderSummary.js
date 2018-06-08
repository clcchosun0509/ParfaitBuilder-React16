import React, {Fragment} from 'react';
import Button from '../../UI/Button/Button'

// 파르페 재료 번역
const INGREDIENT_NAME = {
    mango: "망고",
    strawberries: "딸기",
    vanilla: "바닐라",
    chocolates: "초콜릿"
}

//주문하기 버튼을 눌렀을 때 나오는 창
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span>{INGREDIENT_NAME[igKey]}</span>: {props.ingredients[igKey]}
                </li> );
        });
    //btnType로 Button.css에 있는 class로 스타일링하고,
    //clicked로 버튼을 클릭했을 때 실행할 함수를 설정한다.
    return (
        <Fragment>
            <h3>주문 목록</h3>
            <p>다음 재료를 포함한 고객님의 파르페입니다:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>총 주문 가격: {props.price.toFixed(2)}</strong></p>
            <p>주문 하시겠습니까?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>취소</Button> 
            <Button btnType="Success" clicked={props.purchaseContinued}>계속</Button>
        </Fragment>
    );
};

export default orderSummary;