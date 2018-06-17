import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//sync 코드
export const purchaseIcecreamSuccess = (id, orderData) => { //post 요청이 성공했을 경우
    return {
        type: actionTypes.PURCHASE_ICECREAM_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

//sync 코드
export const purchaseIcecreamFail = (error) => { //post 요청이 실패했을 경우
    return {
      type: actionTypes.PURCHASE_ICECREAM_FAIL,
      error: error
    };
};

//sync 코드
export const purchaseIcecreamStart = () => {    //loading spinner를 사용하기 위한 조치
    return {
        type: actionTypes.PURCHASE_ICECREAM_START
    };
};

//async 코드
export const purchaseIcecream = (orderData) => {
    return dispatch => {
        dispatch(purchaseIcecreamStart());
        //post request를 사용한다.
        //firebase에서는 MongoDB와 비슷한 형태의 데이터베이스를 사용하는데, post request를 할 때 꼭 /???.json 형태로 써야 한다.
        axios.post('/orders.json', orderData)
            .then(response => { //response 확인용 (post 요청이 성공했을 경우)
            console.log(response.data.name);
                // this.setState({loading:false});  //spinner 동작이 멈추도록 loading에 false 값을 주었다.
                // this.props.history.push('/');   // '/'페이지로 리다이렉트 시키기 위함
                dispatch(purchaseIcecreamSuccess((response.data.name, orderData)));
            })
            .catch(error => { //error 확인용 (post 요청이 실패했을 경우)
                // this.setState({loading:false}); //에러가 났을경우에도 spinner 동작이 멈추도록 하였다.
                dispatch(purchaseIcecreamFail(error));
            });
    };
};

//sync 코드
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

//sync 코드
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

//sync 코드
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

//sync 코드
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

//async 코드
export const fetchOrders = () => {  //firebase로부터 주문 목록을 가져온다.
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
        .then(res => {
            //console.log(res.data);
            const fetchedOrders = [];
            for (let key in res.data) { //res.data는 firebase의 orders 노드에 있는 객체들이다.
                fetchedOrders.push({    //fetchedOrders 배열에 firebase에서 받아온 객체이외에도, firebase에서 자동으로 설정된 key값을 id값의 value로 설정한다.
                    ...res.data[key],
                    id: key
                    
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
            // this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(err => {
            dispatch(fetchOrdersFail(err));
            // this.setState({loading: false});
        });
    };
};