import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

//회원의 개인정보를 처리할 컴포넌트
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    
    orderHandler = (event) => {
        event.preventDefault(); //send request를 보내서 페이지가 reloading 하는것을 방지
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "박건우",
                address: {
                    street: '수완로 33번길 76',
                    zipCode: '62306',
                    country: 'South Korea'
                },
                email: 'test@test.com'
            },
            deliveryMethod: '가능한 빠르게'
        }
        //post request를 사용한다.
        //firebase에서는 MongoDB와 비슷한 형태의 데이터베이스를 사용하는데, post request를 할 때 꼭 /???.json 형태로 써야 한다.
        axios.post('/orders.json', order)
            .then(response => { //response 확인용
                this.setState({loading:false});  //spinner 동작이 멈추도록 loading에 false 값을 주었다.
                this.props.history.push('/');   // '/'페이지로 리다이렉트 시키기 위함
            })
            .catch(error => { //error 확인용
                this.setState({loading:false}); //에러가 났을경우에도 spinner 동작이 멈추도록 하였다.
            }); 
    }
    
    render() {
        //로딩이 안되었다면 form에는 Spinner가 차지하고, 되었다면 원래의 form으로 돌아온다.
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="이름" />
                <input className={classes.Input} type="text" name="email" placeholder="이메일" />
                <input className={classes.Input} type="text" name="street" placeholder="도로명 주소" />
                <input className={classes.Input} type="text" name="postal" placeholder="우편 번호" />
                <Button btnType="Success" clicked={this.orderHandler}>주문</Button>
            </form>    
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>본인의 개인정보를 입력해주세요.</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;