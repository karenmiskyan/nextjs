import React, {useEffect, useState} from 'react';
import {Accordion, UncontrolledAccordion} from 'reactstrap';
import BrandFilterDropdown from './BrandFilterDropdown';
import ColorFilter from './ColorFilter';
import PriceRange from './PriceRange';
import CategoryFilter from './CategoryFilter';
import DiscountRangeFilter from './DiscountRangeFilter';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {
    selectDelete, selectFilterCategory, selectPopState,
    selectResetAll,
    setFilterBrands,
    setFilterCategory, setLoading, setPopState, setPriceRange, setResetAll, setShopCategory
} from "../../../ReduxToolkit/Slices/ShopProductsSlice";
import CategoryFilterDropdown from "./CategoryFilterDropdown";

const FilterOptions = ({productData}) => {
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen('1');
        } else {
            setOpen(id);
        }
    };

    const [categoryArray, setCategoryArray] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();

    const delArray = useSelector(selectDelete);
    const resetAll = useSelector(selectResetAll);
    const popState = useSelector(selectPopState);

    useEffect(() => {
        if (resetAll) {
            setCategoryArray([])
        }
    }, [resetAll]);

    useEffect(() => {
        if (categoryArray.some((brand) => brand === delArray)) {

            setCategoryArray((prev) => prev.filter((brand) => brand !== delArray));
        }
    }, [delArray])


    useEffect(() => {

        if (typeof router?.query["option_values[]"] === 'string') {
            addCategory(router?.query["option_values[]"]);
        } else if (router?.query?.["option_values[]"]) {
            router?.query["option_values[]"].map(el => {
                addCategory(el);
            });
        }
    }, []);
    const addCategory = (elem) => {

        if (categoryArray.some((brand) => brand === elem)) {
            setCategoryArray((prev) => prev.filter((brand) => brand !== elem));
        } else {
            setCategoryArray((prev) => [...prev, elem]);
        }
    };


    useEffect(() => {
        // Function to execute when the back or forward button is clicked
        const handlePopState = () => {
            dispatch(setPopState(true))
            setCategoryArray([]);
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const queryObject = {};
            for (const [key, value] of params.entries()) {
                if (queryObject.hasOwnProperty(key)) {
                    queryObject[key] = Array.isArray(queryObject[key])
                        ? [...queryObject[key], value]
                        : [queryObject[key], value];
                } else {
                    queryObject[key] = value;
                }
            }

            if (typeof queryObject["option_values[]"] === 'string') {

                addCategory(queryObject["option_values[]"]);
                dispatch(setFilterCategory([`&option_values%5B%5D=${queryObject["option_values[]"]}`]));
            } else if (queryObject["option_values[]"]) {

                queryObject["option_values[]"].map(el => {
                    addCategory(el);

                });
                dispatch(setFilterCategory(queryObject["option_values[]"].map(el => `&option_values%5B%5D=${el}`)));
                // dispatch(setPopState(false))
            } else {
                dispatch(setFilterCategory([]));
            }
        };

        // Listen for popstate events
        window.addEventListener('popstate', handlePopState);

        // Cleanup
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);


    useEffect(() => {
        if (!popState) {

            dispatch(setFilterCategory(categoryArray.map(el => `&option_values%5B%5D=${el}`)));
        }

    }, [categoryArray]);

    const defaultOpenSections = router?.query["option_values[]"] ? typeof router?.query["option_values[]"] === 'string' ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'] : router?.query?.["option_values[]"].length !== 0 ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'] : ['1', '2', '3', '4'] : ['1', '2', '3', '4'];

    return (
        <Accordion open={open} className='category-name' toggle={toggle}>
            <UncontrolledAccordion
                defaultOpen={defaultOpenSections}
                stayOpen>
                {
                    productData?.brands &&
                    <BrandFilterDropdown productData={productData?.brands} title="Brands"/>
                }
                {
                    productData?.categories &&
                    <CategoryFilterDropdown productData={productData?.categories} title="Categories"/>
                }
                {/*{*/}
                {/*    productData?.options?.filter(el => el.option === "Color").length >0 &&*/}
                {/*    <ColorFilter productData={productData?.options?.filter(el => el.option === "Color")[0]}*/}
                {/*                 categoryArray={categoryArray} addCategory={addCategory}*/}
                {/*                 setCategoryArray={setCategoryArray}/>*/}
                {/*}*/}

                {
                    productData?.max_price !== productData?.min_price && <PriceRange productData={productData}/>
                }

                {
                    productData?.options?.filter(el => el.option !== "Color").map((el, i) => {
                        return (
                            <CategoryFilter productData={el} index={i} key={i} addCategory={addCategory}
                                            categoryArray={categoryArray} setCategoryArray={setCategoryArray}/>
                        )

                    })
                }

            </UncontrolledAccordion>
        </Accordion>
    );
};

export default FilterOptions;
