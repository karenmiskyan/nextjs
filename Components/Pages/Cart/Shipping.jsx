import React, {useEffect, useState} from 'react';
import {Label} from "reactstrap";
import {APICallUrl} from "../../Constant";
import {useDispatch, useSelector} from "react-redux";
import {
    selectLoginToken, selectShippingYups,
    setShippingAll,
    setShippingSing, setShippingYups,
    shippingAll,
    shippingSing, shippingYups
} from "../../../ReduxToolkit/Slices/LoginSlice";

const Shipping = ({zip, arr, title}) => {

    // let [shipping, setShipping] = useState([]);
    // const [selectedShipping, setSelectedShipping] = useState({});

    const loginToken = useSelector(selectLoginToken);
    const dispatch = useDispatch();
    const shipping = useSelector(shippingAll);
    const shippingYups = useSelector(selectShippingYups);
    const selectedShipping = useSelector(shippingSing);

    useEffect(() => {
        if (shipping.length === 0) {
            fetch(`${APICallUrl}/api/get-shippings`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                },
            })
                .then((res) => res.json()).then((res) => {
                dispatch(setShippingAll(res));
            })
                .catch((error) => {
                    console.error('Failed to get Shipping', error);
                });
        }

    }, []);
    useEffect(() => {
        if (zip.length > 0) {

            fetch(`${APICallUrl}/api/get-ups-shippings?zip_code=${zip}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${loginToken.token}`
                },
            })
                .then((res) => res.json()).then((res) => {


                if (res.length > 0) {
                    dispatch(setShippingSing({}));
                    dispatch(setShippingYups(res));
                } else {
                    dispatch(setShippingSing({}));
                    dispatch(setShippingYups([]));
                }
            })
                .catch((error) => {
                    console.error('Failed to get Shipping', error);
                });
        }


    }, [zip]);


    return (
        <>
            <h6 className='fw-bold shipping-info-for-cart'>
                Shipping:
                <ul>
                    {
                        arr?.shippingMethods?.length > 0 && arr?.shippingMethods?.map((el, i) => {
                            const handleCheckboxChange = () => {
                                dispatch(setShippingSing(el)); // Update the selected shipping option
                            };
                            const isChecked = selectedShipping.id === el.id;
                            return (
                                <li key={i}>
                                    <div
                                        className='form-check p-0 custome-form-check'>
                                        <input
                                            className='checkbox_animated check-it'
                                            type='checkbox' style={{top: "-2px"}}
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <Label className='form-check-label'
                                               style={{marginBottom: "0"}}>
                                            {el?.name}: ${el?.price}</Label>
                                        {/*<p className='font-light'>(25)</p>*/}
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
            </h6>
            {/*<h6 className='fw-bold shipping-info-for-cart'>*/}
            {/*    Shipping:*/}
            {/*    <ul>*/}
            {/*        {*/}
            {/*            shipping?.length > 0 && [...new Set([...shipping, ...(shippingYups || [])])]?.map((el, i) => {*/}
            {/*                const handleCheckboxChange = () => {*/}
            {/*                    dispatch(setShippingSing(el)); // Update the selected shipping option*/}
            {/*                };*/}
            {/*                const isChecked = selectedShipping.id === el.id;*/}
            {/*                return (*/}
            {/*                    <li key={i}>*/}
            {/*                        <div*/}
            {/*                            className='form-check p-0 custome-form-check'>*/}
            {/*                            <input*/}
            {/*                                className='checkbox_animated check-it'*/}
            {/*                                type='checkbox' style={{top: "-2px"}}*/}
            {/*                                checked={isChecked}*/}
            {/*                                onChange={handleCheckboxChange}*/}
            {/*                            />*/}
            {/*                            <Label className='form-check-label'*/}
            {/*                                   style={{marginBottom: "0"}}>*/}
            {/*                                {el?.name}: ${el?.price}</Label>*/}
            {/*                            /!*<p className='font-light'>(25)</p>*!/*/}
            {/*                        </div>*/}
            {/*                    </li>*/}
            {/*                )*/}
            {/*            })*/}
            {/*        }*/}

            {/*    </ul>*/}
            {/*</h6>*/}
            {
                selectedShipping?.type?.value === "based_on_location" &&
                <h6 className='fw-normal' style={{color: "#969696"}}>
                    Shipping to: <span className="fw-bold" style={{color: "black"}}>
                                                    7306 Coldwater Canyon Ave, North Hollywood, CA 91605</span>
                    <div className="fw-normal " style={{
                        textAlign: "end",
                        padding: "8px 0",
                        color: "var(--theme-color)",
                        textDecoration: "underline"
                    }}><a>Change Address</a></div>
                </h6>
            }
        </>

    );
};

export default Shipping;