import React, {Component, Fragment} from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

//툴바, SideDrawer, 백드롭을 사용할 컴포넌트
//자식 컴포넌트를 사용하기 위해 {props.children}을 추가함
//SideDrawer는 모바일 디바이스에서만 사용된다.
//Layout에 state와 함수를 사용하기 위해, 또한 Toolbar와 SideDrawer의 상호작용을 위해 class 컴포넌트로 변환했다.
class Layout extends Component {
    state = {
        showSideDrawer: false //SideDrawer의 Open 및 Closed 상태를 저장한다.
    }
    
    sideDrawerClosedHandler = () => { //SideDrawer를 Closed 하도록 false 설정을 하였다.
        this.setState({showSideDrawer: false});
    }
    
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { //비동기적으로 setState가 되기떄문에 불안전한 상황을 막기 위한 용도
            return {showSideDrawer: !prevState.showSideDrawer}; //SideDrawer 토글용
        });
    }
    
    render() {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer} //open과 closed는 백드롭 부분을 눌렀을 때 백드롭 css 효과와 SideDrawer가 사라지도록 만들었다.
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children} 
                </main>
            </Fragment>   
        );
    }
}
export default Layout;