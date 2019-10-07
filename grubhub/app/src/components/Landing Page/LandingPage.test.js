// Link.react.test.js
import React from 'react';
import LandingPage from './LandingPage';
import renderer from 'react-test-renderer';

import { mount, shallow, render } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Landing Page test', function() {

    it('should render correctly', () => {
      const component = shallow( <LandingPage/>);
      expect(component).toMatchSnapshot();
    });
    
    it('should be wrapped in a container div', () => {
        const component = shallow( <LandingPage/>);
        expect(component.find('.container').length).toEqual(1);
      });
    
      it('should have one Sign up button', () => {
        const component = shallow( <LandingPage/>);
        expect(component.find('.sign-up').length).toEqual(1);
      });
    
      it('should have one Sign in button', () => {
        const component = shallow( <LandingPage/>);
        expect(component.find('.sign-in').length).toEqual(1);
      });
});
