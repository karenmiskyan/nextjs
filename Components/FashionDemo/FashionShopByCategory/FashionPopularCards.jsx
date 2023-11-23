import React, {useEffect, useState} from 'react';
import {Col, Row} from 'reactstrap';
import {image_api, CommonPath} from "../../Constant";
import Link from "next/link";

const FashionPopularCard = ({popularCard, defImg}) => {

        let fixMaxCount = 6;
        const sortedPopularCard = [...popularCard].sort((a, b) => a.order - b.order);

        return (
            <>
                <Col lg='12' className="the-last-div">
                    <Row className="the-last">
                        {
                            popularCard ?
                                [...Array(Math.ceil(sortedPopularCard?.length / fixMaxCount))]?.map((c, countIndex, lastDiv) => {

                                    let indexOfLastEl = (countIndex + 1) * fixMaxCount;
                                    let indexOfFirstEl = indexOfLastEl - fixMaxCount;
                                    let currentEl = popularCard?.slice(indexOfFirstEl, indexOfLastEl)

                                    // let value = countIndex + 1

                                    return (
                                        <Col
                                            className={`the-last-div `}

                                            key={countIndex}
                                            xl='12'

                                        >
                                            <Row style={{gridGap: "28px 0"}}>
                                                {currentEl.map((el, makeIndex) => {

                                                      return (
                                                        <Col
                                                            className={`the-last-div-col ${lastDiv?.length - 1 !== countIndex ? "" : "res-div"}`}
                                                            value={makeIndex}
                                                            xl="2"
                                                            lg="4"
                                                            xs='6'
                                                            // xs='12'
                                                            key={makeIndex + 1}>
                                                            <div className="category-shop-home">
                                                                <div className='category-logos'>
                                                                    <Link
                                                                        href={`${el?.slugable?.prefix}/${el?.slugable?.key}`}>

                                                                        <img width="120" height="120"
                                                                             loading="lazy"
                                                                             src={defImg === "" ? `${image_api}/${el?.image}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                                                            // src={`${image_api}/${el?.image}`}
                                                                             alt={el.name} title={el?.name}/>
                                                                    </Link>

                                                                </div>
                                                                <Link href={`${el?.slugable?.prefix}/${el?.slugable?.key}`}>
                                                                    <h4>{el?.name}</h4>
                                                                </Link>
                                                                {/*{*/}
                                                                {/*    // currentEl.length === 6*/}
                                                                {/*    d.length-1 !==countIndex   ?*/}
                                                                {/*        <div className="after-col-id"/> : ""}*/}
                                                            </div>
                                                        </Col>
                                                    )
                                                })
                                                }
                                            </Row>


                                        </Col>

                                    )
                                }) : ""
                        }
                    </Row>
                </Col>
            </>
        )
            ;
    }
;
export default FashionPopularCard;
