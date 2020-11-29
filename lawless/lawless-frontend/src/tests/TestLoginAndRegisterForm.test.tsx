import { TextField } from '@material-ui/core';
import { shallow, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import LoginForm from '../components/LoginForm';
import CryptoJS from 'crypto-js';

configure({ adapter: new Adapter() });

describe('LoginForm test', () => {
  it('Test LoginForm rendering', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toBeTruthy();
  });

  it('Test user input form working', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find(TextField)).toHaveLength(2);
  });

  it('Username input change', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find(TextField)).toHaveLength(2);

    wrapper
      .find('#userName')
      .simulate('change', { persist: () => {}, target: { name: 'userName', value: 'testuser' } });

    expect(wrapper.find('#userName').props().value).toEqual('testuser');
  });

  it('Password change', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find(TextField)).toHaveLength(2);

    wrapper
      .find('#password')
      .simulate('change', { persist: () => {}, target: { name: 'password', value: 'testpassword' } });

    expect(wrapper.find('#password').props().value).toEqual('testpassword');
  });

  it('Submit login form', async () => {
    const wrapper = shallow(<LoginForm />);

    const mockedLogin = jest.fn();

    jest.mock('../hooks/useLogin', () => {
      return jest.fn(() => {});
    });

    wrapper
      .find('#userName')
      .simulate('change', { persist: () => {}, target: { name: 'userName', value: 'testuser' } });

    wrapper
      .find('#password')
      .simulate('change', { persist: () => {}, target: { name: 'password', value: 'testpassword' } });

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}, // no op
    });

    const password = CryptoJS.SHA256('testpassword').toString();

    expect(mockedLogin).toBeCalled();
    expect(mockedLogin).toBeCalledWith({
      data: { username: 'testuser', password, email: '' },
    });
  });
});
