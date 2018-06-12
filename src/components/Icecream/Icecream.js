import React from 'react';
//import {withRouter} from 'react-router-dom'; //withRouter를 사용하여 기존의 props 이외에도 router에 관련된 정보를 얻기위해 사용한다.
import classes from './Icecream.css';
import IcecreamIngredient from './Ingredient/IcecreamIngredient'

const icecream = (props) => {
    // console.log(props);
    //keys는 객체를 배열로 만들고 map으로 배열의 요소를 하나씩 실행한다.
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <IcecreamIngredient key={igKey + i} type={igKey} amount={1+i}/>
            }); 
            //Array(...)에서 ...에 숫자를 입력하면 그 숫자만큼 빈 배열을 만들어준다.
            //igKey의 예로는 chocolate, vanilla, mango 등이 있겠다.
            //props.ingredients[igKey]를 통해 해당하는 재료의 숫자를 얻어내서 Array(숫자)로 배열을 만들어낸다.
            //<IcecreamIngredient key={igKey + i}에서 key={igKey + i}를 사용한 이유는 다른 키들과 구별되는 키를 만들어내기 위함이다.
        }).reduce((arr, el) => { //reduce를 사용한 이유는 만약 추가한 재료가 없다면 밑의 조건문을 통해서 재료를 추가해달라고 알리기 위함이다.
            return arr.concat(el)
        }, []);
        // console.log(transformedIngredients);
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>재료를 추가해주세요!</p>
        }
    return (
        <div className={classes.Icecream}>
            <IcecreamIngredient type="chocolate-bar" />
            {transformedIngredients}
            <IcecreamIngredient type="white-bowl" />
        </div>  
    );  
};

export default icecream;
//export default withRouter(icecream); //withRouter를 사용할 때에는 이렇게 감싸는 형식으로 사용된다.