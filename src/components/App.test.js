import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import AppHeader from './common/AppHeader';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
    const wrapper = shallow(<App />);

    const appHeader = <AppHeader/>;
    expect(wrapper.contains(appHeader)).toEqual(true);
});
