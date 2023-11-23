import React from 'react';
import {ArrowLeft} from 'react-feather';
import {Col} from 'reactstrap';
import {Btn} from '../../AbstractElements';
import {Close} from '../../Constant';
import FilterOptions from '../ShopCanvasFilter/FilterOptions';
import ShopLeftSlider from './ShopLeftSlider';

const SidebarFilter = ({productData, customClass}) => {

    return (
        <Col lg='3' md='12' className={customClass ? customClass : ""}>
            <div className='category-option'>
                <FilterOptions productData={productData}/>
            </div>
        </Col>
    );
};

export default SidebarFilter;
