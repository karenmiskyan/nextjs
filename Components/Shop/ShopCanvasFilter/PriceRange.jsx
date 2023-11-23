// import React, {useEffect, useState} from "react";
// import {getTrackBackground, Range} from "react-range";
// import {useDispatch, useSelector} from "react-redux";
// import {AccordionBody, AccordionHeader, AccordionItem, Button} from "reactstrap";
// import {Prices} from "../../Constant";
// import {
//     selectLoading,
//     selectPriceRange, selectResetAll, setFilterAttribute, setFirst,
//     setLoading, setPopState,
//     setPriceRange, setResetAll
// } from "../../../ReduxToolkit/Slices/ShopProductsSlice";
// import {useRouter} from "next/router";
// import {Backdrop, CircularProgress} from "@mui/material";
//
// const PriceRange = ({productData}) => {
//
//     const [values1, setValues1] = useState([]);
//     const [minMax, minMaxSet] = useState([]);
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const loading = useSelector(selectLoading);
//     const resetAll = useSelector(selectResetAll);
//
//
//     useEffect(() => {
//         if (Math.floor(productData?.min_price) !== minMax[0] || Math.ceil(productData?.max_price) !== minMax[1]) {
//                 setValues1([Math.floor(productData?.min_price), Math.ceil(productData?.max_price)]);
//                 minMaxSet([Math.floor(productData?.min_price), Math.ceil(productData?.max_price)]);
//
//         }
//     }, [productData])
//
//     useEffect(() => {
//         if (resetAll) {
//             setValues1([])
//             minMaxSet([])
//         }
//     }, [resetAll]);
//
//
//     useEffect(() => {
//         if (router?.query?.min_price) {
//             setValues1([Number(router?.query?.min_price), Number(router?.query?.max_price)]);
//             minMaxSet([Number(router?.query?.min_price), Number(router?.query?.max_price)]);
//             dispatch(setPriceRange([`&min_price=${Number(router?.query?.min_price)}`, `&max_price=${Number(router?.query?.max_price)}`]))
//         }
//
//     }, []);
//
//
//     useEffect(() => {
//         const handlePopState = () => {
//             dispatch(setPopState(true))
//
//             const search = window.location.search;
//             const params = new URLSearchParams(search);
//             const queryObject = {};
//             for (const [key, value] of params.entries()) {
//                 if (queryObject.hasOwnProperty(key)) {
//                     queryObject[key] = Array.isArray(queryObject[key])
//                         ? [...queryObject[key], value]
//                         : [queryObject[key], value];
//                 } else {
//                     queryObject[key] = value;
//                 }
//             }
//
//             if (queryObject.min_price) {
//                 setValues1([Number(queryObject.min_price), Number(queryObject.max_price)]);
//                 minMaxSet([Number(queryObject.min_price), Number(queryObject.max_price)]);
//                 dispatch(setPriceRange([`&min_price=${Number(queryObject.min_price)}`, `&max_price=${Number(queryObject.max_price)}`]))
//             } else {
//                 dispatch(setPriceRange([]))
//             }
//         };
//
//         window.addEventListener('popstate', handlePopState);
//
//         // Cleanup
//         return () => {
//             window.removeEventListener('popstate', handlePopState);
//         };
//     }, []);
//
//     const handleChange = (val) => {
//         dispatch(setFirst(false));
//         dispatch(setPopState(false));
//         setValues1(val);
//     };
//
//     const handleMouseUp = () => {
//         dispatch(setPriceRange([`&min_price=${values1[0]}`, `&max_price=${values1[1]}`]));
//     };
//
//     return (
//         <>
//             <AccordionItem className="category-price" style={{position: "relative"}}>
//                 <AccordionHeader targetId="3">{Prices}</AccordionHeader>
//                 <AccordionBody accordionId="3" style={{position: "relative"}}>
//                     {
//                         loading === true &&
//                         <Backdrop sx={{
//                             color: '#fff',
//                             position: "absolute",
//                             zIndex: (theme) => theme.zIndex.drawer + 1,
//                             backgroundColor: "rgba(255, 255, 255, 0.3)"
//                         }} open>
//                             <CircularProgress color="primary"/>
//                         </Backdrop>
//                     }
//
//                     <div
//                         className="range-category"
//                         style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             flexWrap: "wrap",
//                             margin: "1em",
//                         }}
//                     >
//                         <Range
//                             values={values1}
//                             step={1}
//                             min={minMax[0]}
//                             max={minMax[1] + 10}
//                             onPointerUp={handleMouseUp}
//                             onChange={(values) => handleChange(values)}
//                             renderTrack={({props, children}) => (
//                                 <div
//                                     // onMouseDown={props.onMouseDown}
//                                     // onTouchStart={props.onTouchStart}
//                                     onMouseUp={handleMouseUp}
//                                     onTouchEnd={handleMouseUp}
//
//                                     style={{
//                                         ...props.style,
//                                         height: "100px",
//                                         display: "flex",
//                                         width: "100%",
//                                     }}
//                                 >
//                                     <div
//                                         ref={props.ref}
//                                         style={{
//                                             height: "5px",
//                                             width: "100%",
//                                             borderRadius: "4px",
//                                             background: getTrackBackground({
//                                                 values: values1,
//                                                 colors: ["#b62427", "#b62427", "#b62427"],
//                                                 min: minMax[0],
//                                                 max: minMax[1],
//                                             }),
//                                             alignSelf: "center",
//                                         }}
//
//                                     >
//                                         {children}
//                                     </div>
//                                 </div>
//                             )}
//                             renderThumb={({index, props, isDragged}) => (
//                                 <div
//                                     {...props}
//                                     style={{
//                                         ...props.style,
//                                         height: "32px",
//                                         width: "32px",
//                                         borderRadius: "4px",
//                                         backgroundColor: "#b62427",
//                                         display: "flex",
//                                         justifyContent: "center",
//                                         alignItems: "center",
//                                         boxShadow: "0px 2px 6px #AAA",
//                                     }}
//                                 >
//                                     <div
//                                         style={{
//                                             position: "absolute",
//                                             top: "-35px",
//                                             color: "#fff",
//                                             fontWeight: "bold",
//                                             fontSize: "14px",
//                                             fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
//                                             padding: "4px",
//                                             borderRadius: "4px",
//                                             backgroundColor: "#b62427",
//                                         }}
//                                     >
//                                         {values1[index]}
//                                     </div>
//                                     <div
//                                         style={{
//                                             height: "16px",
//                                             width: "5px",
//                                             backgroundColor: isDragged ? "#b62427" : "#CCC",
//                                         }}
//                                     />
//                                 </div>
//                             )}
//                         />
//                     </div>
//                 </AccordionBody>
//             </AccordionItem>
//         </>
//
//     );
// };
//
// export default PriceRange;

