import React from 'react';
import Main from './components/Main';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="custom-row">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
