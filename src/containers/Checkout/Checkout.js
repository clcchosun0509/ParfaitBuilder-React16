import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

//주문 할떄에 재료 표시 이외에도 파르페 이미지도 같이 표현한다.
class Checkout extends Component {
    
    checkoutCancelledHandler = () => { //체크아웃 페이지에서 취소 버튼을 눌렀을 경우
        this.props.history.goBack(); //goBack() 함수는 유저를 예전페이지로 돌아가도록 한다.
    }
    
    checkoutContinuedHandler = () => { //체크아웃 페이지에서 계속 버튼을 눌렀을 경우
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        //만약 재료가 로딩되어 있지 않은 상태에서 체크아웃 페이지에 있을경우 루트 페이지로 리다이렉트 된다.
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            //구입이 완료되었다면 루트 페이지로 리다이렉트 된다.
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.icecreamBuilder.ingredients,
        price: state.icecreamBuilder.totalPrice,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);