import React, {useEffect, useState} from "react";
import {getTrackBackground, Range} from "react-range";
import {useDispatch, useSelector} from "react-redux";
import {AccordionBody, AccordionHeader, AccordionItem, Button} from "reactstrap";
import {Prices} from "../../Constant";
import {
    selectLoading,
    selectPriceRange, selectResetAll, setFilterAttribute, setFirst,
    setLoading, setPopState,
    setPriceRange, setResetAll
} from "../../../ReduxToolkit/Slices/ShopProductsSlice";
import {useRouter} from "next/router";
import {Backdrop, CircularProgress} from "@mui/material";
import CurrencyInput from "react-currency-input-field";
import formatMoney from "../../../Utils/monayFormat";

const PriceRange = ({productData}) => {

    const [values1, setValues1] = useState("");
    const [values2, setValues2] = useState("");
    const [minMax, minMaxSet] = useState([]);
    const dispatch = useDispatch();
    const router = useRouter();
    const loading = useSelector(selectLoading);
    const resetAll = useSelector(selectResetAll);

    useEffect(() => {
        if (Math.floor(productData?.min_price) !== minMax[0] || Math.ceil(productData?.max_price) !== minMax[1]) {
            // setValues1(Math.floor(productData?.min_price));
            // setValues2(Math.ceil(productData?.max_price));
            minMaxSet([Math.floor(productData?.min_price), Math.ceil(productData?.max_price)]);
        }
    }, [productData])

    useEffect(() => {
        if (resetAll) {
            setValues1("");
            setValues2("");
            minMaxSet([]);
        }
    }, [resetAll]);


    useEffect(() => {
        if (router?.query?.min_price) {
            // setValues1(Number(router?.query?.min_price));
            // setValues2(Number(router?.query?.max_price));
            minMaxSet([Number(router?.query?.min_price), Number(router?.query?.max_price)]);
            dispatch(setPriceRange([`&min_price=${Number(router?.query?.min_price)}`, `&max_price=${Number(router?.query?.max_price)}`]))
        }

    }, []);


    useEffect(() => {
        const handlePopState = () => {
            dispatch(setPopState(true))
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

            if (queryObject.min_price) {
                // setValues1(Number(queryObject.min_price));
                // setValues1(Number(queryObject.max_price));
                minMaxSet([Number(queryObject.min_price), Number(queryObject.max_price)]);
                dispatch(setPriceRange([`&min_price=${Number(queryObject.min_price)}`, `&max_price=${Number(queryObject.max_price)}`]))
            } else {
                dispatch(setPriceRange([]))
            }
        };

        window.addEventListener('popstate', handlePopState);

        // Cleanup
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    // const handleChange = (val) => {
    //     dispatch(setFirst(false));
    //     dispatch(setPopState(false));
    //     setValues1(val);
    // };
    //
    const handleMouseUp = () => {
        dispatch(setPriceRange([`&min_price=${values1 || minMax[0] || 0}`, `&max_price=${values2 || minMax[1] || 0}`]));
        setValues1("");
        setValues2("");
        dispatch(setFirst(false));
        dispatch(setPopState(false));
    };

    return (
        <>
            <AccordionItem className="category-price" style={{position: "relative"}}>
                <AccordionHeader targetId="3">{Prices}</AccordionHeader>
                <AccordionBody accordionId="3" style={{position: "relative"}} className="price-body">
                    <div className="price-body">
                        {/*<p>From:</p>*/}
                        {
                            loading === true &&
                            <Backdrop sx={{
                                color: '#fff',
                                position: "absolute",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                                backgroundColor: "rgba(255, 255, 255, 0.3)"
                            }} open>
                                <CircularProgress color="primary"/>
                            </Backdrop>
                        }
                        <CurrencyInput
                            className="price-input"
                            id="input-example"
                            name="input-name"
                            value={values1}
                            placeholder={`${formatMoney(minMax[0] || 1)}`}
                            decimalsLimit={2}
                            prefix="$"
                            maxLength={10}
                            onValueChange={(value, name) => setValues1(Number(value))}
                        />
                        {/*</div>*/}
                        {/*<div className="price-body">*/}
                        -
                        {/*<p>To:</p> */}
                        <CurrencyInput
                            className="price-input"
                            id="input-example"
                            name="input-name"
                            value={values2}
                            placeholder={`${formatMoney(minMax[1] || 1)}`}
                            decimalsLimit={2}
                            prefix="$"
                            maxLength={10}
                            onValueChange={(value, name) => setValues2(Number(value))}
                        />
                    </div>

                    <div className='product-buttons mt-3 mb-0' style={{margin: "0 6px"}}>
                        <button className='btn btn-solid hover-solid btn-animation'
                                style={{fontSize: "14px", padding: "2px 4px"}}
                                onClick={handleMouseUp}
                        >
                            Apply
                        </button>
                    </div>

                </AccordionBody>
            </AccordionItem>
        </>

    );
};

export default PriceRange;

