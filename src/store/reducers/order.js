import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false    //구입이 완료되었으면 true, 아니면 false이다.
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        
        case actionTypes.PURCHASE_ICECREAM_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_ICECREAM_SUCCESS:     //firebase로의 post 요청이 성공했을 경우
            //기존의 order 데이터와 firebase의 id를 합친 새로운 order
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                purchased: true,    //구입이 최종적으로 이루어졌으므로 true로 바꾼다.(리다이렉트 용도)
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_ICECREAM_FAIL:        //firebase로의 post 요청이 실패했을 경우
            return {
                ...state,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_START:    //Spinner 표시용
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:  //주문 목록 가져오기 성공
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case actionTypes.FETCH_ORDERS_FAIL:     //주문 목록 가져오기 실패
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;