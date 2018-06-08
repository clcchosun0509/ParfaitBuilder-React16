import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import IcecreamBuilder from './containers/IcecreamBuilder/IcecreamBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <IcecreamBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
