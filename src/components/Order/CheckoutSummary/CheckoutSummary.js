import React from 'react';
import Icecream from '../../Icecream/Icecream';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

//주문 할때에 파르페도 같이 표현하기 위해 만들었다.
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>완성된 파르페 입니다!!</h1>
            <div style={{width: '700px', height: '600px'}}>
                <Icecream ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>취소</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>계속</Button>
        </div>
    );
}

export default checkoutSummary;