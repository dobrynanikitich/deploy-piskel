import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import sinon from 'sinon';

import SwitchColor from './SwitchColor';

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const wrapper = mount(
      <SwitchColor 
        changeState={() => {}}
        currentColor={'#000000'}
      />
    );

    expect(wrapper).toMatchSnapshot();
});



it('should return correct hex color', () => {
    const wrapper = mount(
      <SwitchColor 
        changeState={() => {}}
        currentColor={'#000000'}
      />
    );

    expect(wrapper.instance().rgbToHex(0, 0, 0)).toEqual('#000000');
});

it('should execute changestate with correct data', () => {
    const spy = sinon.spy();
    const wrapper = mount(
        <SwitchColor 
            changeState={spy}
            currentColor={'#000000'}
        />
    );

    wrapper.instance().changeCurrentColor({ target: { value: '#000000', parentNode: { style: { backgroundColor: '#000000' } }} });
    expect(spy.calledOnce).toBe(true);
});

it('should change color of the object correctly', () => {
    const obj = {
        target: {
            parentNode: {
                style: {
                    backgroundColor: '#000000',
                }
            },
            value: '#ffffff',
        }
    }
    const wrapper = mount(
        <SwitchColor 
            changeState={() => {}}
            currentColor={'#000000'}
        />
    );

    wrapper.instance().changeSecondColor(obj);
    expect(obj.target.parentNode.style.backgroundColor).toEqual('#ffffff');
});

it('should execute changestate with correct data', () => {
    const spy = sinon.spy();
    const wrapper = mount(
        <SwitchColor 
            changeState={spy}
            currentColor={'#000000'}
        />
    );

    wrapper.instance().switchColors();
    expect(spy.calledOnce).toBe(true);
});