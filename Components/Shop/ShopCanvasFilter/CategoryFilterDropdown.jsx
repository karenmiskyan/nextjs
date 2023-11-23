import {useRouter} from 'next/router';
import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AccordionBody, AccordionHeader, AccordionItem, Input, Label} from 'reactstrap';
// import { Brand } from '../../Constant';
import {
    selectDelete, selectPopState,
    selectResetAll, setFilterAttribute,
    setFilterBrands,
    setFilterCategory, setFirst, setPopState
} from "../../../ReduxToolkit/Slices/ShopProductsSlice";

const CategoryFilterDropdown = ({productData, title}) => {
    const [brandsArray, setBrandsArray] = useState([]);
    const delArray = useSelector(selectDelete);
    const resetAll = useSelector(selectResetAll);
    const router = useRouter();
    const dispatch = useDispatch();
    const popState = useSelector(selectPopState);


    useEffect(() => {
        if (resetAll) {
            setBrandsArray([])
        }
    }, [resetAll]);

    useEffect(() => {
        if (brandsArray.some((brand) => brand.id === Number(delArray))) {
            setBrandsArray((prev) => prev.filter((brand) => brand.id !== Number(delArray)));
        }
    }, [delArray])


    useEffect(() => {
        if (!popState) {
            dispatch(setFilterAttribute(brandsArray.map(el => `&categories%5B%5D=${el.id}`)));
        }

    }, [brandsArray]);


    useEffect(() => {
        if (typeof router?.query["categories[]"] === 'string') {
            addBrand({id: Number(router?.query["categories[]"])});
        } else if (router?.query?.["categories[]"]) {
            router?.query["categories[]"].map(el => {
                addBrand({id: Number(el)});
            });
        }
    }, []);

    useEffect(() => {
        // Function to execute when the back or forward button is clicked
        const handlePopState = () => {
            dispatch(setPopState(true))
            setBrandsArray([]);
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

            if (typeof queryObject["categories[]"] === 'string') {
                addBrand({id: Number(queryObject["categories[]"])});
                dispatch(setFilterAttribute([`&categories%5B%5D=${queryObject["categories[]"]}`]));
            } else if (queryObject["categories[]"]) {
                queryObject["categories[]"].map(el => {
                    addBrand({
                        id: Number(el),
                    });
                });
                dispatch(setFilterAttribute(queryObject["categories[]"].map(el => `&categories%5B%5D=${el}`)));

            } else {
                dispatch(setFilterAttribute([]));
            }
        };

        // Listen for popstate events
        window.addEventListener('popstate', handlePopState);

        // Cleanup
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const addBrand = (elem) => {
        if (brandsArray.some((brand) => brand.id === elem.id)) {
            setBrandsArray((prev) => prev.filter((brand) => brand.id !== elem.id));
        } else {
            setBrandsArray((prev) => [...prev, elem]);
        }
    };

    return (
        <AccordionItem className='category-rating'>
            <AccordionHeader targetId='1'>{title}</AccordionHeader>
            <AccordionBody accordionId='1' className='category-scroll'>
                <ul className='category-list'>
                    {productData &&
                        productData.map((elem, i) => {
                            const isChecked = brandsArray?.some((brand) => brand?.id === elem?.id);
                            return (
                                <Fragment key={i}>
                                    {elem !== 'none' && (
                                        <li>
                                            <div className='form-check custome-form-check'>
                                                <Input
                                                    className='checkbox_animated check-it'
                                                    type='checkbox'
                                                    checked={isChecked}
                                                    onChange={() => {
                                                        dispatch(setFirst(false));
                                                        dispatch(setPopState(false));
                                                        addBrand(elem);
                                                    }}
                                                />
                                                <Label className='form-check-label'>
                                                    {elem.name}
                                                </Label>
                                                {/*<p className='font-light'>*/}
                                                {/*    ({elem?.products_count})*/}
                                                {/*</p>*/}
                                            </div>
                                        </li>
                                    )}
                                </Fragment>
                            );
                        })}
                </ul>
            </AccordionBody>
        </AccordionItem>
    );
};

export default CategoryFilterDropdown;