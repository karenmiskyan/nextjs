import React, {useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from 'reactstrap';
import TopHeaderCurrency from './TopHeaderCurrency';
import TopLanguage from './TopLanguage';
import {mobileno} from "../../Components/Constant";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectAuth, selectAuthUser} from "../../ReduxToolkit/Slices/LoginSlice";
import {BsFillTelephoneFill} from "react-icons/bs";
import {persistor} from "../../ReduxToolkit/store";
import {PersistGate} from "redux-persist/integration/react";

const TopHeaderBar2 = ({UpScroll}) => {
    const [isOpen, setIsOpen] = useState(false);
    const userAuth = useSelector(selectAuthUser);
    const auth = useSelector(selectAuth);
    return (
        <div className={`top-header top-header-black ${UpScroll ? "upScroll": ""}`} style={{backgroundColor:"white"}}>
            <div className='container-fluid-lg'>
                <Row>
                    <div className='col-auto d-sm-block '>
                        <ul className='border-list text-white'>
                            <li><Link href="/about" style={{color:"black"}}>About us</Link></li>
                            <li> <Link href="/blog" style={{color:"black"}}>Blog</Link></li>
                            <li> <Link href="/event" style={{color:"black"}}>Events</Link></li>
                        </ul>
                    </div>

                    <div className='col-auto text-white d-flex'>
                        {/*<ul className='border-list p-0'>*/}
                        {/*<li>*/}
                        {/*  <Dropdown className='top-header-dropdown' isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>*/}
                        {/*    <DropdownToggle>*/}
                        {/*      <span>Login & Register</span>*/}
                        {/*      <i className='fas fa-chevron-down'></i>*/}
                        {/*    </DropdownToggle>*/}
                        {/*    <DropdownMenu>*/}
                        {/*      <DropdownItem>Log In</DropdownItem>*/}
                        {/*      <DropdownItem>Register</DropdownItem>*/}
                        {/*    </DropdownMenu>*/}
                        {/*  </Dropdown>*/}
                        {/*</li>*/}
                        {/*<TopHeaderCurrency />*/}
                        {/*<TopLanguage />*/}
                        {/*</ul>*/}
                       <div > <BsFillTelephoneFill style={{color:"black"}}/> <a href={`tel:${mobileno}`} style={{color:"black",fontSize:"14px"}} >{mobileno}</a></div>
                        <PersistGate loading={null} persistor={persistor}>
                        {
                            auth ?  <ul className='border-list text-white' style={{marginLeft:"20px",padding:"0"}}>
                                <li><Link href="/become-a-customer" style={{color:"black",fontWeight:"500"}}>Become a Customer</Link></li>
                            </ul> : <ul className='border-list text-white' style={{marginLeft:"20px",padding:"0"}}>
                                <li><p style={{color:"black",fontWeight:"500", marginBottom:"0"}}>Welcome {userAuth?.data?.addresses[0]?.name}</p></li>
                            </ul>
                        }
                        </PersistGate>
                    </div>

                </Row>
            </div>
        </div>
    );
};
export default TopHeaderBar2;
