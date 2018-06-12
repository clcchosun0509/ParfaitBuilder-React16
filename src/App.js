import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'; //라우팅을 위해 추가한 모듈
import Layout from './containers/Layout/Layout';
import IcecreamBuilder from './containers/IcecreamBuilder/IcecreamBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch> {/* Switch를 사용하면 오직 하나의 Route만 실행된다. */}
            <Route path="/checkout" component={Checkout} />  {/* 이동하려는 페이지가 path에 적합하다면 첫번째로 실행, 체크아웃 페이지 */}
            <Route path="/orders" component={Orders} /> {/* 두번째로 실행, 주문목록 페이지 */}
            <Route path="/" exact component={IcecreamBuilder} /> {/*세번째로 실행, 이동하려는 페이지가 정확히 /페이지라면 실행, 기본 페이지 */}
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
