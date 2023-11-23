import React from 'react';
import {Col, Container, Row} from "reactstrap";
import LeftSide from "../Pages/BecomeCustomer/LeftSide";
import RightSide from "../Pages/BecomeCustomer/rightSide";
import Link from "next/link";
import {CommonPath} from "../Constant";
import {selectAuth, toggleDivVisibility} from "../../ReduxToolkit/Slices/LoginSlice";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {persistor} from "../../ReduxToolkit/store";
import {PersistGate} from "redux-persist/integration/react";

const AboutUs = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const toLogin = () => {
        if (window.innerWidth <= 575) {
            router.push("/my-account/")

        } else {
            dispatch(toggleDivVisibility(true))
        }
    }
    return (
        <>

            <section
                // className='breadcrumb-section section-b-space'
                className="section-b-space" style={{padding: "0"}}>
                <div className="ratio ratio-16x9"
                     style={{height: "calc(200px + (300 - 80) * ((100vw - 320px) / (1920 - 320)))"}}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/ZL0CYaM9nSU"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>
                </div>
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="our-mission">
                                <h1 className="text-center" style={{fontSize:"calc(22px + 6 * (100vw - 320px) / 1600)"}}>OUR MISSION</h1>
                                <p style={{textAlign: "center"}}>Our mission is to distribute the best products, the
                                    best service, and build the best
                                    relationships with our clients. We want to show our clients that there are companies
                                    that are genuine and authentic.</p>
                                <PersistGate loading={null} persistor={persistor}>
                                    {
                                        auth &&
                                        <Row className="g-3 justify-content-center">
                                            <Col lg="3">
                                                <div className='product-buttons' style={{marginBottom: "0"}}>
                                                    {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                                                    <button onClick={toLogin}
                                                            className='btn btn-solid btn-transparent hover-solid btn-animation'>
                                                        {/*<i className='fa fa-shopping-cart'></i>*/}
                                                        <span>Sign In</span>
                                                    </button>
                                                </div>
                                            </Col>
                                            <Col lg="3">
                                                <div className='product-buttons' style={{marginBottom: "0"}}>
                                                    {/*<ProductWishListAction singleProduct={singleProduct} />*/}
                                                    <Link href={`/become-a-customer`} id='cartEffect'
                                                          className='btn btn-solid hover-solid btn-animation'>
                                                        {/*<i className='fa fa-shopping-cart'></i>*/}
                                                        <span>Become a Customer</span>
                                                    </Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    }
                                </PersistGate>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section>
            <section style={{backgroundColor: "white"}}>
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="our-mission">
                                <h2>OUR BELIEFS AND PRACTICES</h2>
                                <p>KOA E.D.I. is raising the bar for customer satisfaction and product distribution in
                                    both audio-video & home innovation industries. We care about experience.</p>

                                <p>Being a distributor based in Los Angeles, California our role is to partner with
                                    other companies and supply them with products to further boost and help grow
                                    business. But our goals are not limited to providing hundreds of the best audio and
                                    video brands worldwide. Our goal is much deeper than what is tangible, our goal is
                                    to provide excellent products at a decent price accompanied by an exceptional
                                    experience when doing business with us.</p>

                                <p> We want to leave a positive mark on your experience with us and we believe the best
                                    way to achieve that is through excellent service and support. As a company, we are
                                    dedicated to cultivating the best wholesale shopping experience other businesses can
                                    have.</p>

                                <p>From one business to another, we can relate to your concerns and issues. We have
                                    over 15 years of experience distributing to businesses. In that experience, we found
                                    that businesses look for cost, quality, and service. With that, we have prioritized
                                    your concerns as our concerns. We as a company work diligently to reflect our
                                    beliefs in our business with you.</p>

                                <p> We offer a diverse collection of your favorite names in the industry that have been
                                    hand-picked based on trust and quality. Our selection of products has proven
                                    profitability and inspired our clientele to higher levels of competitiveness. To
                                    best accommodate you and your business we offer shipping anywhere in the United
                                    States, Canada, and South America. We have several locations spanning across
                                    southern California and another location in Nevada. We are excited to introduce
                                    ourselves to you as KOA E.D.I.</p>

                                <p> We will continue to prove that the experience we provide is unique, innovative, and
                                    genuine. We work not only for your business, but we work to build a connection with
                                    you.</p>
                            </div>
                        </Col>
                        <Col lg="12">
                            <Row style={{justifyContent: "center", gridGap: "20px 0", paddingBottom: "60px"}}>
                                {/*<Col lg="4">*/}
                                {/*    <div className="our-shops">*/}
                                {/*        <img src={`${CommonPath}/fashion/1.jpg`}*/}
                                {/*             className='img-fluid bg-img' alt='fashion'/>*/}
                                {/*        <div className="our-shops-single">*/}
                                {/*            <h3>KOA North Hollywood</h3>*/}
                                {/*            <p>7306 Coldwater Canyon Ave Unit 1 North Hollywood CA 91605</p>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</Col>*/}
                                <Col lg="4">
                                    <div className="our-shops">
                                        <img src={`${CommonPath}/fashion/1.jpg`}
                                             className='img-fluid bg-img' alt='fashion'/>
                                        <div className="our-shops-single">
                                            <h3>HEADQUARTERS</h3>
                                            <p>13704 Saticoy st Panorama City CA 91402</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    <div className="our-shops">
                                        <img src={`${CommonPath}/fashion/2.jpg`}
                                             className='img-fluid bg-img' alt='fashion'/>
                                        <div className="our-shops-single">
                                            <h3>KOA GLENDALE</h3>
                                            <p>416 Magnolia AveGlendale CA 91204</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    <div className="our-shops">
                                        <img src={`${CommonPath}/fashion/3.jpg`}
                                             className='img-fluid bg-img' alt='fashion'/>
                                        <div className="our-shops-single">
                                            <h3>KOA ANAHEIM</h3>
                                            <p>2201 E Winston RD Unit AAnaheim CA 92806</p>
                                        </div>
                                    </div>
                                </Col>
                                {/*<Col lg="4">*/}
                                {/*    <div className="our-shops">*/}
                                {/*        <img src={`${CommonPath}/fashion/4.jpg`}*/}
                                {/*             className='img-fluid bg-img' alt='fashion'/>*/}
                                {/*        <div className="our-shops-single">*/}
                                {/*            <h3>KOA SYLMAR DC</h3>*/}
                                {/*            <p>15823 Monte St unit 101 Sylmar CA 91342</p>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</Col>*/}
                                <Col lg="4">
                                    <div className="our-shops">
                                        <img src={`${CommonPath}/fashion/5.jpg`}
                                             className='img-fluid bg-img' alt='fashion'/>
                                        <div className="our-shops-single">
                                            <h3>KOA LAS VEGAS</h3>
                                            <p>4518 W Hacienda AveLas Vegas NV 89118</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    <div className="our-shops">
                                        <img src={`${CommonPath}/fashion/6.jpg`}
                                             className='img-fluid bg-img' alt='fashion'/>
                                        <div className="our-shops-single">
                                            <h3>KOA WOODLAND HILLS</h3>
                                            <p>7020 Topanga Canyon BlvdCanoga Park CA 91303</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    <div className="our-shops">
                                        <img src={`${CommonPath}/fashion/7.jpg`}
                                             className='img-fluid bg-img' alt='fashion'/>
                                        <div className="our-shops-single">
                                            <h3>KOA SAN DIEGO</h3>
                                            <p>7290 Clairemont Mesa BlvdSan Diego CA 92111</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    <div className="our-shops">
                                        <img src={`${CommonPath}/fashion/1.jpg`}
                                             className='img-fluid bg-img' alt='fashion'/>
                                        <div className="our-shops-single">
                                            <h3>KOA LOS ANGELES</h3>
                                            <p>4921 West Exposition Blvd Los Angeles CA 90016</p>
                                        </div>
                                    </div>
                                </Col>


                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="section-b-space">
                <Container className="out-team">
                    <Row style={{gridGap: "40px 0"}}>
                        <Col lg="6">
                            <div className="our-team">
                                <h3> OUR TEAM</h3>
                                <p>As a company, we invested a great time in selecting members of our support teams.
                                    With
                                    our experience, we have seen support and service stray further away from being
                                    effective
                                    and helpful and in a competitive and fast-paced environment, consistency from your
                                    supplier is of utmost importance.</p>

                                <p>Our sales and product management team includes members with extensive experience in
                                    developing righteous solutions. Our friendly national sales team is knowledgeable
                                    about
                                    products and eager to assist with a vast range of issues and concerns. We offer a
                                    wealth
                                    of options to aid you remotely or at one of our 8 store locations. Included in our
                                    support services is product-specific support on our items. Using our services, we
                                    are
                                    certain no issue is bigger than the scope of our collective knowledge.</p>

                                <p> KOA E.D.I is redefining the word quality service to mean building trust and
                                    developing
                                    strong relationships because to us it is not just about business, it is about the
                                    connection .</p>
                            </div>
                        </Col>
                        <Col lg="6">
                            <div className="our-team-images">
                                <img src={`${CommonPath}/fashion/noho.png`} className='img-fluid bg-img' alt='fashion'/>
                            </div>
                        </Col>
                        <Col lg="6" className="img-2">
                            <div className="our-team-images">
                                <img src={`${CommonPath}/fashion/noho2.png`} className='img-fluid bg-img'
                                     alt='fashion'/>
                            </div>
                        </Col>
                        <Col lg="6" className="content-2">
                            <div className="our-team">
                                <h3>OUR SELECTION</h3>
                                <p> Our selection is constantly expanding to provide our clients with the best the
                                    industry
                                    has to offer.</p>
                                <p> We carry CCTV Cameras, DVRs, Audio & Video Products and Home Innovation.</p>
                                <p> We support many top leading manufacturers and carry all respected lines
                                    including</p>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    );
};

export default AboutUs;