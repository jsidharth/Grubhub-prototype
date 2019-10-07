import React from 'react';
import { shallow } from 'enzyme';
import App from './App';


describe('App render', () => {
   it('renders without crashing', () => {
      shallow(<App />);
    });
});