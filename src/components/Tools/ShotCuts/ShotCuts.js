import React from 'react';

import classes from './ShotCuts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShotCuts = () => (
    <div className={classes.ShotCutsBlock}>
        <FontAwesomeIcon icon={'keyboard'} size='3x'/>
    </div>
);

export default ShotCuts;