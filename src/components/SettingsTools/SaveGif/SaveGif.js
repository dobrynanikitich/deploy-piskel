import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './SaveGif.module.scss';

const SaveGif = ({ saveGifHandler }) => (
    <button 
        className={classes.SaveGifBtn}
        onClick={saveGifHandler}
        data-tip='save frames as gif'
        >
        <FontAwesomeIcon icon={'save'}/>
    </button>
);

export default SaveGif;