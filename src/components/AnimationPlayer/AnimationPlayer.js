 import React, { Component } from 'react';

 import InputRange from 'react-input-range';
 import SettingsTools from '../SettingsTools/SettingsTools';
 import classes from './AnimationPlayer.module.scss';
 import 'react-input-range/lib/css/index.css';

 class AnimationPlayer extends Component {
     state = {
        value: 0,
     }

     count = 0;
     animationControll = null;

     startAnimation = (value) => {
        const canvas = document.getElementById('animationScreen');
        const canvasFromFrame = canvas.getContext('2d');
      
        const changeCanvasColor = () => {
          const { framesList } = this.props;
          const { length } = framesList;
          console.log(this.count % length);
          const frame = framesList[this.count % length];
          canvasFromFrame.fillStyle = 'gray';
          frame.imageData ? canvasFromFrame.putImageData(frame.imageData, 0, 0) : canvasFromFrame.fillRect(0, 0, canvas.width, canvas.height)
          this.count += 1;
        }
      
        this.animationControll = setInterval(changeCanvasColor, 1000 / value);
      }

      rangeControll = (value) => {
        clearInterval(this.animationControll);
          this.setState({ value: value });
          if (value) {
            this.startAnimation(value);
          }
      }

      fullScreenModeHandler = () => {
          const animatedCanvas = document.getElementById('animationScreen');
          animatedCanvas.requestFullscreen();
      }

     render() {
         return (
             <section className={classes.AnimationPlayerSection}>
                 <div className={classes.AnimationPlayerWrapper}>
                     <canvas
                        id={'animationScreen'} 
                        width={640}
                        height={640}
                        className={classes.AnimationPlayerCanvas}></canvas>
                 </div>
                 <div className={classes.InputRangeWrapper}>
                    <InputRange
                        maxValue={24}
                        minValue={0}
                        value={this.state.value}
                        onChange={(value) => this.rangeControll(value)}
                    />
                </div>
                <button 
                    className={classes.AnimationPlayerFullScreen}
                    onClick={this.fullScreenModeHandler}
                    >FULL SCREEN
                </button>
                <SettingsTools 
                    framesList={this.props.framesList}
                />
             </section>
         );
     };
 };

 export default AnimationPlayer;
