import React from 'react';
import Main from './components/Main';
import { BrowserRouter, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="custom-row">
          <Route component={Sidebar}></Route>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
