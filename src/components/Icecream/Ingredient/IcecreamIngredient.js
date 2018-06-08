import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './IcecreamIngredient.css'

//class를 사용한 컴포넌트이지만 state를 사용하지 않으므로 components 폴더에서 만들었다.
class IcecreamIngredient extends Component {
    render() {
       let ingredient = null;
    
        switch (this.props.type) {
            case ('white-bowl'):
                ingredient = <div className={classes.WhiteBowl}></div>;
                break;
            case ('chocolate-bar'):
                ingredient = <div className={classes.ChocolateBar}></div>;
                break;
            case ('vanilla'):
                ingredient = <div className={classes.Vanilla}></div>;
                break;
            case ('strawberries'):
                ingredient = <div className={classes.Strawberries}></div>;
                break;
            case ('chocolates'):
                ingredient = <div className={classes.Chocolates}></div>;
                break;
            case ('mango'):
                ingredient = <div className={classes.Mango}></div>;
                break;
            default:
                ingredient = null;
        }
        return ingredient; 
    }
}

IcecreamIngredient.propTypes = {
  type: PropTypes.string.isRequired  
};

export default IcecreamIngredient;