import React from 'react';
import {Col, Container, Row} from "reactstrap";
import Link from "next/link";
import CategoryCard from "../ShoesDemo/ShoesCategory/CategoryCard";
import {APICallUrl, CommonPath,APIImage} from "../Constant";
import {SortingByNameFunction, SortingByOrderFunction} from "../../Utils/sortingFunctions";

const ShopMainSection = ({categories}) => {

        return (
            <section
                className="section-b-space"
                style={{padding: "30px 0"}}
            >
                <Container>
                    <Row style={{gap: "20px 0"}}>
                        <h1 style={{paddingBottom: "26px",fontSize:"calc(22px + 6 * (100vw - 320px) / 1600)"}}>Shop By Category</h1>
                        {
                            categories ?
                                SortingByOrderFunction(categories).map((el, i) => {

                                    return (
                                        el.image &&
                                        <Col lg='4' md="6" key={i}>
                                            <Row className="shop-category">
                                                <Col className="shop-category-img" lg="5" md="5">
                                                    {/*<img src={`${CommonPath}/tvVector.png`}/>*/}
                                                    <Link href={`${el?.slugable?.prefix}/${el?.slugable?.key}`}>
                                                        <img src={`${APIImage}/${el?.image}`} alt={el?.name}
                                                             title={el?.name}/>
                                                        <h4>{el?.name}</h4>
                                                    </Link>

                                                </Col>

                                                <Col className="shop-category-categories" lg="7" md="7">
                                                    {
                                                        SortingByNameFunction(SortingByOrderFunction(el?.active_children?.slice(0, 6))).map((elem, index) => {

                                                            return (
                                                                <Link
                                                                    key={index}
                                                                    href={`${el?.slugable?.prefix}/${el?.slugable?.key}/${elem?.slugable?.key}`}>
                                                                    <h5 key={index}>{elem?.name}</h5></Link>
                                                            )
                                                        })
                                                    }
                                                    {el?.active_children?.length > 6 ?
                                                        <Link href={`${el?.slugable?.prefix}/${el?.slugable?.key}`}>
                                                            <h5 style={{color: "#797979"}}>+ Show More</h5></Link>
                                                        : ""}
                                                </Col>
                                            </Row>
                                        </Col>
                                    )
                                })

                                :
                                ""
                        }
                    </Row>
                </Container>

            </section>
        )
            ;
    }
;

export default ShopMainSection;