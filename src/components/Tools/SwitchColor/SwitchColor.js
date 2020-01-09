import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './SwitchColor.module.scss';

class SwitchColor extends Component {
    firstColor = React.createRef();
    secondColor= React.createRef();
    componentDidMount() {
        this.firstColor.current.style.backgroundColor = '#000000';
        this.secondColor.current.style.backgroundColor = '#ffffff';
    }

    rgbToHex = (r, g, b) => {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      }

    changeCurrentColor = (e) => {
        this.props.changeState('currentColor', e.target.value);
        e.target.parentNode.style.backgroundColor = e.target.value;
    }

    changeSecondColor = (e) => {
        e.target.parentNode.style.backgroundColor = e.target.value;
    }

    switchColors = () => {
        const mainColor = this.firstColor.current;
        const secondColor = this.secondColor.current;
        const colorFirst = mainColor.style.backgroundColor;
        const colorSecond = secondColor.style.backgroundColor;
        const colorInRgb = colorSecond.slice(4, -1).split(',');
        const colorInHex = this.rgbToHex(Number(colorInRgb[0]), Number(colorInRgb[1]), Number(colorInRgb[2]));
        mainColor.style.backgroundColor = colorInHex;
        secondColor.style.backgroundColor = colorFirst;

        this.props.changeState('currentColor', mainColor.style.backgroundColor);
    }

    render() {
        return (
            <>
                <div className={classes.SwitchColorBlock}>
                    <label id='firstColor' className={classes.CurrentColor} ref={this.firstColor}>
                        <input type='color' value='#808080' id='mainColor' onChange={(e) => this.changeCurrentColor(e)}/>
                    </label>
                    <label id='secondColor' className={classes.PrevColor} ref={this.secondColor}>
                        <input type='color' value='#808080' id='secondColor' onChange={(e) => this.changeCurrentColor(e)}/>
                    </label>
                </div>
                <div className={classes.SwitchColorsBtn} data-tip='Press to switch colors'>
                    <FontAwesomeIcon icon='exchange-alt' size="2x" onClick={this.switchColors}/>
                </div>
            </>
        );
    }
}

export default SwitchColor;

