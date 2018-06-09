import React, {Component, Fragment} from 'react';
import Icecream from '../../components/Icecream/Icecream';
import BuildControls from '../../components/Icecream/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Icecream/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

// 각각 재료의 가격들을 객체로 표현
const INGREDIENT_PRICES = {
    mango: 0.5,
    strawberries: 0.4,
    vanilla: 1.3,
    chocolates: 0.7
}
//아이스크림과 아이스크림 제작 컨트롤러를 사용한 stateful 컴포넌트
//Layout.js는 부모 컴포넌트
class IcecreamBuilder extends Component {
    // constructor(props) { //예전의 state 사용 방식
    //     super(props);
    //     this.state = {...}
    // }
    state = { //ES6에서의 state 사용 방식
        ingredients: null, //재료
        totalPrice: 4, //초기의 가격 4달러 설정
        purchasable: false, //구입할 수 있는지 없는지 설정
        purchasing: false, // OrderSummary의 모달창의 팝업 여부를 설정
        loading: false, //true일 경우 스피너(로딩창)가 뜨도록 설정
        error: false
    }
    
    componentDidMount () { //재료 객체를 firebase에 가져오기 위함
        axios.get('https://react-my-parfait.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data}); //firebase에서 가져온 재료 객체로 설정한다.
            })
            .catch(error => {
                this.setState({error: true});
            });
    }
    
    updatePurchaseState (ingredients) { //주문하기 버튼의 상태 수정용 함수
        const sum = Object.keys(ingredients) //.map -> return까지 해당 ingredients의 value값들을 얻고
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => { //.reduce -> return까지 각각 ingredient의 value 값을 el에 저장하고 0으로 초기화된 sum에 누적하여 총 재료의 양을 구한다.
                return sum + el;
            }, 0);
            this.setState({purchasable: sum > 0}); // sum 값이 최소 1개 이상이면 purchasable은 true값이 되고, 현재 상태를 저장한다.
    }
    
    addIngredientHandler = (type) => {  //해당 재료를 1개 추가할 때의 핸들러
        const oldCount = this.state.ingredients[type]; //이전 해당 재료의 양
        const updatedCount = oldCount + 1; //이전 해당 재료의 양에 1개 추가
        const updatedIngredients = { //포인터가 아닌 내용물을 직접 복사하기 위해 spread 기능 사용(ES6)
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; //해당 재료의 현재 양을 반영
        const priceAddition = INGREDIENT_PRICES[type]; //해당 재료의 가격 설정
        const oldPrice = this.state.totalPrice; //아이스크림 및 재료의 가격을 종합한 예전의 가격
        const newPrice = oldPrice + priceAddition; //재료를 1개 추가하였으므로 현재 재료까지 추가한 총 가격
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients}); //state 반영
        this.updatePurchaseState(updatedIngredients);
    }
    
    removeIngredientHandler = (type) => { //해당 재료를 1개 제거할 때의 핸들러
        const oldCount = this.state.ingredients[type]; //이전 해당 재료의 양
        if (oldCount <= 0) { //재료가 0개 이하가 되면 마이너스가 되지 않도록 바로 리턴시킨다.
            return;
        }
        const updatedCount = oldCount - 1; //이전 해당 재료의 양에 1개 제거
        const updatedIngredients = { //포인터가 아닌 내용물을 직접 복사하기 위해 spread 기능 사용(ES6)
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount; //해당 재료의 현재 양을 반영
        const priceDeduction = INGREDIENT_PRICES[type]; //해당 재료의 가격 설정
        const oldPrice = this.state.totalPrice; //아이스크림 및 재료의 가격을 종합한 예전의 가격
        const newPrice = oldPrice - priceDeduction; //재료를 1개 제거하였으므로 현재 재료까지 제거한 총 가격
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients}); //state 반영
        this.updatePurchaseState(updatedIngredients);
    }
    
    purchaseHandler = () => { //주문하기 버튼을 눌렀을 때 사용될 핸들러
        this.setState({purchasing: true});
    }
    
    purchaseCancelHandler = () => { //모달창이 사라지도록 하기위한 핸들러
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () => { //주문하기를 누른 후 계속 버튼을 눌렀을 때 작동할 핸들러
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                this.setState({loading:false, purchasing: false});  //spinner 동작이 멈추도록 loading에 false 값을 주었다.
            })                                                      //purchasing도 false 값을 주었는데, modal창을 닫도록 하기 위함이다.
            .catch(error => { //error 확인용
                this.setState({loading:false, purchasing: false}); //에러가 났을경우에도 spinner 동작이 멈추도록 하였다.
            }); 
    }
    
    render () {
        const disabledInfo = { //재료가 0개보다 적거나 같다면 비활성화 됬음을 알려줌
            ...this.state.ingredients //ingredients의 state 직접 복사 (ES6방식 사용)
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; //예시: {strawberries: true, vanilla: false 등..}
        }
        let orderSummary = null; 
        
        let icecream = this.state.error ? <p>재료들을 불러오는데 실패하였습니다.</p> : <Spinner />; //error가 true일 경우 firebase로부터 ingredients를 받아오는 데 실패한것이다.
        if (this.state.ingredients) { //만약 ingredients가 전부 갖춰졌다면, icecream은 Spinner대신 아래의 컴포넌트들을 얻는다.
            icecream = (
            <Fragment>
                <Icecream ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Fragment>);
            orderSummary = <OrderSummary //로딩이 전부 이루어졌다면 loading은 false로 밑의 if문이 실행 안된다.
                ingredients= {this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }
        if (this.state.loading) { //true일 경우 아직 로딩이 전부 안됬으므로 Spinner가 뜨도록 설정
            orderSummary = <Spinner />;
        }
        
        //Modal을 사용하여,고객이 주문하기를 눌렀을 때 모달창을 띄워준다.
        //modalClosed는 백드롭에서 사용된다.
        //Icecream은 아이스크림을 시각적으로 보여준다.
        //BuildControls는 재료의 추가와 제거용으로 사용
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {icecream}
            </Fragment>    
        );
    }
}
//withErrorHandler로 감쌌는데, 두번째 파라미터로 axios도 같이 보냈다.
//axios에 에러정보가 있을시에 withErrorHandler에서 처리한다.
export default withErrorHandler(IcecreamBuilder, axios); 