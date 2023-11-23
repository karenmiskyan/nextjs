import Link from 'next/link';
import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import BoxAnimationSection from './BoxAnimationSection';
import ShoesCategory from "../../ShoesDemo/ShoesCategory";
import CategoryCard from "../../ShoesDemo/ShoesCategory/CategoryCard";

const BreadCrumb = ({parent, title, categoryBanner, slug}) => {
    // const {parent = '', title = ''} = props;
    // const ShoesFilter = props?.categoryBanner?.filter((el) => el.type === 'shoes');

    return (
        <section
            // className='breadcrumb-section section-b-space'
            className="section-b-space"
            style={{padding: "24px 0", backgroundColor: "white"}}
        >
            {/*<BoxAnimationSection />*/}
            <Container>
                <Row className="g-3">
                    <Col xs='12'>
                        <nav className="breadcrumb-section">
                            <ol className='breadcrumb'>
                                <li className='breadcrumb-item'>
                                    <Link href={'/'}>
                                        <i className='fas fa-home'></i>
                                    </Link>
                                </li>
                                {parent?.map((el, i) => {
                                    return (
                                        <li className='breadcrumb-item active d-flex align-items-center' aria-current='page' key={i}>
                                            {i === parent.length - 1 ? (


                                                el?.url !== "" ?
                                                    <Link href={`/${el?.url}`} style={{color: "#797979"}}>
                                                        <h1 className="  text-start mb-0" style={{
                                                            fontSize: "16px",
                                                            fontWeight: 400
                                                        }}>    {el?.name}</h1>
                                                    </Link> :
                                                    <a style={{color: "#797979"}}>
                                                        <h1 className="text-start mb-0" style={{
                                                            fontSize: "16px",
                                                            fontWeight: 400
                                                        }}>     {el?.name} </h1>
                                                    </a>


                                            ) : (
                                                el?.url !== "" ?
                                                    <Link href={`/${el?.url}`} style={{color: "#797979"}}>
                                                        {el?.name}
                                                    </Link> :
                                                    <a style={{color: "#797979"}}>
                                                        {el?.name}
                                                    </a>
                                            )}
                                        </li>
                                    )
                                })}

                            </ol>
                        </nav>
                    </Col>
                    {
                    categoryBanner?.length > 0 &&
                    <>
                        <h2>{title}</h2>
                        <CategoryCard ShoesFilter={categoryBanner} slug={slug}/>
                    </>
                    }

                </Row>
            </Container>

        </section>
    );
}
    ;

    export default BreadCrumb;
