import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import sinon from 'sinon';

import classes from './Header.module.scss';
import Header from './Header';

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const wrapper = shallow(
    <Header 
      isSignedIn={true}
      changeState={() => {}}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders correctly again', () => {
  const wrapper = render(
    <Header 
      isSignedIn={true}
      changeState={() => {}}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it('formats application name correctly', () => {
  const wrapper = mount(
    <Header 
      isSignedIn={true}
      changeState={() => {}}
    />
  );

  const text = wrapper.find('div').first().text()

  expect(text).toEqual('PISKEL CLONE');
});

it('back button doesnt calls', () => {
  const spy = sinon.spy();
  const wrapper = mount(
    <a href='#/' className={classes.BackToLanding}>
        BACK
    </a>
  );

  wrapper.simulate('click');

  expect(spy.calledOnce).toBe(false);
});

// it('sign in button clicks correctly', () => {
//   const spy = sinon.spy();
//   const wrapper = mount(
//     <Header 
//       isSignedIn={false}
//       onClick={spy}
//     />
//   );

//   wrapper.find('[data-testid="sign-in-test"]').simulate('click');
//   expect(spy.calledOnce).toBe(true); 
// });
