import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; //라우팅하기 위해 추가한 코드
import {Provider} from 'react-redux';   //react와 redux를 쉽게 연결시켜주는 모듈
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';  //redux의 기능이 포함되있는 모듈
import thunk from 'redux-thunk';    //asyncronous 코드를 미들웨어에서 쉽게 실행 시켜주는 모듈
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import icecreamBuilderReducer from './store/reducers/icecreamBuilder';
import orderReducer from './store/reducers/order';

//글로벌 store로써 Provider에 감싸진 어떤 파일이든 쉽게 접근이 가능해진다.
//composeEnhancers는 크롬에서 redux devtools를 사용할 수 있게 해준다.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//icecreamBuilderReducer와 orderReducer를 한개의 rootReducer로 묶었다. combineReducers 모듈이 있어야한다.
const rootReducer = combineReducers({
    icecreamBuilder: icecreamBuilderReducer,
    order: orderReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk) //비동기적 코드와 함께 미들웨어를 사용할 수 있다.
));

//라우터를 사용하기 위해 App 태그를 BrowserRouter 태그에 감쌌다.
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

//그 후 <App /> 대신 app을 사용한다.
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
