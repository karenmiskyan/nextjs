import React from 'react';
import {Nav} from 'reactstrap';
import {ProductDetailNav} from '../../../Data/ProductDetailsData';
import {Btn} from '../../AbstractElements';

const NavSection = ({handleClick, active, array}) => {
    return (
        <Nav>
            <div className='nav nav-tabs' role='tablist'>
                <div style={{display: "flex", backgroundColor: '#EFF2F7', borderRadius: "10px"}}>
                    {array?.map((elem, i) => {
                        if (elem !== false) {
                            return (
                                <Btn attrBtn={{
                                    className: `nav-link${active === elem.id ? ' active' : ''}`,
                                    onClick: () => {
                                        handleClick(elem);
                                    }
                                }} key={i}>
                                    {elem.title}
                                </Btn>
                            );
                        }
                    })}
                </div>
            </div>
        </Nav>
    );
};

export default NavSection;
