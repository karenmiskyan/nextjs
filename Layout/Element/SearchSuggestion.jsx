import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Media, Row} from 'reactstrap';
import {APIImage} from '../../Components/Constant';
import NoProductFound from './NoProductFound';
import Link from "next/link";
import {selectAuth} from "../../ReduxToolkit/Slices/LoginSlice";
import {persistor} from "../../ReduxToolkit/store";
import {PersistGate} from "redux-persist/integration/react";
import Image from "next/image";

const SearchSuggestion = ({productData, categoriesData, brandsData, onInputText, loading}) => {

    let auth = useSelector(selectAuth);
    let dispatch = useDispatch()

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const escapedInput = escapeRegExp(onInputText);

    return (
        <>
            {(productData?.length > 0 || categoriesData?.length > 0 || brandsData?.length > 0) && onInputText.length > 1 ? (
                <div className='search-suggestion search-suggestion-2'>
                    <Row className='g-3' style={{
                        overflowY: window.innerWidth < 576 ? "scroll" : "",
                        height: window.innerWidth < 576 ? "calc(100vh - 100px)" : ""
                    }}>
                        <Col xl='3' lg="2" md="3" sm='4' xs='12'
                             style={{
                                 borderRight: "1px solid #EFF2F7",
                                 overflowY: `${window.innerWidth < 576 ? "unset" : "auto"}`,
                                 height: `${window.innerWidth < 991 ? window.innerWidth < 576 ? "auto" : "380px" : "456px"}`
                             }}>
                            <div className="search-brand-category">
                                {brandsData.length > 0 && <h3>BRANDS</h3>}
                                <div>
                                    {
                                        brandsData.length > 0 &&
                                        // (
                                        //     loading ?
                                        //         <>
                                        //             <Skeleton height={30} style={{width: "75%"}}/>
                                        //             <Skeleton height={30} style={{width: "75%"}}/>
                                        //         </>
                                        //         :
                                        brandsData?.map((el, i) => {
                                            return (
                                                <Link key={i} onClick={() => dispatch({
                                                    type: 'IS_FOCUS',
                                                    payload: false
                                                })}
                                                      href={`/${el?.slugable?.prefix}/${el?.slugable?.key}`}>
                                                    <h4 dangerouslySetInnerHTML={{
                                                        __html: el?.name?.replace(
                                                            new RegExp(`(${escapedInput})`, 'gi'),
                                                            "<span style='color: var(--theme-color)'>$1</span>"
                                                        )
                                                    }}/>
                                                </Link>
                                            )
                                        })
                                        // )

                                    }
                                </div>
                            </div>
                            <div className="search-brand-category">
                                {categoriesData.length > 0 && <h3> CATEGORIES</h3>}
                                {
                                    categoriesData.length > 0 &&
                                    // (
                                    //     loading ?
                                    //         <>
                                    //             <Skeleton height={30} style={{width: "75%"}}/>
                                    //             <Skeleton height={30} style={{width: "75%"}}/>
                                    //         </>
                                    //         :
                                    categoriesData?.map((el, i) => {
                                        return (
                                            <Link key={i} href={`/${el?.slugable?.prefix}/${el?.slugable?.key}`}>
                                                <h4 dangerouslySetInnerHTML={{
                                                    __html: el?.name?.replace(
                                                        new RegExp(`(${escapedInput})`, 'gi'),
                                                        "<span style='color: var(--theme-color)'>$1</span>"
                                                    )
                                                }}/>
                                            </Link>
                                        )
                                    })
                                    // )
                                }
                            </div>
                        </Col>
                        <Col xl='9' lg="10" md='9' sm='8' xs='12'>
                            <div className="search-brand-category">
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    margin: "0 calc(2px + 6 * (100vw - 320px) / 1600) 0 calc(2px + 6 * (100vw - 320px) / 1600)"
                                }}>
                                    {productData.length > 0 && <h3>PRODUCTS</h3>}
                                    <Link href={`/shop/?s=${onInputText}`}
                                          style={{textDecoration: "underline", color: "var(--theme-color)"}}><h3
                                        style={{color: "var(--theme-color)"}}>View All</h3></Link>
                                </div>

                                {/*<ul className='custom-scroll'>*/}
                                <Row style={{
                                    overflowY: `${window.innerWidth < 576 ? "unset" : "auto"}`,
                                    height: `${window.innerWidth < 991 ? "350px" : "440px"}`,
                                    width: "100%"
                                }}>

                                    {productData.length > 0 && productData?.map((elem, i) => {

                                        const truncatedName = elem?.name?.length > 28 ? `${elem?.name?.slice(0, 28)}...` : elem?.name;

                                        return (
                                            <Col lg='4' md='6' sm='6' xs="12" key={i}>
                                                {/*{Is_Focus && (*/}
                                                <Media className='product-cart'>
                                                    <Media body
                                                           style={{display: `${window.innerWidth < 576 ? "flex" : ""}`}}>
                                                        <Link
                                                            href={`/${elem?.slugable?.prefix}/${elem?.slugable?.key}`}>
                                                            <div className='media-image'>
                                                                {/*{elem?.images.slice(0, 1).map((img, i) => (*/}
                                                                <Image width="100" height="100"
                                                                       loading="lazy"
                                                                       src={`${APIImage}/${elem.image}`}
                                                                       className='img-fluid' title={elem?.name}
                                                                       alt={elem?.name} key={i}/>
                                                            </div>
                                                        </Link>
                                                        <div>

                                                            <Link
                                                                href={`/${elem?.slugable?.prefix}/${elem?.slugable?.key}`}
                                                                className="mt-1">
                                                                <h5
                                                                    className="mt-1 mb-1"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: truncatedName.replace(
                                                                            new RegExp(`(${escapedInput})`, 'gi'),
                                                                            "<span style='color: var(--theme-color)'>$1</span>"
                                                                        )
                                                                    }}
                                                                /></Link>
                                                            <div style={{margin: "16px 0", height: "54px"}}>
                                                                <div className='font-light ml-1'
                                                                     style={{fontSize: "14px"}}
                                                                     dangerouslySetInnerHTML={{
                                                                         __html: `# ${elem?.sku?.replace(
                                                                             new RegExp(`(${escapedInput})`, 'gi'),
                                                                             "<span style='color: var(--theme-color)'>$1</span>"
                                                                         )}`
                                                                     }}/>
                                                                <div className='font-light ml-1'
                                                                     style={{fontSize: "14px"}}
                                                                     dangerouslySetInnerHTML={{
                                                                         __html: `# ${elem?.eclipse_number?.replace(
                                                                             new RegExp(`(${escapedInput})`, 'gi'),
                                                                             "<span style='color: var(--theme-color)'>$1</span>"
                                                                         )}`
                                                                     }}/>
                                                            </div>
                                                            <PersistGate loading={null} persistor={persistor}>
                                                                {
                                                                    !auth &&
                                                                    <h6 className='mb-0 mt-1'>
                                                                        ${(elem?.front_sale_price !== null || undefined) && (elem?.price > elem?.front_sale_price) ? elem?.front_sale_price?.toFixed(2) : elem?.price?.toFixed(2)}
                                                                        {(elem?.front_sale_price !== null || undefined) && (elem?.price > elem?.front_sale_price) ?
                                                                            <span> <del>${elem?.price.toFixed(2)}</del></span> : ""}
                                                                    </h6>
                                                                }
                                                            </PersistGate>
                                                            {/*<DynamicRating data={elem.ratingStars}*/}
                                                            {/*               customeclass={'p-0'}/>*/}
                                                        </div>
                                                    </Media>
                                                </Media>
                                                {/*)}*/}
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            ) : (productData?.length > 0 || categoriesData?.length > 0 || brandsData?.length > 0) || onInputText.length <= 1
                ? "" : loading ? "" : <NoProductFound/>
            }
        </>
    );
};

export default SearchSuggestion;
