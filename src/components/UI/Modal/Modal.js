import React, {Component, Fragment} from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

//Backdrop 컴포넌트를 Modal 컴포넌트에 포함시켜서, 만약 모달창이 나타난다면 Backdrop 컴포넌트에 의해 뒷배경이 50%정도로 어두워진다.
//퍼포먼스의 향상을 위해 Modal을 Class Based 컴포넌트로 바꾸었다.
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) { //주문하기 버튼을 누르기 전까지는 rerendering을 하지 않도록 바꾸었다.
            return nextProps.show !== this.props.show || nextProps.children !== this.props.children; //children 값이 다른 경우 Spinner를 보여주도록 하였다.
    }
    
    render() {
        return (
        <Fragment>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            <div 
            className={classes.Modal}
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', //props.show가 false일 경우 화면밖으로 밀려나간다.
                opacity: this.props.show ? '1' : '0' //props.show가 false일 경우 투명해져서 안보이게 된다.
            }}>
                {this.props.children}
            </div>
        </Fragment>
        );
    }
}

export default Modal;