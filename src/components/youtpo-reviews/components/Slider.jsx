import React from 'react';
import * as Style from './slider.module.scss';

const Slider = ({ width }) => {
    return <div className={Style.slider}>
        <div className={Style.content} style={{ width: width + '%' }}></div>
    </div>;
};

export default Slider;
