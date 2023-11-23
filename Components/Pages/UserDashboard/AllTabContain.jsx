import React, {useEffect, useState} from 'react';
import {Col, TabContent, TabPane} from 'reactstrap';
import DashBoardContain from './DashBoardContain';
import MobileViewBtn from './MobileViewBtn';
import OrderContain from './OrderContain';
import PaymentContain from './PaymentContain';
import ProfileContain from './ProfileContain';
import SaveAddress from './SaveAddress';
import SecurityContain from './SecurityContain';
import WishListContain from './WishListContain';
import {useSelector} from "react-redux";
import {selectAuthUser} from "../../../ReduxToolkit/Slices/LoginSlice";

const AllTabContain = ({activeTab, isLoaded, loadError}) => {

    const userInfo = useSelector(selectAuthUser);
    const [user, setUser] = useState({});
    const [address, setAddress] = useState({});
    const [address2, setAddress2] = useState({});
    useEffect(() => {
        if (userInfo) {
            setUser(userInfo?.data)
            setAddress(userInfo?.data?.addresses[0])
            setAddress2(userInfo?.data?.addresses[1])
        }
    }, [userInfo]);
    return (
        <Col lg='9'>
            {/*<MobileViewBtn/>*/}
            <TabContent activeTab={activeTab}>
                <TabPane className={`${activeTab === 1 ? 'show active ' : ''}dashboard-profile dashboard`} tabId={1}>
                    <ProfileContain user={user}/>
                </TabPane>
                <TabPane className={`${activeTab === 2 ? 'show active ' : ''}`} tabId={2}>
                    <DashBoardContain address={address} address2={address2} loadError={loadError} isLoaded={isLoaded}/>
                </TabPane>
                <TabPane className={`${activeTab === 3 ? 'show active ' : ''}dashboard-profile dashboard`} tabId={3}>
                    <SecurityContain/>
                </TabPane>

                {/*<TabPane className={`${activeTab === 2 ? 'show active ' : ''}table-dashboard dashboard wish-list-section`} tabId={2}>*/}
                {/*  <OrderContain />*/}
                {/*</TabPane>*/}

                {/*<TabPane className={`${activeTab === 3 ? 'show active ' : ''}table-dashboard dashboard wish-list-section`} tabId={3}>*/}
                {/*  <WishListContain />*/}
                {/*</TabPane>*/}

                {/*<TabPane className={`${activeTab === 4 ? 'show active ' : ''}dashboard`} tabId={4}>*/}
                {/*  <SaveAddress />*/}
                {/*</TabPane>*/}

                {/*<TabPane className={`${activeTab === 5 ? 'show active ' : ''}dashboard`} tabId={5}>*/}
                {/*  <PaymentContain />*/}
                {/*</TabPane>*/}


            </TabContent>
        </Col>
    );
};

export default AllTabContain;
