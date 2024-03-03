import React from 'react'
import * as Style from './divider.module.scss';

const Divider = ({ styleClass }) => {
    return <div className={`${Style.divider} ${styleClass}`}></div>
}

export default Divider