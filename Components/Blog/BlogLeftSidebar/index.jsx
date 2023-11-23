import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Container, Row} from 'reactstrap';
import {getAllUsers} from '../../../Service/FetchApi';
import PaginationComp from '../../Element/Pagination';
import LeftSidebar from '../BlogDetails/LeftSidebar';
import ProductCard from './ProductCard';
import ShopBannerDetails from "../../Shop/ShopCanvasFilter/ShopBannerDetails";
import Img from "../../Element/Images";
import {CommonPath, ShopNow} from "../../Constant";
import {Btn} from "../../AbstractElements";
import ReactPaginate from "react-paginate";
import {
    setLoading,
    setShopCategory,
    setShopFilters,
    setShopProducts
} from "../../../ReduxToolkit/Slices/ShopProductsSlice";
import {useRouter} from "next/router";

const BlogLeftSidebar = ({blogs, popular}) => {

    const [selectPage, setSelectPage] = useState(1);
    const [allBlogs, setAllBlogs] = useState({});
    const router = useRouter();

    function pushStateData(el) {
        const query = `${router.pathname}?&${el}`;
        router.push(query, undefined, {shallow: true});
    }


    useEffect(() => {
        if (Number(router?.query?.page) > 1 || Object.keys(router?.query).length > 3) {

            fetch(`${blogs?.meta?.path}?json=true&per_page=9&page=${router?.query?.page}`)
                .then(res => res.json().then(res => {

                        setSelectPage(res?.meta?.current_page)
                        setAllBlogs(res)
                    }
                ));
        } else {
            setAllBlogs(blogs)
        }
    }, []);

    const paginate = (e) => {
        fetch(`${allBlogs.meta.path}?json=true&per_page=9&page=${e.selected + 1}`)
            .then(res => res.json().then(res => {
                    window.scrollTo(0, 100)
                    setSelectPage(e.selected + 1);
                    setAllBlogs(res);
                    pushStateData(`per_page=9&page=${e.selected + 1}`)

                }
            ));
    }

    return (
        <section id='portfolio' className='left-sidebar-section masonary-blog-section section-b-space'
                 style={{paddingTop: "0", backgroundColor: "white"}}>
            <Container>
                <Row className='g-4'>
                    <Col lg="12">
                        <div className='banner-deatils' style={{marginTop: "20px"}}>
                            <div className='banner-image' style={{
                                minHeight: "380px",
                                backgroundImage: "url(/assets/images/fashion/banner.jpg)",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                display: "block"
                            }}>
                                {/*<Fragment>*/}
                                {/*    <div className='category-banner-button' style={{*/}
                                {/*        position: "absolute",*/}
                                {/*        bottom: "6%",*/}
                                {/*        right: "2.5%",*/}
                                {/*    }}>*/}
                                {/*        <Btn*/}
                                {/*            attrBtn={{*/}
                                {/*                className: 'btn-solid-default ',*/}
                                {/*                onClick: () => router.push('/shop'),*/}
                                {/*            }}>*/}
                                {/*            {ShopNow}*/}
                                {/*        </Btn>*/}
                                {/*    </div>*/}
                                {/*</Fragment>*/}
                            </div>
                        </div>
                    </Col>
                    <Col lg='9' md='7' className='order-md-1 ratio3_2'>
                        <ProductCard currentData={allBlogs?.data}/>
                        <Col xs='12'>
                            {/*<PaginationComp dataPerPage={dataPerPage} StoreProductLength={StoreBlog?.length}*/}
                            {/*                currentPage={currentPage} paginate={paginate}/>*/}

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
                    </Col>
                    <LeftSidebar popular={popular?.data}/>
                </Row>
            </Container>
        </section>
    );
};

export default BlogLeftSidebar;
