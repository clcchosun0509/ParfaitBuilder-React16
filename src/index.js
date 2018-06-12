import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; //라우팅하기 위해 추가한 코드
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//라우터를 사용하기 위해 App 태그를 BrowserRouter 태그에 감쌌다.
const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

//그 후 <App /> 대신 app을 사용한다.
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
