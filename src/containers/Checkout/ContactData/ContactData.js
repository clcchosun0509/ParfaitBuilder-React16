import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

//회원의 개인정보를 처리할 컴포넌트
class ContactData extends Component {
    state = {
        orderForm: {    //orderForm은 <input>, <select>, <textarea>와 같은 입력 태그로 처리하기 위한 객체이다.
            name: {     //name은 key, value는 객체이다.
                elementType: 'input',   //<input>태그를 사용한다.
                elementConfig: {        //<input>태그의 속성을 정한다.
                    type: 'text',       //type 속성으로 text를 사용한다.
                    placeholder: '이름' //placeholder 속성으로 이름을 띄운다.
                },
                value: '',
                validation: {           //유효성 검증에서 사용된다.
                    required: true      //반드시 입력을 받아야된다.
                },
                valid: false,           //유효성 검증에서 사용된다.
                touched: false          //입력이 생겼다면, true로 설정된다.
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '도로명 주소'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '우편 번호'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true //숫자 형식인가?
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: '이메일'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true   //email 형식인가?
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',  //<select> 태그를 사용한다.
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: '최대한 빠르게'},
                        {value: 'normal', displayValue: '적당하게'},
                        {value: 'cheapest', displayValue: '느리지만 저렴하게'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        formIsValid: false, //주문하기 전에, 작성된 회원의 개인정보가 유효한지 아닌지 판단한다.
        loading: false
    }
    
    orderHandler = (event) => {
        event.preventDefault(); //send request를 보내서 페이지가 reloading 하는것을 방지
        this.setState({loading: true});
        const formData = {};    //orderForm[???].value 값을 저장하기 위한 객체
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData //회원의 개인정보도 같이 order 목록에 추가한다.
            
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
    
    checkValidity(value, rules) {   //유효성 검증을 한다.
        let isValid = true;
        if(!rules) {    //deliveryMethod에 발생하는 에러를 잡기위한 조치
            return true;
        }
        
        if (rules.required) {   //required가 true라면 아래의 검사를 시작한다. (1글자라도 입력이 되어있는지 검사)
            isValid = value.trim() !== '' && isValid;  //만약 trim(중간의 whitespace가 제거)된 value 값이 빈string이 아니라면 true가 전달된다.
        }
        
        if (rules.minLength) {  //string의 최소길이 검사
            isValid = value.length >= rules.minLength && isValid;
        }
        
        if (rules.maxLength) {  //string의 최대길이 검사
            isValid = value.length <= rules.minLength && isValid;
        }
        
        if (rules.isEmail) {    //정규표현식 이메일 검사
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {   //정규표현식 숫자 검사
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        
        return isValid;     //유효한 상태라면 true값을 아니면 false값을 전달한다.
    }
    
    //...(spread)를 사용하면 진정한 복사가 가능하지만 여전히 orderForm에 있는 요소들의 값은 또다른 객체이므로,
    //그 또다른 객체의 요소들이 아닌 (그 또다른 객체의) 포인터가 복사되게 된다.
    //하지만 우리가 원하는 것은 orderForm[???].value의 값을 업데이트 하는 것뿐이기 때문에 먼저 orderForm을 ...로 복사하고
    //그 다음 orderForm[???]를 ...로 복사한 후, orderForm[???].value의 값을 수정하고, setState로 반영하면 모든 작업이 끝난다.
    inputChangedHandler = (event, inputIdentifier) => { 
        //console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value; //키보드로 입력한 글자를 updatedFormElement의 value 값에 입력한다.
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation); //유효성 검증을 시작하기 위한 함수를 실행한다.
        updatedFormElement.touched = true;  //한번이라도 입력이 생기면 true로 설정한다.
        updatedOrderForm[inputIdentifier] = updatedFormElement; //업데이트된 orderForm[???]을 반영한다.
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) { //회원 개인정보의 유효성 검사를 한다.
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;   //만약 한개의 Input만이 false라도, formIsValid는 false가 된다. 
        }
        
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    
    render() {
        const formElementsArray = [];   //최종적으로 <input>, <select> 등의 태그에 속성까지 추가해 출력하는데 사용된다.
        for (let key in this.state.orderForm) { //orderForm 내의 객체 요소를 하나씩 조사한다.
            formElementsArray.push({            //formElementsArray 배열에 객체를 push한다.
                id: key,
                config: this.state.orderForm[key] //elementType, elementConfing, value가 있는 객체를 value 값으로 정한다.
            });
        }
        //로딩이 안되었다면 form에는 Spinner가 차지하고, 되었다면 원래의 form으로 돌아온다.
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => ( //forElementsArray 배열의 요소를 하나씩 조사한다.
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>주문</Button>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);