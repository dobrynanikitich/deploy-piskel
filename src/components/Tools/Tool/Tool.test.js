import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import sinon from 'sinon';

import Tool from './Tool';

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const wrapper = shallow(
        <Tool
        id={0}
        key={0}
        active={true}
        icon={'pen'}
        setActiveTool={() => {}}
        tooltip={'pen'}
         />
    );
    expect(wrapper).toMatchSnapshot();
});

it('renders correctly dom', () => {
    const wrapper = render(
        <Tool
            id={0}
            key={0}
            active={true}
            icon={'pen'}
            setActiveTool={() => {}}
            tooltip={'pen'}
         />
    );
    expect(wrapper).toMatchSnapshot();
});

it('back button doesnt calls', () => {
    const spy = sinon.spy();
    const wrapper = mount(
        <Tool
            id={0}
            key={0}
            active={true}
            icon={'pen'}
            setActiveTool={spy}
            tooltip={'pen'}
         />
    );
  
    wrapper.simulate('click');
  
    expect(spy.calledOnce).toBe(true)
});