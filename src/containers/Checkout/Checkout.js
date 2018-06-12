import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

//주문 할떄에 재료 표시 이외에도 파르페 이미지도 같이 표현한다.
class Checkout extends Component {
    state = {           //임시용 설정
        ingredients: null,
        totalPrice: 0
    }
    
    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search); //search에 있는 string을 분리 할때 사용된다.
        // console.log(query);
        const ingredients = {}; //비어있는 객체로 생성
        let price = 0;
        for (let param of query.entries()) { //URLSearchParams에 있는 entries()를 사용하면, param은 ['mango', '2']와 같은 배열을 얻는다.
            if (param[0] === 'price') { //icecreamBuilder에서 totalPrice의 key를 price로 설정하였기 때문이다. price는 ingredients 객체와 따로 구분한다.
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1]; //param 0번째는 key로 사용되고, 1번째는 value로 사용된다. param[1] 자체는 String이므로 앞에 +를 붙여 number로 바꿔준다.
            }
            
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }
    
    checkoutCancelledHandler = () => { //체크아웃 페이지에서 취소 버튼을 눌렀을 경우
        this.props.history.goBack(); //goBack() 함수는 유저를 예전페이지로 돌아가도록 한다.
    }
    
    checkoutContinuedHandler = () => { //체크아웃 페이지에서 계속 버튼을 눌렀을 경우
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/> {/* component={ContactData} 대신 render를 사용하면, ingredients 정보를 보낼 수 있다. */}
            </div>
        );
    }
}

export default Checkout;