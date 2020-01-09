import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import sinon from 'sinon';

import Tools from './Tools';

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const wrapper = shallow(
      <Tools 
        changeState={() => {}}
        activeTool={0}
        activePenSize={'firstSize'}
        currentColor={'#000000'}
        pixelsNumber={32}
        getChildContext={() => {}}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly again', () => {
    const wrapper = render(
      <Tools 
        changeState={() => {}}
        activeTool={0}
        activePenSize={'firstSize'}
        currentColor={'#000000'}
        pixelsNumber={32}
        getChildContext={() => {}}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

it('change state function should be executed', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Tools 
        changeState={spy}
        activeTool={0}
        activePenSize={'firstSize'}
        currentColor={'#000000'}
        pixelsNumber={32}
        getChildContext={() => {}}
      />
    );

    wrapper.instance().setActiveTool({ currentTarget: { id: 1 } });
    expect(spy.calledOnce).toBe(true);
  });

  
it('change state function should not be executed', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Tools 
        changeState={spy}
        activeTool={0}
        activePenSize={'firstSize'}
        currentColor={'#000000'}
        pixelsNumber={32}
        getChildContext={() => {}}
      />
    );

    wrapper.instance().setActiveTool({ currentTarget: { id: 0 } });
    expect(spy.calledOnce).toBe(false);
  });

  it('change state function should be executed with correct params and right quantity', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Tools 
        changeState={spy}
        activeTool={0}
        activePenSize={'firstSize'}
        currentColor={'#000000'}
        pixelsNumber={32}
        getChildContext={() => {}}
      />
    );

    wrapper.instance().changePencilSizeHandler({ currentTarget: { id: 'firstSize' } });
    expect(spy.calledTwice).toBe(true);
  });

  it('change state function should be executed with correct params and right quantity', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Tools 
        changeState={spy}
        activeTool={0}
        activePenSize={'firstSize'}
        currentColor={'#000000'}
        pixelsNumber={32}
        getChildContext={() => {}}
      />
    );

    wrapper.instance().changePencilSizeHandler({ currentTarget: { id: 'secondSize' } });
    expect(spy.calledTwice).toBe(true);
  });

  it('change state function should be executed with correct params and right quantity', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Tools 
        changeState={spy}
        activeTool={0}
        activePenSize={'firstSize'}
        currentColor={'#000000'}
        pixelsNumber={32}
        getChildContext={() => {}}
      />
    );

    wrapper.instance().changePencilSizeHandler({ currentTarget: { id: 'thirdSize' } });
    expect(spy.calledTwice).toBe(true);
  });

  it('change state function should be executed with correct params and right quantity', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Tools 
        changeState={spy}
        activeTool={0}
        activePenSize={'firstSize'}
        currentColor={'#000000'}
        pixelsNumber={32}
        getChildContext={() => {}}
      />
    );

    wrapper.instance().changePencilSizeHandler({ currentTarget: { id: 'forthSize' } });
    expect(spy.calledTwice).toBe(true);
  });

  
  it('change state function should not be executed', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Tools 
        changeState={spy}
        activeTool={0}
        activePenSize={'firstSize'}
        currentColor={'#000000'}
        pixelsNumber={32}
        getChildContext={() => {}}
      />
    );

    wrapper.instance().changePencilSizeHandler({ currentTarget: { id: 'fifthSize' } });
    expect(spy.calledTwice).toBe(false);
  });

  it('change state function should not be executed', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Tools 
        changeState={spy}
        activeTool={0}
        activePenSize={'firstSize'}
        currentColor={'#000000'}
        pixelsNumber={32}
        getChildContext={() => {}}
      />
    );

    wrapper.instance().changeCanvasSizeHandler({ data: { value: 32 } });
    expect(spy.calledOnce).toBe(true);
  });