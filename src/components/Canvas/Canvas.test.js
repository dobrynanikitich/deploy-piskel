// import React from 'react';
// import Enzyme, { shallow, render, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import { createSerializer } from 'enzyme-to-json';
// import sinon from 'sinon';

// import Canvas from './Canvas';

// expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

// Enzyme.configure({ adapter: new Adapter() });

// it('should add mousemove listener', () => {
//     const spy = sinon.spy();
//     const wrapper = mount(
//         <Canvas 
//             activeTool={'pen'}
//             currentColor={'#000000'}
//             convertImageToFrame={() => {}}
//             pencilSize={1}
//             pixelsNumber={32}
//         />
//     );
//     const l = wrapper.find('#canvas2');
//     console.log(l);
//     // expect(wrapper.secondCanvas.current.style.opacity).toEqual(0);
//     // wrapper.instance().changeCurrentColor();
//     // expect(spy.calledOnce).toBe(true);
// });