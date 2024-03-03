import React from 'react';
import * as Style from './product-controls.module.scss';
import { ChevronUp, ShareIconQuarter } from '../../../assets/components/icons/Icons';

const ProductControls = () => {
    return <div className={Style.controls}>
        <div className={Style.control_item}>
            <ShareIconQuarter />
        </div>
        <div className={Style.control_item}>
            <ChevronUp color='#41464B' width={16} height={8} />
        </div>
    </div>
}

export default ProductControls