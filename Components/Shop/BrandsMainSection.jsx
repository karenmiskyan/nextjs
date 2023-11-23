import React, {useState} from 'react';
import {Col, Container, Row} from "reactstrap";
import {image_api} from "../Constant";
import Link from "next/link";

const BrandsMainSection = ({brands}) => {
        let alphabet = ['#', '0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        function isNumber(n) {
            return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
        }


        let [alpha, setAlpha] = useState("#")


        return (
            <section className="section-b-space" style={{paddingTop: "0"}}>
                <Container>
                    <Row className="brands-row">
                        <h1 style={{
                            backgroundColor: "white",
                            paddingBottom: "26px",
                            paddingTop: "30px",
                            fontSize: "calc(22px + 6 * (100vw - 320px) / 1600)"
                        }}>Shop By Brand</h1>
                        <div className="table-responsive "
                             style={{backgroundColor: "white", borderBottom: "1px solid #eff2f7"}}>
                            <div className="sc-dmctIk WQNxq">
                                <div style={{display: "table", width: "100%", paddingBottom: "20px"}}>
                                    <Col lg="12" style={{display: "flex", justifyContent: "space-between"}}>
                                        {
                                            alphabet.map((el, i) => {

                                                return (

                                                    <div key={i}
                                                         style={{
                                                             display: "flex",
                                                             justifyContent: "center",
                                                             width: el === "0-9" ? "60px" : "44px",
                                                             borderRight: "1px solid #E2E5EA",
                                                             borderLeft: el === "#" ? "1px solid #E2E5EA" : "none"
                                                         }}>
                                                        <h3 onClick={() => setAlpha(el)}
                                                            style={{
                                                                fontWeight:"300",
                                                                color: alpha === el ? "var(--theme-color)" : "black",
                                                                cursor: "pointer"
                                                            }}>{el}</h3>
                                                    </div>

                                                )
                                            })
                                        }


                                    </Col>
                                </div>
                            </div>

                        </div>
                        {brands ? brands.map((el, i) => {

                            return (
                                alpha === "#" ?
                                    <Col xl="2" lg="3" md="6" xs="12" key={i} className="brands-col">
                                        <Link href={`${el?.slugable?.prefix}/${el?.slugable?.key}`}
                                              className="d-flex justify-content-center w-100">
                                            <div className="brands-div">
                                                <img src={`${image_api}/${el.logo}`} alt={el.name}
                                                     title={el.name}/>
                                            </div>
                                        </Link>
                                    </Col> : alpha.toLowerCase() === el.name[0].toLowerCase() ?
                                        <Col xl="2" lg="3" md="6" xs="12" key={i} className="brands-col">
                                            <Link href={`${el?.slugable?.prefix}/${el?.slugable?.key}`}
                                                  className="d-flex justify-content-center w-100">
                                                <div className="brands-div">
                                                    <img src={`${image_api}/${el.logo}`} alt={el.name}
                                                         title={el.name}/>
                                                </div>
                                            </Link>
                                        </Col> : isNumber(alpha[0]) && isNumber(el.name[0]) ?
                                            <Col xl="2" lg="3" md="6" xs="12" key={i} className="brands-col">
                                                <Link href={`${el?.slugable?.prefix}/${el?.slugable?.key}`}
                                                      className="d-flex justify-content-center w-100">
                                                    <div className="brands-div">
                                                        <img src={`${image_api}/${el.logo}`} alt={el.name}
                                                             title={el.name}/>
                                                    </div>
                                                </Link>
                                            </Col> : ""

                            )
                        }) : ""
                        }

                    </Row>
                </Container>

            </section>
        );
    }
;

export default BrandsMainSection;