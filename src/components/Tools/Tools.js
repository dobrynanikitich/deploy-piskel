import React, { Component } from 'react';
import PenSize from './PenSize/PenSize';
import Tool from './Tool/Tool';
import SwitchColor from './SwitchColor/SwitchColor';
import ShotCuts from './ShotCuts/ShotCuts';
import Select from 'react-select';

import classes from './Tools.module.scss';

class Tools extends Component {
    toolsList = [
      {
        id: 'pen',
        iconName: 'pen-fancy',
        tooltip: 'Pen (P)',
        keyCode: 'KeyP'
      },
      {
        id: 'eraser',
        iconName: 'eraser',
        tooltip: 'Eraser (E)',
        keyCode: 'KeyE'
      },
      {
        id: 'stroke',
        iconName: 'pencil-ruler',
        tooltip: 'Stroke (E)',
        keyCode: 'KeyS'
      },
      {
        id: 'bucket',
        iconName: 'fill-drip',
        tooltip: 'Bucket (B)',
        keyCode: 'KeyB'
      },
      {
        id: 'bucketall',
        iconName: 'palette',
        tooltip: 'Bucket all pixels at the same color (A)',
        keyCode: 'KeyA'
      },
  ];

  options = [
    { value: 32, label: '32' },
    { value: 64, label: '64' },
    { value: 128, label: '128' },
  ];

  setActiveTool = (e) => {
    const { id } = e.currentTarget;
    if (id !== this.props.activeTool) {
      this.props.changeState('activeTool', id)
    }
  }

  changePencilSizeHandler = (e) => {
    const { id } = e.currentTarget
    switch (id) {
      case 'firstSize':
        this.props.changeState('pencilSize', 1);
        this.props.changeState('activePenSize', 'firstSize');
        break;
      case 'secondSize':
        this.props.changeState('pencilSize', 2);
        this.props.changeState('activePenSize', 'secondSize');
        break;
      case 'thirdSize':
        this.props.changeState('pencilSize', 3);
        this.props.changeState('activePenSize', 'thirdSize');
        break;
      case 'forthSize':
        this.props.changeState('pencilSize', 4);
        this.props.changeState('activePenSize', 'forthSize');
        break; 
      default: break;
    }
  }

  changeCanvasSizeHandler = (data) => {
    this.props.changeState('pixelsNumber', data.value);
  }

  handleShortcuts = (action, event) => {
    // console.log('++++++')
    // switch(action) {
    //   case 'p': console.log('++++');
    //   break
    //   default: break
    // }
  }

  render() {
    const { changeState, activeTool, activePenSize, currentColor, pixelsNumber } = this.props;

    return (
      <>
        <section className={classes.ToolsSection}>
          <PenSize
            activeId={activePenSize}
            changePencilSizeHandler={this.changePencilSizeHandler}
          />
          <Select
            onChange={this.changeCanvasSizeHandler}
            options={this.options}
            placeholder={pixelsNumber}
            className={classes.SelectInput}
          />
          <div className={classes.MainTools}>
            {this.toolsList.map(tool => (
              <Tool
                id={tool.id}
                key={tool.id}
                active={tool.id === activeTool}
                icon={tool.iconName}
                setActiveTool={this.setActiveTool}
                tooltip={tool.tooltip}
              />
            ))}
          </div>
          <SwitchColor 
            changeState={changeState}
            currentColor={currentColor}
          />
          <ShotCuts />
        </section>
      </>
    );
  };
};

export default Tools;