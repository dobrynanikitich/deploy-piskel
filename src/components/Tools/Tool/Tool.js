import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Tool.module.scss';

const Tool = ({ active, icon, setActiveTool, id, tooltip }) => {
    return (
        <div
            className={classnames(classes.Tool, { [`${classes.ToolActive}`]: active })}
            id={id}
            onClick={setActiveTool}
            data-tip={tooltip}
        >
            <FontAwesomeIcon icon={icon} size="2x"/>
        </div>
    );
}

export default Tool;
