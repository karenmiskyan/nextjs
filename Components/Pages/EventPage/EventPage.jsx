import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {setLoading} from "../../../ReduxToolkit/Slices/ShopProductsSlice";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import ProductCard from "../../Blog/BlogLeftSidebar/ProductCard";
import ReactPaginate from "react-paginate";
import LeftSidebar from "../../Blog/BlogDetails/LeftSidebar";
import Link from "next/link";
import Img from "../../Element/Images";
import {Eye} from "react-feather";

const EventPage = ({blogs}) => {

        const [selectPage, setSelectPage] = useState(1);
        const [allBlogs, setAllBlogs] = useState({});
        // const [randomViews, setRandomViews] = useState({});

        const router = useRouter();

        function pushStateData(el) {
            const query = `${router.pathname}?&${el}`;
            router.push(query, undefined, {shallow: true});
        }


        useEffect(() => {
            if (Number(router?.query?.page) > 1 || Object.keys(router?.query).length > 3) {
                fetch(`${blogs?.meta?.path}?json=true&per_page=9&page=${router?.query?.page}&type=event`)
                    .then(res => res.json().then(res => {
                            setSelectPage(res?.meta?.current_page)
                            setAllBlogs(res)

                        }
                    ));
            } else {
                setAllBlogs(blogs)
            }
        }, []);

        let paginate = (e) => {
            fetch(`${allBlogs.meta.path}?json=true&per_page=9&page=${e.selected + 1}&type=event`)
                .then(res => res.json().then(res => {
                        window.scrollTo(0, 0)
                        setSelectPage(e.selected + 1);
                        setAllBlogs(res);
                        pushStateData(`per_page=9&page=${e.selected + 1}`)

                    }
                ));
        }


        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.toLocaleString('default', {month: 'short'});
            const year = date.getFullYear();

            return (
                <div className="text-center">
                    <span className="date-day d-block fw-bolder h1 display-3 m-0">{day}</span>
                    <span className="date-month d-block fw-bolder text-uppercase h3 m-0 lh-sm">{month}</span>
                    <span className="date-year d-block badge bg-info text-dark" style={{maxWidth:"88px",margin:"0 auto"}}>{year}</span>
                </div>
            );
        };


        // const truncateString = (str, maxLength) => {
        //     return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
        // };

        // useEffect(() => {
        //     const newRandomViews = {};
        //     allBlogs?.data?.forEach(elem => {
        //         newRandomViews[elem?.id] = generateRandomNumber();
        //     });
        //     setRandomViews(newRandomViews);
        // }, [allBlogs]);

        // const generateRandomNumber = () => {
        //     return Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        // };
        return (
            <section id='portfolio' className='left-sidebar-section masonary-blog-section section-b-space'
                     style={{backgroundColor: "white"}}>
                <Container>
                    <Row className='g-4'>
                        <Col xl="8" lg='12' className='ratio3_2'>
                            <Row className='g-5'>
                                {allBlogs?.data
                                    ?.sort((a, b) => {
                                        const dateA = new Date(a?.date);
                                        const dateB = new Date(b?.date);

                                        // Check if both dates are valid
                                        if (!isNaN(dateA) && !isNaN(dateB)) {
                                            // Compare dates in descending order
                                            return dateB - dateA;
                                        } else if (!isNaN(dateA)) {
                                            // If dateB is invalid, put a before b
                                            return -1;
                                        } else if (!isNaN(dateB)) {
                                            // If dateA is invalid, put b before a
                                            return 1;
                                        } else {
                                            // If both dates are invalid, maintain the current order
                                            return 0;
                                        }
                                    })
                                    ?.map((elem) => {
                                    return (
                                        <Col lg='12' md='12' key={elem?.id} className="d-flex">
                                            <Row className="w-100 g-3">

                                                <Col lg="2"  sm="2" xs="5">
                                                    <div >
                                                        <h6>{formatDate(elem?.date)}</h6>
                                                    </div>
                                                </Col>
                                                <Col lg="3"  sm="3"  xs="7" className="text-center">
                                                    <Link href={`event/${elem?.slug}`}
                                                          style={{height: "100%", width: "100%"}}>
                                                        <img src={`${elem.image}`} alt={elem.name} width="300" height="300"
                                                             style={{height: "100%", width: "100%"}}/>
                                                    </Link>

                                                </Col>
                                                <Col lg="7"  sm="7"  xs="12">
                                                    {/*<h5>{elem.title}</h5>*/}
                                                    <span className="d-block text-muted pb-2" style={{fontSize: "14px"}}>
					<small><i className="fas fa-clock me-2"></i><b>From {elem?.from}</b></small>
					<small className="border-end me-2 pe-2"><b> To {elem?.to}</b></small>
					<small className="text-uppercase text-dark"><b>{elem?.event_type}</b></small>
				</span>
                                                    <Link href={`event/${elem?.slug}`}>
                                                        <h3 className='pb-2' style={{color: "#0DCAF0"}}>{elem?.name}</h3>
                                                    </Link>
                                                    <span className="d-block" style={{fontSize:"14px"}}>
					<small><i className="fas fa-building me-1"></i>{elem?.city}</small>
					<small className="border-start ps-2 ms-2"><i className="fas fa-map-marker-alt me-1"></i></small>
                                                        {elem?.address}</span>
                                                </Col>
                                            </Row>

                                        </Col>
                                    );
                                })}
                            </Row>

                        </Col>
                        <Col xl='12' xs='12'>
                            <nav className={`page-section`}>
                                <ReactPaginate
                                    pageCount={allBlogs?.meta?.last_page}
                                    forcePage={selectPage - 1}
                                    breakLabel="..."
                                    nextLabel=">"
                                    previousLabel="<"
                                    className="pagination"
                                    pageClassName={`page-item `}
                                    pageLinkClassName="page-link"
                                    // onPageChange={handlePageClick}
                                    previousClassName="page-item"
                                    nextClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextLinkClassName="page-link"
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    pageRangeDisplayed={3}
                                    renderOnZeroPageCount={null}
                                    disabledClassName="d-none"
                                    onPageChange={(e) => paginate(e)}
                                />
                            </nav>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
;


export default EventPage;