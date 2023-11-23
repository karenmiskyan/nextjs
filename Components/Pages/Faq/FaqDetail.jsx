import React, {useCallback, useState} from 'react'
import {Col, Container, Row, TabContent, TabPane} from 'reactstrap'
import AnswerSection from './AnswerSection'
import QuestionSection from './QuestionSection'
import {FaqQuestionAnswer} from "../../../Data/FaqData";
import NavSection from "../../Products/Common/NavSection";
import Link from "next/link";
import DescriptionDetails from "../../Products/Common/DescriptionDetails";
import SpecificationDetail from "../../Products/Common/SpecificationDetail";
import SizeGuideDetails from "../../Products/Common/SizeGuideDetails";
import ReviewDetails from "../../Products/Common/ReviewDetails";


const faqs = [
    {
        title: "Account",
        id: 1,
        faqs_value: [
            {
                id: 1,
                title: "Why prices are hidden?",
                answer: () => (
                    <p className="mb-0">KOA EDI is a wholesale distributor in USA. We sell products only to installers
                        and dealers. We are closed to public.</p>)
            },
            {
                id: 2,
                title: "How long does it take for an account approval?",
                answer: () => (
                    <p className="mb-0">Usually account activation takes 2 to 3 business days. Upon account approval you
                        will be notified by email.</p>)
            },
            {
                id: 3,
                title: "Is your online shopping safe to place an order?",
                answer: () => (
                    <p className="mb-0">You can be confident when you place an order. KOA CCTV uses state-of-the-art
                        identity and personal information protection software to ensure that our transaction process is
                        extremely safe and your information secure.</p>)
            },
            {
                id: 4,
                title: "What payment methods do you accept?",
                answer: () => (<p className="mb-0">We accept all major debit and credit cards.</p>)
            },
            {
                id: 5,
                title: "Can I return products I have bought?",
                answer: () => (
                    <p className="mb-0">
                        Yes you can. Items shipped from KOA CCTV can be returned within 30 days of receipt of shipment
                        in most cases. Some products have different policies or requirements associated with them.
                        <Link href="/return-refund/"> See Terms</Link>
                    </p>
                ),
            },
            {
                id: 6,
                title: "Can I get refund?",
                answer: () => (
                    <p className="mb-0">
                        Yes Fully. Our products can be returned within 7 days of the original purchase of the product. A
                        new product may be exchanged for another product or returned for a refund.
                        <Link href="/return-refund/"> See Terms</Link>
                    </p>
                ),
            },
            {
                id: 7,
                title: "Where can I see my orders?",
                answer: () => (
                    <p className="mb-0">
                        After successful login navigate to
                        <Link href="/my-account/"> My Account</Link>. On the left side click on
                        <Link href="/my-account/my-orders"> Orders</Link>
                    </p>
                ),
            },
        ]
    },
    {
        title: "Camera",
        id: 2,
        faqs_value: [
            {
                id: 1,
                title: "How to view my camera using Safari on MAC OS?",
                answer: () => (
                    <p className="mb-0">In order to Live View using Safari on MAC OS, the Hikvision web plug-in for MAC
                        OS needs to be downloaded and installed. Note: Please close all web browsers before installing
                        the web plug-in. Click here to download the MAC web plug-in for IP Cameras.</p>)
            },
            {
                id: 2,
                title: "How to fix Internet Explorer compatibility view issues?",
                answer: () => (
                    <p className="mb-0">When viewing the device using Internet Explorer (IE) 10 or 11 (32-bit),
                        sometimes the content may not display properly. This may be caused by a browser incompatibility.
                        To resolve the incompatibility issue, the IP address of the Hikvision device needs to be added
                        to the compatibility view list.</p>)
            },
            {
                id: 3,
                title: "What ports are needed to be forward for remote access?",
                answer: () => <>
                    <p>By default, the following ports needs to be forwarded for remote access.</p>
                    <table>
                        <tbody>
                        <tr>
                            <td valign="top" width="160">HTTP port: 80</td>
                            <td valign="top">Used to connect via the web browser</td>
                        </tr>
                        <tr>
                            <td valign="top" width="160">Server port: 8000</td>
                            <td valign="top">Used to connect via iVMS-4200 software and iVMS-4500 Mobile
                                App
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" width="160">RTSP port: 10554</td>
                            <td valign="top">Used for the video streaming</td>
                        </tr>
                        <tr>
                            <td valign="top" width="160">HTTPS port: 443</td>
                            <td valign="top">Used to connect via the web browser using SSL encryption</td>
                        </tr>
                        </tbody>
                    </table>


                    <p className="mt-3 mb-0">Note: If the RTSP (Real Time Streaming Protocol) port is defaulted to 554
                        (on
                        older model/firmware)
                        it is recommended to change this port to 10554 or 1024 when experiencing connection issues over
                        3G/4G connection.</p>
                </>
            },
            {
                id: 4,
                title: "How can I find the Hikvision IP devices on the network?",
                answer: () => (<>
                    <p className="mb-0">
                        You can find all your IP devices by using the SADP (Search Active Device Protocol) software.
                    </p><p className="mb-0">
                    Download the SADP tool from here. The SADP tool will search any Hikvision products on the network
                    and displays the information of the devices. This software can also be used to quickly configure the
                    network information of the devices such as assigning a static IP address.

                </p>
                    <p className="fw-bold mb-0">
                        Note that the computer running the SADP software must be on the same network (physical subnet)
                        as the Hikvision device.

                    </p>
                </>)
            },
            {
                id: 5,
                title: "How to assign a static IP address to my Hikvision device?",
                answer: () =>
                    (<>
                        <p className="mb-0">
                            Download the SADP tool from here. The SADP tool will search any Hikvision products on the
                            network and displays the information of the devices. This software can also be used to
                            quickly configure the network information of the devices such as assigning a static IP
                            address.
                        </p>
                        <p className="fw-bold mb-0">
                            Note that the computer running the SADP software must be on the same network (physical
                            subnet) as the Hikvision device.
                        </p>
                    </>)
            }, {
                id: 6,
                title: "How to change the date and time of an IP camera via web browser?",
                answer: () => (<>
                    <p>
                        A: Log into the IP camera using the web browser,
                    </p>
                    <ol className="mb-0">
                        <p>Select CONFIGURATION</p>
                        <p>Select BASIC CONFIGURATION and then select SYSTEM (on left side).</p>
                        <p>Select TIME SETTINGS tab and input the correct date and time</p>
                        <p className="mb-0">Click the SAVE button to apply the settings</p>
                    </ol>
                </>)
            }, {
                id: 7,
                title: "What are the default IP address of the IP cameras?",
                answer: () => (
                    <table border="0" width="80%">
                        <tbody>
                        <tr>
                            <td rowSpan="2" width="38%">IP camera with firmware</td>
                            <td width="34%">v5.2 or prior</td>
                            <td width="28%">v5.3 or later</td>
                        </tr>
                        <tr>
                            <td>192.0.0.64</td>
                            <td>192.168.1.64</td>
                        </tr>
                        </tbody>
                    </table>
                )
            },
            {
                id: 8,
                title: "The \"Communication to Server Failed\" error appears when registering DDNS?",
                answer: () => (
                    <p className="mb-0">The Preferred DNS Server should not be blank and a public DNS server assigned. A
                        public DNS server to input is Googles free DNS Server 75.75.75.75 or 4.2.2.2.</p>)
            },

            {
                id: 9,
                title: "I have installed the SADP tool however I am still unable to detect my device.",
                answer: () => (<>
                    <p>
                        You may need to update the WinPcap utility.
                    </p>
                    <ol>
                        <p>Close the SADP software.</p>
                        <p>Click <a href="https://www.winpcap.org/" target="_blank"
                                    rel="noopener noreferrer">here</a> to download and install the latest WinPcap.</p>
                        <p>Then run the SADP software again.</p>
                    </ol>
                    <p className="mb-0">
                        A: Log into the IP camera using the web browser,
                    </p>
                </>)
            },
            {
                id: 10,
                title: "Internet Explorer keeps prompting to download the web plugin",
                answer: () => (<>
                    <p className="mb-0">
                        This is caused by Internet Explorer compatibility issues. If you are using IE 10 or 11, the page
                        needs to be displayed using Compatibility view. To resolve this issue, the compatibility view
                        mode needs to be turned on by adding the IP address of the Hikvision device to the compatibility
                        view list.
                    </p>
                    <p className="mb-0"> For more detailed information on how to add the device to enable the
                        compatibility view click here.

                    </p>
                </>)
            },
            {
                id: 11,
                title: "Where are the files saved to when downloading via the web browser?",
                answer: () => (<>
                    <p>
                        Log into the device using the web browser,
                    </p>
                    <ol>
                        <p>Click on Configuration and then Local configuration / Local (dependent of the version of the
                            web plug-in).</p>
                        <p>On the right panel, you should see the default paths for the saved files.</p>
                    </ol>
                </>)
            },


        ]
    }
]
const FaqDetail = () => {
    const [active, setActive] = useState(1);
    const handleClick = useCallback((value) => {
        setActive(value.id);
    }, []);
    return (
        <section className="faq-details section-b-space" style={{backgroundColor: 'white'}}>
            <Container>
                <Row className="g-4">
                    <Col lg="12" xs="12">
                        <h1 style={{fontSize: "calc(22px + 6 * (100vw - 320px) / 1600)"}}>FAQ</h1>
                    </Col>
                    <Col lg="12" xs="12" className="cloth-review">
                        <NavSection active={active} handleClick={handleClick} array={faqs}/>
                    </Col>
                    <QuestionSection arr={faqs.find(el => el.id === active)}/>
                    <AnswerSection arr={faqs.find(el => el.id === active)}/>
                </Row>
            </Container>
        </section>
    )
}

export default FaqDetail