import React, {useCallback, useState} from 'react';
import {Col, TabContent, TabPane} from 'reactstrap';
import DescriptionDetails from './DescriptionDetails';
import NavSection from './NavSection';

import ReviewDetails from './ReviewDetails';
import SizeGuideDetails from './SizeGuideDetails';
import SpecificationDetail from './SpecificationDetail';

const DetainTabSection = ({singleProduct}) => {
    const [active, setActive] = useState(1);
    const handleClick = useCallback((value) => {
        setActive(value.id);
    }, []);


    return (
        <Col xs='12'>
            <div className='cloth-review'>
                <NavSection active={active} handleClick={handleClick} array={[
                    {
                        id: 1,
                        title: 'Overview',
                    },
                    {
                        id: 2,
                        title: 'Specifications',
                    },
                    singleProduct?.downloads?.filter(el => el.url !== '' && el.url !== null).length > 0 && {
                        id: 3,
                        title: 'Downloads',
                    },
                    {
                        id: 4,
                        title: 'Rating',
                    },
                ]}/>

                <TabContent activeTab={active} id='nav-tabContent'>
                    <TabPane className={`fade ${active === 1 ? 'show active' : ''}`} id='desc'>
                        <DescriptionDetails description={singleProduct?.description}/>
                    </TabPane>

                    <TabPane className={`fade ${active === 2 ? 'show active' : ''}`} id='specification'>
                        <SpecificationDetail specification={singleProduct?.content}/>
                    </TabPane>

                    <TabPane className={`fade overflow-auto ${active === 3 ? 'show active' : ''}`}
                             id='nav-guide'>
                        <SizeGuideDetails downloads={singleProduct?.downloads}/>
                    </TabPane>
                    <TabPane className={`fade ${active === 4 ? 'show active' : ''}`} id='review'>
                        <ReviewDetails/>
                    </TabPane>
                    {/*<TabPane className={`fade ${active === 5 ? 'show active' : ''}`} id='question'>*/}
                    {/*    <QA_Details/>*/}
                    {/*</TabPane>*/}


                </TabContent>
            </div>
        </Col>
    );
};

export default DetainTabSection;
