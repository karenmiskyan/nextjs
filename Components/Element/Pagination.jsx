import React, {useEffect, useRef, useState} from 'react';
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {
    selectFilterBrands,
    selectFilterCategory,
    selectPriceRange,
    setShopCategory,
    // setShopProducts,
    setLoading,
    // setShopFilters,
    selectResetAll,
    setResetAll,
    setPriceRange,
    setFilterBrands,
    setFilterCategory,
    setFilterAttribute,
    selectFilterAttribute,
    setPopState,
    selectPopState,
    selectFirst,
    setFirst,
    selectPerPage,
    setPerPage
} from "../../ReduxToolkit/Slices/ShopProductsSlice";
import {useRouter} from "next/router";
import {selectLoginToken} from "../../ReduxToolkit/Slices/LoginSlice";
import {APICallUrl} from "../Constant";
import useWindowDimensions from "../../Utils/useWindowDimensions";

const PaginationComp = ({productData, addClass, sale, search,}) => {

        const [selectPage, setSelectPage] = useState(1);
        const firstRender = useRef(true);
        const loginToken = useSelector(selectLoginToken);
        const dispatch = useDispatch();
        const filterBrands = useSelector(selectFilterBrands);
        const filterAttribute = useSelector(selectFilterAttribute);
        const filterCategory = useSelector(selectFilterCategory);
        const priceRange = useSelector(selectPriceRange);
        const resetAll = useSelector(selectResetAll);
        const first = useSelector(selectFirst);
        const router = useRouter();
        const popState = useSelector(selectPopState);
        const perPage = useSelector(selectPerPage);

        // const [popState, setPopState]

        function pushStateData(el) {
            const sParam = router.query.s ? `s=${router.query.s}` : '';
            const idParam = router.query.id ? `id=${router.query.id}` : '';
            const categoryParam = router.query.category ? `category=${router.query.category}` : '';
            const thirdParam = router.query.third ? `third=${router.query.third}` : '';
            const query = `${router.pathname}?${idParam}${sParam && `${sParam}&`}${categoryParam && `&${categoryParam}`}${thirdParam && `&${thirdParam}`}${idParam && "&"}${el}`;
            router.push(query, undefined, {shallow: true});
        }


        let [r, setR] = useState(false);

        useEffect(() => {

            if (Number(router?.query?.page) > 1 || Object.keys(router?.query).length > (router?.query?.id ? 3 : 2) || (router?.query?.per_page && router?.query?.per_page !== perPage)) {

                dispatch(setFirst(true));
                dispatch(setLoading(true));
                console.log(productData.path)
                fetch(`${productData.path}?${search ? search : ""}json=true&per_page=${router?.query?.per_page || perPage}&page=${router?.query?.page || 1}${typeof router?.query["categories[]"] === 'string' ? `&categories%5B%5D=${Number(router?.query["categories[]"])}` : router?.query["categories[]"] ? router?.query?.["categories[]"].map(el => `&categories%5B%5D=${Number(el)}`).join('') : ""}${typeof router?.query["brands[]"] === 'string' ? `&brands%5B%5D=${Number(router?.query["brands[]"])}` : router?.query["brands[]"] ? router?.query?.["brands[]"].map(el => `&brands%5B%5D=${Number(el)}`).join('') : ""}${router?.query?.min_price ? `&min_price=${Number(router?.query?.min_price)}` : ""}${router?.query?.max_price ? `&max_price=${Number(router?.query?.max_price)}` : ""}${typeof router?.query["option_values[]"] === 'string' ? `&option_values%5B%5D=${router?.query["option_values[]"]}` : router?.query["option_values[]"] ? router?.query?.["option_values[]"].map(el => `&option_values%5B%5D=${el}`).join('') : ""}${sale}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${loginToken.token || ""}`
                    },
                })
                    .then(res => res.json().then(res => {
                        console.log(res,"RES0")
                            setSelectPage(res.products.current_page);
                            dispatch(setPerPage(router?.query?.per_page || "12"));
                            dispatch(setShopCategory(res));
                            dispatch(setLoading(false));
                            dispatch(setResetAll(false));
                            setR(true);
                        }
                    ));
            }
        }, []);

        useEffect(() => {

            const handlePopState = () => {
                dispatch(setPopState(true));
                dispatch(setLoading(true));
                fetch(`${productData.path}${window.location.search}${window.location.search === "" ? "?json=true&per_page=12&page=1" : "&json=true"}${sale}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${loginToken.token || ""}`
                    },
                })
                    .then(res => res.json().then(res => {
                            window.scrollTo(0, 100)

                            const params = new URLSearchParams(window.location.search);
                            const queryObject = Object.fromEntries(params.entries());
                            setSelectPage(queryObject.page || 1);
                            dispatch(setPerPage(queryObject?.per_page || "12"));
                            dispatch(setShopCategory(res));
                            dispatch(setLoading(false));
                            dispatch(setFirst(false));

                        }
                    ));
            };
            window.addEventListener('popstate', handlePopState);

            // Cleanup
            return () => {
                window.removeEventListener('popstate', handlePopState);
            };
        }, [productData]);

        useEffect(() => {
            if (firstRender.current) {
                firstRender.current = false;
                return;
            }

            // if (!selectPaginate) {
            if (!resetAll) {
                if (!popState) {
                    if (!first) {
                        dispatch(setLoading(true));
                        fetch(`${productData?.path}?${search ? search : ""}json=true&per_page=${perPage}&page=${router?.query?.page || selectPage}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}${sale}`, {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json;charset=UTF-8",
                                Authorization: `Bearer ${loginToken.token || ""}`
                            },
                        })
                            .then(res => res.json().then(res => {

                                    if (res?.products?.last_page < selectPage) {
                                        setSelectPage(res?.products?.last_page)
                                        fetch(`${productData.path}?${search ? search : ""}json=true&per_page=${perPage}&page=${res.products.last_page}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}${sale}`, {
                                            method: 'GET',
                                            headers: {
                                                "Content-Type": "application/json;charset=UTF-8",
                                                Authorization: `Bearer ${loginToken.token || ""}`
                                            },
                                        })
                                            .then(res => res.json().then(res => {

                                                console.log(res,"RES1")

                                                    window.scrollTo(0, 100)
                                                    dispatch(setShopCategory(res));
                                                    pushStateData(`per_page=${perPage}&page=${res.products.last_page}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}`)
                                                    dispatch(setLoading(false));
                                                }
                                            ));
                                    } else if (r) {

                                        console.log(res,"RES2")

                                        window.scrollTo(0, 100)
                                        dispatch(setShopCategory(res));
                                        pushStateData(`per_page=${perPage}&page=${selectPage}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}`)
                                        dispatch(setLoading(false));
                                    } else {
                                        console.log(res,"RES3")

                                        dispatch(setShopCategory(res));
                                        // pushStateData(`per_page=${perPage}&page=${selectPage}`)
                                        dispatch(setLoading(false));
                                        setR(true)
                                    }


                                }
                            ));
                    }
                }
            }
            // } else {
            //     setSelectPaginate(false);
            // }


        }, [perPage, search, loginToken, filterBrands, filterAttribute, filterCategory, priceRange])

        const paginate = (e) => {
            // setSelectPaginate(true);
            dispatch(setLoading(true));
            fetch(`${productData.path}?${search ? search : ""}json=true&per_page=${perPage}&page=${e.selected + 1}${sale}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token || ""}`
                },
            })
                .then(res => res.json().then(res => {
                        setSelectPage(e.selected + 1)
                        if (filterBrands.length !== 0 || filterAttribute.length !== 0 || priceRange.length !== 0 || filterCategory.length !== 0) {
                            fetch(`${productData.path}?${search ? search : ""}json=true&per_page=${perPage}&page=${e.selected + 1}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}${sale}`, {
                                method: 'GET',
                                headers: {
                                    "Content-Type": "application/json;charset=UTF-8",
                                    Authorization: `Bearer ${loginToken.token || ""}`
                                },
                            })
                                .then(res => res.json().then(res => {
                                        window.scrollTo(0, 100)
                                        dispatch(setShopCategory(res));
                                        // dispatch(setShopFilters(res.filters));
                                        // dispatch(setShopProducts(res.products));
                                        pushStateData(`per_page=${perPage}&page=${e.selected + 1}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}`)
                                        dispatch(setLoading(false));
                                    }
                                ));
                        } else {
                            window.scrollTo(0, 100)
                            dispatch(setShopCategory(res));
                            // dispatch(setShopFilters(res.filters));
                            // dispatch(setShopProducts(res.products));
                            pushStateData(`per_page=${perPage}&page=${e.selected + 1}`)
                            dispatch(setLoading(false));
                        }
                    }
                ));

        }


        return (
            <nav className={`page-section ${addClass ? addClass : ''}`}>
                <ReactPaginate
                    pageCount={productData?.last_page}
                    forcePage={selectPage - 1}
                    breakLabel="..."
                    nextLabel=">"
                    previousLabel="<"
                    className="pagination"
                    pageClassName={`page-item`}
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
        );
    }
