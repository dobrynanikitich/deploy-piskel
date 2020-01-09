import React, { Component } from 'react';

import SaveGif from './SaveGif/SaveGif';
import SavePng from './SavePng/SavePng';
import GIF from 'gif.js';
import downloadjs from 'downloadjs';

import classes from './SettingsTools.module.scss';

class SettingsTools extends Component {

    saveGifHandler = () => {
        const { framesList } = this.props;
        let gif = new GIF({
            workers: 2,
            quality: 10,
            workerScript: './gif.worker.js',
        });
        framesList.forEach(frame => {
            gif.addFrame(frame.imageData);
        });
        gif.on('finished', function(blob) {
            downloadjs(blob, 'exportedGif.gif', 'image/gif');
        });
        gif.render();
    }

    savePngHandler = () => {
        const canvas = document.getElementById('canvas');
        canvas.toBlob(function(blob) {
            downloadjs(blob, "canvasImage.png");
        });
    }

    render() {
        return (
            <div>
                <SaveGif 
                   saveGifHandler={this.saveGifHandler} 
                />
                <SavePng
                    savePngHandler={this.savePngHandler}
                />
            </div>
        );
    };
}

export default SettingsTools;