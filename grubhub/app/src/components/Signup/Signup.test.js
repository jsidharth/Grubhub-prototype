// Link.react.test.js
import React from 'react';
import {Signup} from './Signup';

import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Signup component', function(){
    it('should render correctly', () => {
      const component = shallow( <Signup/>);
      expect(component).toMatchSnapshot();
    });
    it('should be wrapped in a container div', () => {
        const component = shallow( <Signup/>);
        expect(component.find('.singup_form').length).toEqual(1);
      });
    
      it('should have one Sign up button', () => {
        const component = shallow( <Signup/>);
        expect(component.find('.sign-up-btn').length).toEqual(1);
      });
    
      it('should have first name field', () => {
        const component = shallow( <Signup/>);
        expect(component.find('.first_name').length).toEqual(1);
      });

})

