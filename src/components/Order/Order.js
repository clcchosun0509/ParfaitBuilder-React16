import React from 'react';
import classes from './Order.css';

const order = (props) => {
    // 파르페 재료 번역
    const INGREDIENT_NAME = {
        mango: "망고",
        strawberries: "딸기",
        vanilla: "바닐라",
        chocolates: "초콜릿"
    }
    
    const ingredients = [];
    
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: INGREDIENT_NAME[ingredientName],
            amount: props.ingredients[ingredientName]});
    }
    
    const ingredientOutput = ingredients.map(ig => {
       return <span 
            style={{
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });
    
    return (
        <div className={classes.Order}>
            <p>재료: {ingredientOutput}</p>
            <p>가격: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>    
    );
};

export default order;