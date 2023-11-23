// import { useRouter } from 'next/router';
// import React, { Fragment, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { AccordionBody, AccordionHeader, AccordionItem, Input, Label } from 'reactstrap';
// import { setFilterBrands } from "../../../ReduxToolkit/Slices/ShopProductsSlice";
//
// const BrandFilterDropdown = ({ productData, title }) => {
//     const [brandsArray, setBrandsArray] = useState([]);
//
//     const router = useRouter();
//     const dispatch = useDispatch();
//
//     useEffect(() => {
//         dispatch(setFilterBrands(brandsArray.map(el => `&brand%5B%5D=${el.id}`)));
//     }, [brandsArray]);
//
//     useEffect(() => {
//         if (typeof router?.query["brand[]"] === 'string') {
//             addBrand({ id: Number(router?.query["brand[]"]) });
//         } else if (Array.isArray(router?.query?.["brand[]"])) {
//             const queryBrands = router.query["brand[]"].map(el => ({ id: Number(el) }));
//             setBrandsArray(queryBrands);
//         }
//     }, []);
//
//     const addBrand = (elem) => {
//         const updatedBrandsArray = Array.isArray(brandsArray) ? [...brandsArray] : [];
//         const index = updatedBrandsArray.findIndex((brand) => brand.id === elem.id);
//
//         if (index !== -1) {
//             updatedBrandsArray.splice(index, 1); // Remove brand from array if already exists
//         } else {
//             updatedBrandsArray.push(elem); // Add brand to array if it doesn't exist
//         }
//
//         setBrandsArray(updatedBrandsArray);
//
//         const queryBrands = updatedBrandsArray.map((brand) => brand.id); // Get the brand IDs
//
//         const query = new URLSearchParams(router.query); // Get the current URL query parameters
//
//         // Update the "brand[]" query parameter in the URL
//         query.delete('brand[]'); // Remove existing "brand[]" query parameter
//
//         queryBrands.forEach((brandId) => {
//             query.append('brand[]', brandId); // Append each brand ID to the "brand[]" query parameter
//         });
//
//         const newUrl = `${router.pathname}?${query.toString()}`; // Create the new URL
//
//         router.replace(newUrl, undefined, { shallow: true });
//     };
//
//     return (
//         <AccordionItem className='category-rating'>
//             <AccordionHeader targetId='1'>{title}</AccordionHeader>
//             <AccordionBody accordionId='1' className='category-scroll'>
//                 <ul className='category-list'>
//                     {productData &&
//                         productData.map((elem, i) => {
//                             const isChecked = brandsArray?.some((brand) => brand?.id === elem?.id);
//                             return (
//                                 <Fragment key={i}>
//                                     {elem !== 'none' && (
//                                         <li>
//                                             <div className='form-check custome-form-check'>
//                                                 <Input
//                                                     className='checkbox_animated check-it'
//                                                     type='checkbox'
//                                                     checked={isChecked}
//                                                     onChange={() => addBrand(elem)}
//                                                 />
//                                                 <Label className='form-check-label'>
//                                                     {elem.name}
//                                                 </Label>
//                                             </div>
//                                         </li>
//                                     )}
//                                 </Fragment>
//                             );
//                         })}
//                 </ul>
//             </AccordionBody>
//         </AccordionItem>
//     );
// };
//
// export default BrandFilterDropdown;
//
import {useRouter} from 'next/router';
import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AccordionBody, AccordionHeader, AccordionItem, Input, Label} from 'reactstrap';
import {
    selectDelete, selectPopState,
    selectResetAll,
    setFilterBrands, setFilterCategory, setFirst, setPopState
} from "../../../ReduxToolkit/Slices/ShopProductsSlice";

const BrandFilterDropdown = ({productData, title}) => {
    const [brandsArray, setBrandsArray] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const delArray = useSelector(selectDelete);
    const resetAll = useSelector(selectResetAll);
    const popState = useSelector(selectPopState);


    useEffect(() => {
        if (brandsArray.some((brand) => brand.id === Number(delArray))) {
            setBrandsArray((prev) => prev.filter((brand) => brand.id !== Number(delArray)));
        }

    }, [delArray])


    useEffect(() => {
        if (!popState) {
            dispatch(setFilterBrands(brandsArray.map(el => `&brands%5B%5D=${el.id}`)));
        }

    }, [brandsArray]);

    useEffect(() => {
        if (resetAll) {
            setBrandsArray([])
        }
    }, [resetAll]);


    const addBrand = (elem) => {
        if (brandsArray.some((brand) => brand.id === elem.id)) {
            setBrandsArray((prev) => prev.filter((brand) => brand.id !== elem.id));
        } else {
            setBrandsArray((prev) => [...prev, elem]);
        }
    };

    useEffect(() => {

        if (typeof router?.query["brands[]"] === 'string') {
            addBrand({id: Number(router?.query["brands[]"])});
        } else if (router?.query?.["brands[]"]) {
            router?.query["brands[]"].map(el => {
                addBrand({
                    id: Number(el),
                });
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
            if (typeof queryObject["brands[]"] === 'string') {

                addBrand({id: Number(queryObject["brands[]"])});
                dispatch(setFilterBrands([`&brands%5B%5D=${queryObject["brands[]"]}`]));
            } else if (queryObject["brands[]"]) {
                queryObject["brands[]"].map(el => {
                    addBrand({
                        id: Number(el),
                    });
                });
                dispatch(setFilterBrands(queryObject["brands[]"].map(el => `&brands%5B%5D=${el}`)));
                // dispatch(setPopState(false))
            } else {

                dispatch(setFilterBrands([]));

            }
        };

        // Listen for popstate events
        window.addEventListener('popstate', handlePopState);

        // Cleanup
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);



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

export default BrandFilterDropdown;