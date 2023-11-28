import React, {useState} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import TabpanSection from '../../FurnitureDemo/FurnitureTabSection/TabpanSection';

const TabNavBar = ({TabFilter, defImg}) => {
    const [activeTab, setActiveTab] = useState(0);
    const [num, setNum] = useState(0);
    const [val, setVal] = useState(TabFilter.filter(el => el.parent_id === 0).sort(function (a, b) {
        return a.order - b.order
    })[0]?.name);
    const TabMiddleColor = 'offer-end';
    const LeftRightTab = 'product-box';
    const toggle = (tab, elem) => {

        if (activeTab !== tab) {
            setActiveTab(tab);
        } else if (tab === activeTab) {
            setActiveTab(tab)
        } else {
            setActiveTab(3);
        }
        setNum(tab);
        setVal(elem.name);
    };

    return (
        <>
            <Nav className='nav-tabs' id='myTab'>
                {TabFilter?.filter(el => el.parent_id === 0)
                    .sort(function (a, b) {
                        return a.order - b.order
                    })?.map((el, i) => {
                        return (
                            <NavItem key={i}>
                                <NavLink className={`${activeTab === i ? 'active show' : ''}`}
                                         onClick={() => toggle(i, el)}>
                                    {el?.name}
                                </NavLink>
                            </NavItem>
                        );
                    })}
            </Nav>
            <TabpanSection activeTab={activeTab} TabFilter={TabFilter} num={num} val={val}
                           TabMiddleColor={TabMiddleColor} LeftRightTab={LeftRightTab} defImg={defImg}/>
        </>
    );
};

export default TabNavBar;
