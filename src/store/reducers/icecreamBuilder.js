import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null, //firebase에서 데이터를 얻기 때문에 설정 필요 없음
    totalPrice: 4, //초기의 가격 4달러 설정
    error: false
};

// 각각 재료의 가격들을 객체로 표현
const INGREDIENT_PRICES = {
    mango: 0.5,
    strawberries: 0.4,
    vanilla: 1.3,
    chocolates: 0.7
}

//ES6 방식으로 만약 state가 초기화가 안되어있다면, initialState로 초기화한다.
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:   //재료를 1개 추가한다.
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, /* 깊은 복사가 이루어지도록 한번 더 객체를 복제한다. */
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1/* ES6에서 제공되는 방식 */
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENTS: //재료를 1개 제거한다.
            return {
                ...state,
                ingredients: {
                    ...state.ingredients, /* 깊은 복사가 이루어지도록 한번 더 객체를 복제한다. */
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1/* ES6에서 제공되는 방식 */
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS: //firebase로부터 재료를 불러와 초기화 한다.
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,    //혹시 이전에 error가 true였어도 초기화하는데 성공했으므로, false로 설정한다.
                totalPrice: 4
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED: //firebase로부터 재료를 초기화시키는데 실패했을 경우
            return {
                ...state,
                error: true
            }
        default:
            return state;   //위의 case 조건문들이 모두 만족되지 못할경우 state를 그대로 반환한다.
    }
    
};

export default reducer;