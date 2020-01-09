import React, { Component } from 'react';
import classes from './Frames.module.scss';

import { getEmptyImageCanvas } from '../../helpers';
import Frame from './Frame/Frame';

class Frames extends Component {
    componentDidUpdate(prevProps) {
        const { activeFrame, framesList } = this.props;
        if (activeFrame !== prevProps.activeFrame || framesList.length !== prevProps.framesList.length) {
            const canvas = document.getElementById('canvas');
            if (framesList[activeFrame].imageData) {
                const activeImageData = framesList[activeFrame].imageData;
                canvas.getContext('2d').putImageData(activeImageData, 0, 0);
            } else {
                const ctx =  canvas.getContext('2d');
                ctx.fillStyle = 'gray';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }
    }

    addNewFrameHandler() {
        const { framesList, changeState } = this.props;
        const imageData = getEmptyImageCanvas();
        framesList.push({ imageData });
        const newActiveFrame = framesList.length - 1;
        const mainCanvas = document.getElementById('canvas');
        const mainCtx = mainCanvas.getContext('2d');
        mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        changeState('activeFrame', newActiveFrame);
        changeState('framesList', framesList); 
    }

    deleteFrameHandler(e) {
        e.stopPropagation();
        const { framesList, activeFrame, changeState } = this.props;
        const newFrameList = [...framesList];
        const frameIndex = Number(e.currentTarget.parentNode.id);
        const newActiveFrame = activeFrame ? activeFrame - 1 : 0;
        changeState('activeFrame', newActiveFrame);
        newFrameList.splice(Number(frameIndex), 1);
        changeState('framesList', newFrameList);
    }

    cloneNodeHandler(e) {
        e.stopPropagation();
        const { framesList, activeFrame, changeState } = this.props;
        const newFrameList = [...framesList];
        const currentNode = e.currentTarget.parentNode;
        const currentCtx = currentNode.childNodes[1].getContext('2d');
        const currentNodeImage = currentCtx.getImageData(0, 0, currentNode.childNodes[1].width, currentNode.childNodes[1].height);
        newFrameList.splice(Number(currentNode.id) + 1, 0, { imageData: currentNodeImage });
        changeState('framesList', newFrameList);
        changeState('activeFrame', Number(currentNode.id) + 1);
    }

    changeActiveFrameHandler(e) {
        const { changeState } = this.props;
        const newActiveFrame = e.currentTarget.childNodes[1];
        const newImageData = newActiveFrame.getContext('2d').getImageData(0, 0, newActiveFrame.width, newActiveFrame.height);
        const canvas = document.getElementById('canvas');
        canvas.getContext('2d').putImageData(newImageData, 0, 0);
        changeState('activeFrame', Number(e.currentTarget.id));
    }

    render() {
        const { framesList } = this.props;
        return (
            <>
                <section className={classes.FramesSection}>
                    {framesList.map((frame, index) => {
                        return (
                            <Frame
                                id={index}
                                imageData={frame.imageData}
                                key={index}
                                frameIndex={index}
                                framesList={framesList}
                                deleteFrame={this.deleteFrameHandler.bind(this)}
                                cloneNode={this.cloneNodeHandler.bind(this)}
                                activeFrame={this.props.activeFrame}
                                changeActiveFrameHandler={this.changeActiveFrameHandler.bind(this)}
                                changeState={this.props.changeState}
                                changeFrames={this.props.changeFrames}
                            />
                        );
                    })}
                    <button 
                        className={classes.AddNewFrameBtn}
                        onClick={this.addNewFrameHandler.bind(this)}
                    >ADD NEW FRAME
                    </button>
                </section>
            </>

        );
    };
};

export default Frames;

