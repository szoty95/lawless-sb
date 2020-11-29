import { TextField } from '@material-ui/core';
import { shallow, configure, mount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import LoginForm from '../components/LoginForm';
import CryptoJS from 'crypto-js';
import RegisterDialog from '../components/RegisterDialog';

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
});

describe('RegisterForm test', () => {
  const register = <RegisterDialog open setOpen={() => {}} />;

  it('Test RegisterForm rendering', () => {
    const wrapper = shallow(register);
    expect(wrapper).toBeTruthy();
  });

  it('Test user input form working', () => {
    const wrapper = shallow(register);
    expect(wrapper.find(TextField)).toHaveLength(6);
  });

  it('Username input change', () => {
    const wrapper = shallow(register);
    wrapper
      .find('#userName')
      .simulate('change', { persist: () => {}, target: { name: 'userName', value: 'testuser' } });

    expect(wrapper.find('#userName').props().value).toEqual('testuser');
  });

  it('Password1 change', () => {
    const wrapper = shallow(register);

    wrapper
      .find('#password1')
      .simulate('change', { persist: () => {}, target: { name: 'password1', value: 'testpassword' } });

    expect(wrapper.find('#password1').props().value).toEqual('testpassword');
  });

  it('Password2 change', () => {
    const wrapper = shallow(register);

    wrapper
      .find('#password2')
      .simulate('change', { persist: () => {}, target: { name: 'password2', value: 'testpassword' } });

    expect(wrapper.find('#password2').props().value).toEqual('testpassword');
  });

  it('Last Name change', () => {
    const wrapper = shallow(register);

    wrapper.find('#lastName').simulate('change', { persist: () => {}, target: { name: 'lastName', value: 'test' } });

    expect(wrapper.find('#lastName').props().value).toEqual('test');
  });

  it('First Name change', () => {
    const wrapper = shallow(register);

    wrapper.find('#firstName').simulate('change', { persist: () => {}, target: { name: 'firstName', value: 'test' } });

    expect(wrapper.find('#firstName').props().value).toEqual('test');
  });

  it('Email change', () => {
    const wrapper = shallow(register);

    wrapper.find('#email').simulate('change', { persist: () => {}, target: { name: 'email', value: 'test@test.hu' } });

    expect(wrapper.find('#email').props().value).toEqual('test@test.hu');
  });
});
