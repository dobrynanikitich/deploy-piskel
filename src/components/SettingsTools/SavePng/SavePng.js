import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './SavePng.module.scss';

const SavePng = ({ savePngHandler }) => (
    <button 
        className={classes.SavePngBtn}
        onClick={savePngHandler}
        data-tip='save frames as png'
        >
        <FontAwesomeIcon icon={'image'}/>
    </button>
);

export default SavePng;