;

export default PaginationComp;

// import React, {useEffect, useRef, useState} from 'react';
// import ReactPaginate from "react-paginate";
// import {useDispatch, useSelector} from "react-redux";
// import {
//     selectFilterBrands,
//     selectFilterCategory,
//     selectPriceRange,
//     setShopCategory,
//     // setShopProducts,
//     setLoading,
//     // setShopFilters,
//     selectResetAll,
//     setResetAll,
//     setPriceRange,
//     setFilterBrands,
//     setFilterCategory,
//     setFilterAttribute, selectFilterAttribute, setPopState, selectPopState, selectFirst, setFirst
// } from "../../ReduxToolkit/Slices/ShopProductsSlice";
// import {useRouter} from "next/router";
// import {selectLoginToken} from "../../ReduxToolkit/Slices/LoginSlice";
// import {APICallUrl} from "../Constant";
// import useWindowDimensions from "../../Utils/useWindowDimensions";

// const PaginationComp = ({productData, addClass, sale, search,}) => {
//
//         const [selectPage, setSelectPage] = useState(1);
//         const firstRender = useRef(true);
//         const loginToken = useSelector(selectLoginToken);
//         const dispatch = useDispatch();
//         const filterBrands = useSelector(selectFilterBrands);
//         const filterAttribute = useSelector(selectFilterAttribute);
//         const filterCategory = useSelector(selectFilterCategory);
//         const priceRange = useSelector(selectPriceRange);
//         const resetAll = useSelector(selectResetAll);
//         const first = useSelector(selectFirst);
//         const router = useRouter();
//         const popState = useSelector(selectPopState);
//         const {Is_Focus, Is_Search} = useSelector((state) => state.CommonReducer);
//         function pushStateData(el) {
//             const sParam = router.query.s ? `s=${router.query.s}` : '';
//             const idParam = router.query.id ? `id=${router.query.id}` : '';
//             const categoryParam = router.query.category ? `category=${router.query.category}` : '';
//             const thirdParam = router.query.third ? `third=${router.query.third}` : '';
//             const query = `${router.pathname}?${idParam}${sParam && `${sParam}&`}${categoryParam && `&${categoryParam}`}${thirdParam && `&${thirdParam}`}${idParam && "&"}${el}`;
//             router.push(query, undefined, {shallow: true});
//         }
//
//
//         let [r, setR] = useState(false);
//
//
//         useEffect(() => {
//             if (Number(router?.query?.page) > 1 || Object.keys(router?.query).length > 3) {
//                 dispatch(setFirst(true));
//                 dispatch(setLoading(true));
//                 fetch(`${productData.path}?${search ? search : ""}json=true&per_page=12&page=${router?.query?.page}${typeof router?.query["categories[]"] === 'string' ? `&categories%5B%5D=${Number(router?.query["categories[]"])}` : router?.query["categories[]"] ? router?.query?.["categories[]"].map(el => `&categories%5B%5D=${Number(el)}`).join('') : ""}${typeof router?.query["brands[]"] === 'string' ? `&brands%5B%5D=${Number(router?.query["brands[]"])}` : router?.query["brands[]"] ? router?.query?.["brands[]"].map(el => `&brands%5B%5D=${Number(el)}`).join('') : ""}${router?.query?.min_price ? `&min_price=${Number(router?.query?.min_price)}` : ""}${router?.query?.max_price ? `&max_price=${Number(router?.query?.max_price)}` : ""}${typeof router?.query["option_values[]"] === 'string' ? `&option_values%5B%5D=${router?.query["option_values[]"]}` : router?.query["option_values[]"] ? router?.query?.["option_values[]"].map(el => `&option_values%5B%5D=${el}`).join('') : ""}${sale}`, {
//                     method: 'GET',
//                     headers: {
//                         "Content-Type": "application/json;charset=UTF-8",
//                         Authorization: `Bearer ${loginToken.token || ""}`
//                     },
//                 })
//                     .then(res => res.json().then(res => {
//                             setSelectPage(res.products.current_page)
//                             dispatch(setShopCategory(res));
//                             dispatch(setLoading(false));
//                             dispatch(setResetAll(false));
//                         }
//                     ));
//             }
//         }, []);
//
//
//         useEffect(() => {
//             // Function to execute when the back or forward button is clicked
//
//             const handlePopState = () => {

