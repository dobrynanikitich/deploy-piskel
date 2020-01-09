import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import classes from './Frame.module.scss';

class Frame extends Component {
    canvasFrame = React.createRef();
    componentDidMount() {
        if (this.props.imageData) {
            this.canvasFrame.current.getContext('2d').putImageData(this.props.imageData, 0, 0);
        }
    }

    componentDidUpdate() {
        if (this.props.imageData) {
            this.canvasFrame.current.getContext('2d').putImageData(this.props.imageData, 0, 0);
        }
    }

    dragStartHandle = (e) => {
        e.dataTransfer.setData('id', this.props.id);
    }

    dragOverHandle = (e) => {
        e.preventDefault();
    }

    dropHandle = (e) => {
        this.props.changeFrames(this.props.id, e.dataTransfer.getData('id'))
    }

    render() {
        const { frameIndex, framesList, deleteFrame, id, activeFrame, changeActiveFrameHandler, cloneNode } = this.props;
        return (
            <div 
                className={classnames(classes.FrameWrapper, { [classes.ActiveFrame]: activeFrame === id })}
                id={id} 
                onClick={changeActiveFrameHandler}
                draggable
                onDragStart={this.dragStartHandle}
                onDragOver={this.dragOverHandle}
                onDrop={this.dropHandle}
                >
                <div className={classes.FrameNumber}>{frameIndex + 1}</div>
                <canvas 
                    width={'640'}
                    height={'640'}
                    id={activeFrame === id ? 'activeFrame' : ''} 
                    className={classes.Frame}
                    ref={this.canvasFrame}
                >
                </canvas>
                <button 
                    disabled={frameIndex===0 && framesList.length === 1}
                    className={classnames(classes.FrameDeleteBtn, { [`${classes.FrameBtnDidabled}`]: frameIndex===0 && framesList.length === 1 })}
                    onClick={deleteFrame}
                    >
                    <FontAwesomeIcon icon={'trash'} />
                </button>
                <button 
                    className={classes.FrameCloneBtn}
                    onClick={cloneNode}
                >
                    <FontAwesomeIcon icon={'clone'} />
                </button>
            </div>
        );
    };
}

export default Frame;
