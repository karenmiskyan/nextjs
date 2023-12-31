import React from 'react';
import {Col, Row} from 'reactstrap';
import {APIImage, ShopNow} from "../../Constant";
import {Btn} from "../../AbstractElements";
import {SortingByOrderFunction} from "../../../Utils/sortingFunctions";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";

const PopularCard = ({brands, defImg}) => {
        let fixMaxCount = 3;
        let brand = SortingByOrderFunction(brands)[0];
        let otherBrands = SortingByOrderFunction(brands).slice(1);
        const router = useRouter();

        return (
            <>
                <Col xl='4' lg='12'>
                    {brand && <div className='product-slider round-arrow'>
                        <Link href={`${brand?.slugable?.prefix}/${brand?.slugable?.key}`}>
                            <Image width="170" height="60"
                                   loading="lazy"
                                   src={defImg === "" ? `${APIImage}/${brand?.logo}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                   alt={brand?.alt} title={brand?.title}
                                   style={{margin: "30px 0 20px", maxWidth: "170px", width: "100%", objectFit: "contain"}}/>
                        </Link>
                        <div dangerouslySetInnerHTML={{__html: brand?.short_description}}/>

                        <Image src={`${APIImage}/${brand?.img_src}`}
                               loading="lazy" width="380" height="214"
                               style={{maxWidth: "380px", width: "100%"}}/>
                        <div style={{paddingBottom: "40px"}}>
                            <Btn
                                attrBtn={{
                                    className: 'btn-solid-default',
                                    onClick: () => router.push(`${brand?.slugable?.prefix}/${brand?.slugable?.key}`),
                                }}>
                                {ShopNow}
                            </Btn>
                        </div>
                    </div>
                    }

                </Col>
                <Col xl='8' lg='12'>
                    <Row className="first-row-top-brand">
                        {
                            brands &&
                            [...Array(Math.ceil(otherBrands?.length / fixMaxCount))]?.map((c, countIndex) => {

                                let indexOfLastEl = (countIndex + 1) * fixMaxCount;
                                let indexOfFirstEl = indexOfLastEl - fixMaxCount;
                                let currentEl = otherBrands.slice(indexOfFirstEl, indexOfLastEl)

                                return (
                                    <Col key={countIndex} lg='12'>
                                        <Row className="row-top-brand-logos">
                                            {
                                                currentEl?.map((el, makeIndex) => {
                                                    return (
                                                        <Col lg='4' md='4' xs='12' key={makeIndex + 1}>
                                                            <div className='top-brand-logos'>
                                                                <Link
                                                                    href={`${el?.slugable?.prefix}/${el?.slugable?.key}`}>
                                                                    <Image height="60" width="200" loading="lazy"
                                                                           src={defImg === "" ? `${APIImage}/${el?.logo}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                                                           alt={el?.alt} title={el?.title}
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </Col>
                                                    )
                                                })}
                                        </Row>

                                    </Col>

                                )
                            })
                        }
                    </Row>
                </Col>

            </>
        );
    }
;
export default PopularCard;