//                 dispatch(setPopState(true))
//                 dispatch(setLoading(true));// Full URL
//
//                 fetch(`${productData.path}${window.location.search}${window.location.search === "" ? "?" : ""}${sale}&json=true&per_page=12&page=${selectPage}`, {
//                     method: 'GET',
//                     headers: {
//                         "Content-Type": "application/json;charset=UTF-8",
//                         Authorization: `Bearer ${loginToken.token || ""}`
//                     },
//                 })
//                     .then(res => res.json().then(res => {
//                             window.scrollTo(0, 100)
//
//                             setSelectPage(res.products.current_page)
//                             dispatch(setShopCategory(res));
//                             dispatch(setLoading(false));
//                             dispatch(setFirst(false));
//
//                         }
//                     ));
//             };
//             window.addEventListener('popstate', handlePopState);
//
//             // Cleanup
//             return () => {
//                 window.removeEventListener('popstate', handlePopState);
//             };
//         }, [productData]);
//
//
//         useEffect(() => {
//             if (firstRender.current) {
//                 firstRender.current = false;
//                 return;
//             }
//
//             if (!resetAll) {
//                 if (!popState) {
//                     if (!first) {
//                         dispatch(setLoading(true));
//
//                         fetch(`${productData?.path}?${search ? search : ""}json=true&per_page=12&page=${selectPage}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}${sale}`, {
//                             method: 'GET',
//                             headers: {
//                                 "Content-Type": "application/json;charset=UTF-8",
//                                 Authorization: `Bearer ${loginToken.token || ""}`
//                             },
//                         })
//                             .then(res => res.json().then(res => {

