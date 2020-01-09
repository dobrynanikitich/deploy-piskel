import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import './static/icons';
import classes from './App.module.scss';

import Header from './components/Header/Header';
import Tools from './components/Tools/Tools';
import Frames from './components/Frames/Frames';
import Canvas from './components/Canvas/Canvas';
import AnimationPlayer from './components/AnimationPlayer/AnimationPlayer';
import keymap from './keymap';
import { ShortcutManager, Shortcuts } from 'react-shortcuts';

export const shortcutManager = new ShortcutManager(keymap);

class App extends Component {
  state = {
    activeTool: 'pen',
    activePenSize: 'firstSize',
    currentColor: '#000000',
    activeFrame: 0,
    framesList: [
      {},
    ],
    pixelsNumber: 32,
    pencilSize: 1,
    isSignedIn: false, 
  };

  getChildContext() {
    return { shortcuts: shortcutManager }
  }

  handleShortcuts = (action, event) => {
    console.log('++++++')
    switch(action) {
      case 'p': console.log('++++');
      break
      default: break
    }
  }

  changeState = (property, value) => {
    this.setState({ [property]: value })
  }

  convertImageToFrame = () => {
    const { activeFrame, framesList } = this.state;
    const newFramesList = [...framesList];
    const newActiveFrame = newFramesList.find((frame, i) => i === activeFrame);
    const canvas = document.querySelector('#canvas');
    const mainCtx = canvas.getContext('2d');
    const imageData = mainCtx.getImageData(0, 0, canvas.width, canvas.height);
    newActiveFrame.imageData = imageData;
    this.setState({ framesList: newFramesList });
  }

  changeFrames = (id1, id2) => {
    const newFramesList = [...this.state.framesList];
    [newFramesList[id1], newFramesList[id2]] = [newFramesList[id2], newFramesList[id1]];
    this.setState({ framesList: newFramesList });
  }

  render() {
    const { activeTool, activePenSize, currentColor } = this.state;
    return (
      <>
        <Header 
          isSignedIn={this.state.isSignedIn}
          changeState={this.changeState}  
        />
        <Shortcuts
            name='Tools'
            handler={this.handleShortcuts}
          >
        <div className={classes.App}>
          <ReactTooltip place="right" type="dark" effect="float" />
          <Tools
            changeState={this.changeState}
            activeTool={activeTool}
            activePenSize={activePenSize}
            currentColor={currentColor}
            pixelsNumber={this.state.pixelsNumber}
            getChildContext={this.getChildContext}
          />
          <Frames 
            activeFrame={this.state.activeFrame}
            changeState={this.changeState}
            framesList={this.state.framesList}
            changeFrames={this.changeFrames}
          />
          <Canvas 
            activeTool={activeTool}
            currentColor={currentColor}
            convertImageToFrame={this.convertImageToFrame}
            pencilSize={this.state.pencilSize}
            pixelsNumber={this.state.pixelsNumber}
          />
          <AnimationPlayer 
            framesList={this.state.framesList}
          />
        </div>
        </Shortcuts>
      </>
    );
  }
}

App.childContextTypes = {
  shortcuts: PropTypes.object.isRequired
}

export default App;
