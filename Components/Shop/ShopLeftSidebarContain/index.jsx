import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'reactstrap';
import useFilter from '../../../Utils/useFilter';
import PaginationComp from '../../Element/Pagination';
import AllProducts from '../ShopCanvasFilter/AllProducts';
import FilterButton from '../ShopCanvasFilter/FilterButton';
import FilterContent from '../ShopCanvasFilter/FilterContent';
import ShopBannerDetails from '../ShopCanvasFilter/ShopBannerDetails';
import SidebarFilter from './SidebarFilter';
import Overlay from "../../../Layout/Overlay";
import {useSelector} from "react-redux";

const ShopLeftSidebarContain = ({shopProducts, shopFilters, shopCategory, listGrid, sale, search}) => {


    const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
    useEffect(() => {
        setDefImg("");
    }, []);

    return (
        <section className='section-b-space' style={{paddingTop: "20px"}}>
            {
                shopFilters &&
                <FilterButton productData={shopFilters} customClass={'filter-button mb-3'}/>
            }
            <Container>
                <Row>
                    <SidebarFilter productData={shopFilters} customClass="big-filter"/>
                    <Col lg={shopFilters ? '9' : "12"} xs='12' className='ratio_30'>
                        <ShopBannerDetails shopCategory={shopCategory} defImg={defImg} />
                        <FilterContent listGrid={listGrid}/>
                        <AllProducts currentData={shopProducts?.data} defImg={defImg}/>
                        <PaginationComp productData={shopProducts} sale={sale} search={search}/>
                    </Col>
                </Row>

            </Container>
        </section>
    );
};

export default ShopLeftSidebarContain;
