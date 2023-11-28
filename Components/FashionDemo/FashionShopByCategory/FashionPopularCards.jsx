import React from 'react';
import {Col, Row} from 'reactstrap';
import {APIImage} from "../../Constant";
import Link from "next/link";
import Image from "next/image";

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


                                    return (
                                        <Col
                                            className={`the-last-div `}
                                            key={countIndex}
                                            xl='12'>
                                            <Row style={{gridGap: "28px 0"}}>
                                                {currentEl.map((el, makeIndex) => {

                                                    return (
                                                        <Col
                                                            className={`the-last-div-col ${lastDiv?.length - 1 !== countIndex ? "" : "res-div"}`}
                                                            value={makeIndex}
                                                            xl="2"
                                                            lg="4"
                                                            xs='6'
                                                            key={makeIndex + 1}>
                                                            <div className="category-shop-home">
                                                                <div className='category-logos'>
                                                                    <Link
                                                                        href={`${el?.slugable?.prefix}/${el?.slugable?.key}`}>

                                                                        <Image width="120" height="120"
                                                                               loading="lazy"
                                                                               src={defImg === "" ? `${APIImage}/${el?.image}` :
                                                                                   "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                                                            // src={`${APICallUrl}/storage/${el?.image}`}
                                                                               alt={el.name} title={el?.name}/>
                                                                    </Link>

                                                                </div>
                                                                <Link href={`${el?.slugable?.prefix}/${el?.slugable?.key}`}>
                                                                    <h4>{el?.name}</h4>
                                                                </Link>
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
