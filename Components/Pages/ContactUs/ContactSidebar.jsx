import React, {useState} from 'react';
import {MapPin, Phone} from 'react-feather';
import {Col, Container, Modal, ModalBody, Row} from 'reactstrap';
import {SlClock} from "react-icons/sl";
import {TbClockPlus} from "react-icons/tb";
import {BsFillTelephoneInboundFill} from "react-icons/bs";
import {FiPhoneIncoming} from "react-icons/fi";
import {Btn} from "../../AbstractElements";
import {OrderSuccessSvg} from "../../../Data/SVG";

const ContactSidebar = ({locations, onLocationClick}) => {
    const [show, setShow] = useState(false);
    const [item, setItem] = useState(locations[0]);
    const today = new Date().toLocaleDateString('en-US', {weekday: 'long'});

    return (
        <section className="contact-section" style={{backgroundColor: "#eff2f7"}} >
            <div id="location" style={{position:"absolute", top:"-20%"}}/>
            <Container>
                <Row className="g-4">
                    <Col lg='12'>
                        <Row className='contact-details'>
                            <div>
                                {/*<h2>{LetTouch}</h2>*/}
                                {/*<h5 className='font-light'>{SuggestionDes}</h5>*/}
                                <Row style={{gap:"50px 0"}}>
                                    {
                                        locations.map((el, i) => {
                                            const todayHours = el.workingHours[today];


                                            return (
                                                <Col lg='4' className="contact-address" key={i}>
                                                    <h4 style={{cursor: "pointer", maxWidth: "fit-content"}}
                                                        onClick={() => onLocationClick(el.lat, el.lng)}> {el.name}</h4>

                                                    <div className='contact-box'>
                                                        <div style={{cursor: "pointer"}} className='contact-icon'
                                                             onClick={() => onLocationClick(el.lat, el.lng)}>
                                                            <MapPin/>
                                                        </div>

                                                        <div className='contact-title'>
                                                            <p>{el.desc1}</p>
                                                            <p>{el.desc2}</p>
                                                        </div>
                                                    </div>

                                                    <div className='contact-box'>
                                                        <a href={`tel:${el.phone}`} style={{color: "black"}}>
                                                            <div className='contact-icon'>
                                                                <FiPhoneIncoming/>
                                                            </div>
                                                        </a>
                                                        <div className='contact-title'>
                                                            {/*<h4>{PhoneNumber}</h4>*/}
                                                            <a href={`tel:${el.phone}`} style={{color: "black"}}>
                                                                <p>{el.phone}</p></a>
                                                        </div>
                                                    </div>
                                                    <div className='contact-box'>
                                                        <a style={todayHours ? {
                                                            color: "black",
                                                            cursor: "pointer"
                                                        } : {color: "black"}}
                                                           onClick={() => {
                                                               if (todayHours) {
                                                                   setItem(el);
                                                                   setShow(true);
                                                               }
                                                           }}>
                                                            <div className='contact-icon'>
                                                                <TbClockPlus style={{color: "var(--theme-color)"}}/>
                                                            </div>
                                                        </a>
                                                        <div className='contact-title'>
                                                            {/*<h4>{PhoneNumber}</h4>*/}

                                                            <a onClick={() => {
                                                                if (todayHours) {
                                                                    setItem(el);
                                                                    setShow(true);
                                                                }
                                                            }} style={todayHours ? {
                                                                color: "black",
                                                                cursor: "pointer"
                                                            } : {color: "black"}}>
                                                                <p>{todayHours ? `${today}: ${todayHours}` : el.workingHours.title}</p>
                                                            </a>
                                                            {el?.textPickUp && el.textPickUp()}
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                                <Modal scrollable={true}
                                       zIndex={1400}
                                       size='sm'
                                       toggle={() => {
                                           setShow(!show);
                                       }}
                                       isOpen={show}>
                                    <ModalBody>
                                        <Btn
                                            style={{
                                                background: "none",
                                                fontSize: "18px",
                                                position: "absolute",
                                                overflow: "visible",
                                                top: "12px",
                                                right: "18px"
                                            }}
                                            attrBtn={{
                                                type: 'button',
                                                className: 'btn-close d-block p-0 ',
                                                onClick: () => {
                                                    setShow(false);
                                                },
                                            }}>
                                            <i className='fas fa-times'
                                               style={{color: "var(--theme-color)"}}></i>
                                        </Btn>
                                        <Row className="modal-success g-3 pt-3">
                                            <Col lg="12">
                                                <h5 style={{fontWeight: "500"}}>{item?.name}</h5>
                                            </Col>
                                            <Col lg="12">

                                                <p className="position-relative">Sunday: <span
                                                    className="fw-bold position-absolute"
                                                    style={{right: "0"}}>{item?.workingHours?.Sunday}</span></p>
                                                <p className="position-relative">Monday: <span
                                                    className="fw-bold position-absolute"
                                                    style={{right: "0"}}>{item?.workingHours?.Monday}</span></p>
                                                <p className="position-relative">Tuesday: <span
                                                    className="fw-bold position-absolute"
                                                    style={{right: "0"}}>{item?.workingHours?.Tuesday}</span></p>
                                                <p className="position-relative">Wednesday: <span
                                                    className="fw-bold position-absolute"
                                                    style={{right: "0"}}>{item?.workingHours?.Wednesday}</span></p>
                                                <p className="position-relative">Thursday: <span
                                                    className="fw-bold position-absolute"
                                                    style={{right: "0"}}>{item?.workingHours?.Thursday}</span></p>
                                                <p className="position-relative">Friday: <span
                                                    className="fw-bold position-absolute"
                                                    style={{right: "0"}}>{item?.workingHours?.Friday}</span></p>
                                                <p className="position-relative">Saturday: <span
                                                    className="fw-bold position-absolute"
                                                    style={{right: "0"}}>{item?.workingHours?.Saturday}</span></p>
                                            </Col>
                                        </Row>
                                    </ModalBody>
                                </Modal>

                                {/*<div className='contact-box'>*/}
                                {/*  <div className='contact-icon'>*/}
                                {/*    <Mail />*/}
                                {/*  </div>*/}
                                {/*  <div className='contact-title'>*/}
                                {/*    <h4>{EmailAddress} :</h4>*/}
                                {/*    <p>{ThemeEmail}</p>*/}
                                {/*    <p>{ThemeEmail2}</p>*/}
                                {/*  </div>*/}
                                {/*</div>*/}
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ContactSidebar;
