// Link.react.test.js
import React from 'react';
import {Signin} from './Signin';

import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Signin component', function(){
    it('should render correctly', () => {
      const component = shallow( <Signin/>);
      expect(component).toMatchSnapshot();
    });
    it('should be wrapped in a div', () => {
        const component = shallow( <Signin/>);
        expect(component.find('.singup_form').length).toEqual(1);
      });
    
      it('should have one Sign in button', () => {
        const component = shallow( <Signin/>);
        expect(component.find('.sign-in').length).toEqual(1);
      });
    
      it('should have email field', () => {
        const component = shallow( <Signin/>);
        expect(component.find('.email').length).toEqual(1);
      });
      it('should have password field', () => {
        const component = shallow( <Signin/>);
        expect(component.find('.password').length).toEqual(1);
      });

})

