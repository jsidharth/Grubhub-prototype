import React, { Component } from 'react';
import Route from '../routes';
import cookie from 'js-cookie';
import {Redirect} from 'react-router-dom';
class Main extends Component {
  render() {
    let redirectVar = null;
        if(!cookie.get('token')){
            redirectVar = <Redirect to= "/signin"/>
        }
    return (
      <div style={{ width: '100%' }}>
        {redirectVar}
        <Route />
      </div>
    );
  }
}

export default Main;