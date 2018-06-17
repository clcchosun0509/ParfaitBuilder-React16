import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//Action Creater
//dispatch 함수로 함께 보낼 객체를 여기서 정한다.
export const addIngredient = (name) => {
  return {
      type: actionTypes.ADD_INGREDIENTS,
      ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
      type: actionTypes.REMOVE_INGREDIENTS,
      ingredientName: name
  };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () => {
  return dispatch => {
      axios.get('https://react-my-parfait.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        });
  };
};