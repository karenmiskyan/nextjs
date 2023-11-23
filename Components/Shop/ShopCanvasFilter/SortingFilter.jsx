import React, {useState, Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import GridContain from './GridContain';
import {Btn} from "../../AbstractElements";
import {
    selectFilterAttribute,
    selectFilterBrands,
    selectFilterCategory,
    selectLoading, selectPerPage,
    selectPriceRange, selectResetAll,
    selectShopCategory,
    setDelete, setFilterAttribute, setFilterBrands, setFilterCategory, setFirst,
    setLoading, setPerPage, setPopState,
    setPriceRange,
    setResetAll, setShopCategory,
} from "../../../ReduxToolkit/Slices/ShopProductsSlice";
import {useRouter} from "next/router";
import {selectLoginToken} from "../../../ReduxToolkit/Slices/LoginSlice";
import {Skeleton} from "@mui/material";

const SortingFilter = ({sortName, grid5, listGrid}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const {sorting} = useSelector((state) => state.ProductFilter);
    const router = useRouter();
    const shopCategory = useSelector(selectShopCategory);
    const isLoading = useSelector(selectLoading);

    const perPage = useSelector(selectPerPage);
    const priceRange = useSelector(selectPriceRange);
    const filterBrands = useSelector(selectFilterBrands);
    const filterAttribute = useSelector(selectFilterAttribute);
    const filterCategory = useSelector(selectFilterCategory);
    const resetAll = useSelector(selectResetAll);
    const loginToken = useSelector(selectLoginToken);


    const SortData = [
        {
            id: 1,
            sort: 'Select Sorting',
        },
        {
            id: 2,
            sort: 'Alphabetically A-Z',
        },
        {
            id: 3,
            sort: 'Alphabetically Z-A',
        },
        {
            id: 4,
            sort: 'Price, High To Low',
        },
        {
            id: 5,
            sort: 'Price, Low To High',
        },
    ];

    useEffect(() => {

        if (resetAll) {
            fetch(`${shopCategory.products?.path}?per_page=12&json=true`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token || ""}`
                }
            })
                .then((res) => res.json()).then((res) => {

                dispatch(setShopCategory(res));
                dispatch(setLoading(false));
                dispatch(setResetAll(false));
                dispatch({type: 'IS_FOCUS', payload: false});
                dispatch({type: 'IS_SEARCH', payload: false});

            })
                .catch((error) => {
                    // Handle error if the second fetch fails
                    console.error('Failed to fetch data:', error);
                    dispatch(setLoading(false));
                    dispatch(setResetAll(false));
                    dispatch({type: 'IS_FOCUS', payload: false});
                    dispatch({type: 'IS_SEARCH', payload: false});
                });

        }
        // else {
        //     dispatch(setShopCategory(data?.categoriesData));
        // }
    }, [resetAll])


    const changePerPage = (val) => {
        dispatch(setPerPage(val));
        dispatch(setFirst(false));
        dispatch(setPopState(false));
    }

    return (
        <Col xs='12' style={{margin: "0"}}>
            <div className='filter-options'>
                <ul className='short-name'>
                    <li>
                        {isLoading ? <Skeleton width={180} height={30} style={{marginLeft: "15px"}}/> :
                            <div className='label-tag' style={{backgroundColor: "white"}}>
                <span>Showing: {shopCategory?.products?.total < 12 ? shopCategory?.products?.total : perPage} to {shopCategory?.products?.total}
                </span>
                                {/*{shopCategory?.products?.total < 12 ? shopCategory?.products?.total :*/}
                                {/*<span className={`${perPage === "12" ? "fw-bold" : ""}`}*/}
                                {/*      onClick={() => changePerPage("12")}>12</span>} {shopCategory?.products?.total < 24 ? "" :*/}
                                {/*<span className={`${perPage === "24" ? "fw-bold" : ""}`}*/}
                                {/*      onClick={() => changePerPage("24")}>/ 24</span>} {shopCategory?.products?.total < 48 ? "" :*/}
                                {/*<span className={`${perPage === "48" ? "fw-bold" : ""}`}*/}
                                {/*      onClick={() => changePerPage("48")}>/ 48</span>}*/}
                            </div>

                        }
                    </li>
                    {(priceRange.length > 0 || filterBrands.length > 0 || filterAttribute.length > 0 || filterCategory.length > 0) && !isLoading &&
                        <Fragment>
                            <li>
                                <div className='label-tag' onClick={() => {
                                    dispatch(setLoading(true));
                                    router.push(router.asPath.split('?')[0], undefined, {shallow: true});
                                    dispatch(setResetAll(true));
                                    dispatch(setPopState(false));
                                    dispatch(setFilterBrands([]));
                                    dispatch(setFilterAttribute([]));
                                    dispatch(setFilterCategory([]));
                                    dispatch(setPriceRange([]));
                                    // dispatch(setPriceRange([]));
                                    // pushStateData()
                                    // dispatch(setResetAll([...[...filterBrands, ...filterCategory].map(elem => {
                                    //     const decodedString = decodeURIComponent(elem);
                                    //     return decodedString.split("=")[1];
                                    // }),...priceRange.map(elem => {
                                    //     const decodedString = decodeURIComponent(elem);
                                    //     return decodedString.split("=")[0];
                                    // })] ))
                                }}>
                                    <span>Reset All</span>
                                    <Btn attrBtn={{
                                        type: 'button',
                                        className: 'btn-close',
                                    }}></Btn>
                                </div>
                            </li>


                        </Fragment>
                    }

                    {priceRange.length > 0 && !isLoading &&
                        <Fragment>
                            <li>
                                <div className='label-tag' onClick={() => {
                                    dispatch(setFirst(false));
                                    dispatch(setPopState(false));
                                    dispatch(setPriceRange([]));
                                }}>
                                    <span>Reset Price</span>
                                    <Btn attrBtn={{
                                        type: 'button',
                                        className: 'btn-close',

                                    }}></Btn>
                                </div>
                            </li>


                        </Fragment>
                    }
                    {
                        !isLoading && [...filterBrands, ...filterAttribute, ...filterCategory].map((elem, i) => {

                            const decodedString = decodeURIComponent(elem);
                            const value = decodedString.split("=")[1];

                            let m = [];

                            if (shopCategory?.filters?.brands) {
                                m = [...m, ...shopCategory.filters.brands.filter(el => el.id == value)];
                            }

                            if (shopCategory?.filters?.categories) {
                                m = [...m, ...shopCategory.filters.categories.filter(el => el.id == value)];
                            }

                            return (

                                <Fragment key={i}>
                                    <li key={i}>
                                        <div className='label-tag' onClick={() => {
                                            dispatch(setFirst(false));
                                            dispatch(setPopState(false));
                                            dispatch(setDelete(value))
                                        }}>
                                            <span>{m?.length > 0 ? m?.map(el => el?.name) : value}</span>
                                            <Btn attrBtn={{
                                                type: 'button',
                                                className: 'btn-close',
                                            }}></Btn>
                                        </div>
                                    </li>


                                </Fragment>
                            )

                        })
                    }

                </ul>

                <div className='select-options' style={{marginLeft: "auto"}}>
                    {/*<div className='page-view-filter'>*/}
                    {/*    <Dropdown className='select-featured' isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>*/}
                    {/*        <DropdownToggle className='dropdown-toggle'>*/}
                    {/*            <span>{sorting}</span> <i className='fas fa-angle-down ms-lg-3 ms-2'></i>*/}
                    {/*        </DropdownToggle>*/}
                    {/*        <DropdownMenu>*/}
                    {/*            {SortData &&*/}
                    {/*                SortData.map((elem) => (*/}
                    {/*                    <DropdownItem key={elem.id} onClick={() => dispatch({*/}
                    {/*                        type: 'SORTINGFILTER',*/}
                    {/*                        payload: elem.sort*/}
                    {/*                    })}>*/}
                    {/*                        {elem.sort}*/}
                    {/*                    </DropdownItem>*/}
                    {/*                ))}*/}
                    {/*        </DropdownMenu>*/}
                    {/*    </Dropdown>*/}
                    {/*</div>*/}
                    {/*<SortByType />*/}
                    {
                        router.query.id === "sony" &&
                        <div className='product-buttons' style={{marginBottom: "0", marginRight:"8px"}}>
                            <Button
                                onClick={() => router.push("/authorization-form")}
                                className='btn btn-solid hover-solid btn-animation quick-order-button'>
                                {/*<i className='fa fa-shopping-cart'></i>*/}
                                <span>Authorization Form</span>
                            </Button>
                        </div>

                    }
                    {
                        router.query.id  === "rti" &&
                        <div className='product-buttons' style={{marginBottom: "0", marginRight:"8px"}}>
                            <a className='btn btn-solid hover-solid btn-animation quick-order-button'
                               href="https://www.rticontrol.com/koa-become-an-rti-dealer#dealer-form"
                               target="_blank">
                                <span>Register Here</span>
                            </a>
                        </div>

                    }

                    <span className="fw-bold" style={{fontSize:"14px"}}>Per Page</span>
                    <select className='form-select checkout-form form-control'
                            value={perPage}
                            onChange={(e) => {

                                changePerPage(e.target.value)
                                // setLoading(true);
                                // const match = e.target.value.match(/\d+/);
                                // if (match) {
                                //     setDataRange(parseInt(match[0]));
                                //     changeDataRange(parseInt(match[0]))
                                // } else {
                                //     setDataRange("");
                                //     changeDataRange("")
                                // }

                            }}>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="48">48</option>
                    </select>
                </div>

                <GridContain grid5={grid5} listGrid={listGrid}/>
            </div>
        </Col>
    );
};

export default SortingFilter;
