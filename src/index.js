import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; //라우팅하기 위해 추가한 코드
import {Provider} from 'react-redux';   //react와 redux를 쉽게 연결시켜주는 모듈
import {createStore} from 'redux';  //redux의 기능이 포함되있는 모듈
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';

//글로벌 store로써 Provider에 감싸진 어떤 파일이든 쉽게 접근이 가능해진다.
const store = createStore(reducer);

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