//                                     if (res?.products?.last_page < selectPage) {
//                                         setSelectPage(res?.products?.last_page)
//                                         fetch(`${productData.path}?${search ? search : ""}json=true&per_page=12&page=${res.products.last_page}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}${sale}`, {
//                                             method: 'GET',
//                                             headers: {
//                                                 "Content-Type": "application/json;charset=UTF-8",
//                                                 Authorization: `Bearer ${loginToken.token || ""}`
//                                             },
//                                         })
//                                             .then(res => res.json().then(res => {

//                                                     window.scrollTo(0, 100)
//                                                     dispatch(setShopCategory(res));
//                                                     pushStateData(`per_page=12&page=${res.products.last_page}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}`)
//                                                     dispatch(setLoading(false));
//                                                 }
//                                             ));
//                                     }
//                                     if (r) {

//                                         window.scrollTo(0, 100)
//                                         dispatch(setShopCategory(res));
//                                         pushStateData(`per_page=12&page=${selectPage}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}`)
//                                         dispatch(setLoading(false));
//                                     }
//                                     dispatch(setShopCategory(res));
//                                     dispatch(setLoading(false));
//                                     setR(true)
//                                 }
//                             ));
//                     }
//
//                 }
//             }
//
//         }, [search, loginToken, filterBrands, filterAttribute, filterCategory, priceRange])
//
//         const paginate = (e) => {
//             dispatch(setLoading(true));
//             fetch(`${productData.path}?${search ? search : ""}json=true&per_page=12&page=${e.selected + 1}${sale}`, {
//                 method: 'GET',
//                 headers: {
//                     "Content-Type": "application/json;charset=UTF-8",
//                     Authorization: `Bearer ${loginToken.token || ""}`
//                 },
//             })
//                 .then(res => res.json().then(res => {
//                         setSelectPage(e.selected + 1)
//                         if (filterBrands.length !== 0 || filterAttribute.length !== 0 || priceRange.length !== 0 || filterCategory.length !== 0) {
//                             fetch(`${productData.path}?${search ? search : ""}json=true&per_page=12&page=${e.selected + 1}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}${sale}`, {
//                                 method: 'GET',
//                                 headers: {
//                                     "Content-Type": "application/json;charset=UTF-8",
//                                     Authorization: `Bearer ${loginToken.token || ""}`
//                                 },
//                             })
//                                 .then(res => res.json().then(res => {
//                                         window.scrollTo(0, 100)
//                                         dispatch(setShopCategory(res));
//                                         // dispatch(setShopFilters(res.filters));
//                                         // dispatch(setShopProducts(res.products));
//                                         pushStateData(`per_page=12&page=${e.selected + 1}${filterBrands?.join('')}${filterAttribute?.join('')}${priceRange?.join('')}${filterCategory?.join('')}`)
//                                         dispatch(setLoading(false));
//                                     }
//                                 ));
//                         } else {
//                             window.scrollTo(0, 100)
//                             dispatch(setShopCategory(res));
//                             // dispatch(setShopFilters(res.filters));
//                             // dispatch(setShopProducts(res.products));
//                             pushStateData(`per_page=12&page=${e.selected + 1}`)
//                             dispatch(setLoading(false));
//                         }
//                     }
//                 ));
//
//         }

//         const {width} = useWindowDimensions();
//
//         return (
//             <nav className={`page-section ${addClass ? addClass : ''}`}>
//                 <ReactPaginate
//                     pageCount={productData?.last_page}
//                     forcePage={selectPage - 1}
//                     breakLabel="..."
//                     nextLabel=">"
//                     previousLabel="<"
//                     className="pagination"
//                     pageClassName={`page-item `}
//                     pageLinkClassName="page-link"
//                     // onPageChange={handlePageClick}
//                     previousClassName="page-item"
//                     nextClassName="page-item"
//                     previousLinkClassName="page-link"
//                     nextLinkClassName="page-link"
//                     breakClassName="page-item"
//                     breakLinkClassName="page-link"
//                     pageRangeDisplayed={3}
//                     renderOnZeroPageCount={null}
//                     disabledClassName="d-none"
//                     onPageChange={(e) => paginate(e)}
//                 />
//             </nav>
//         );
//     }
// ;
//
// export default PaginationComp;
