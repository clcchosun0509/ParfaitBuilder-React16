import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

//주문목록을 보여주는 컴포넌트
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    
    componentDidMount() {
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
            this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(err => {
            this.setState({loading: false});
        });
    }
    
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);