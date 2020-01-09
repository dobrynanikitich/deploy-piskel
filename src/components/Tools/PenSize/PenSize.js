import React from 'react';
import classnames from 'classnames';

import classes from './PenSize.module.scss';

const PenSize = ({ activeId, changePencilSizeHandler }) => {

    const penSizeList = [
        { 
            id: 'firstSize',
            tooltip: '1x',
        },
        { 
            id: 'secondSize',
            tooltip: '2x',
        },
        { 
            id: 'thirdSize',
            tooltip: '3x',
        },
        { 
            id: 'forthSize',
            tooltip: '4x', 
        },
    ];

    return (
        <>
            <div className={classes.PenSizeMenu}>
                {penSizeList.map(({ id, tooltip }) => (
                    <div
                        key={id}
                        id={id}
                        data-tip={tooltip}
                        className={classnames(classes.PenSize, { [`${classes.PenSizeActive}`]: activeId === id })}
                        onClick={changePencilSizeHandler}>
                        <div className={classes[id]}></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PenSize;