import React, {Fragment} from 'react';
import {Row, TabContent, TabPane} from 'reactstrap';
import LeftTab from './LeftTab';
import MiddleTab from './MiddleTab';
import RightTab from './RightTab';

const TabpanSection = ({activeTab, TabFilter, num, val, TabMiddleColor, LeftRightTab, defImg}) => {

    const isProductNew = (creationDateStr) => {
        const currentDate = new Date();
        const creationDate = new Date(creationDateStr);

        const twoMonthsInMilliseconds = 2 * 30 * 24 * 60 * 60 * 1000;  // Assuming an average of 30 days in a month

        return currentDate - creationDate <= twoMonthsInMilliseconds;
    }

    return (
        <TabContent activeTab={activeTab}>
            <Fragment>
                {TabFilter?.filter(el => el.parent_id === 0).map((item, id) => {

                    let a = [...item?.products].sort(function (a, b) {
                        return a.order - b.order
                    })?.slice(0, 3);
                    let b = [...item?.products].sort(function (a, b) {
                        return a.order - b.order
                    })?.slice(3, 4);
                    let c = [...item?.products].sort(function (a, b) {
                        return a.order - b.order
                    })?.slice(4, 7);
                    return (
                        <Fragment key={id}>
                            {item?.name === val && (
                                <TabPane tabId={num}
                                         className={`${activeTab && activeTab === id ? 'active show' : ''}`}
                                         key={id}>
                                    <div className='offer-wrap product-style-1'>
                                        <Row className='g-xl-4 g-3'>
                                            <Fragment>
                                                <LeftTab elem={a} LeftRightTab={LeftRightTab} defImg={defImg} isProductNew={isProductNew}/>
                                                {
                                                    b.length !== 0 &&
                                                    <MiddleTab elem={b[0]} TabMiddleColor={TabMiddleColor} isProductNew={isProductNew}
                                                               LeftRightTab={LeftRightTab} defImg={defImg}/>
                                                }
                                                <RightTab elem={c} LeftRightTab={LeftRightTab} defImg={defImg} isProductNew={isProductNew}/>
                                            </Fragment>

                                        </Row>
                                    </div>
                                </TabPane>
                            )}
                        </Fragment>
                    );
                })}
            </Fragment>
        </TabContent>
    );
};

export default TabpanSection;
