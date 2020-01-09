import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import sinon from 'sinon';

import AnimationPlayer from './AnimationPlayer';

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const wrapper = shallow(
      <AnimationPlayer 
        framesList={[{}]}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });