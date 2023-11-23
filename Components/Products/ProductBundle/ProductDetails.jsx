import React, {useEffect} from 'react';
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../../ReduxToolkit/Slices/LoginSlice";

const ProductDetails = ({singleProduct}) => {


    // let count = singleProduct?.branchs?.filter(el => Number(el.value) > 0).length;
    const count = singleProduct?.branches?.map(el => Number(el.qty)).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch({type: 'IS_FOCUS', payload: false})
        dispatch({type: 'IS_SEARCH', payload: false});
    }, [singleProduct])

    let auth = useSelector(selectAuth);
    return (
        <div className='cloth-details-size'>
            <div className='details-image-concept'>
                <h2>{singleProduct?.name}</h2>
            </div>
            <div style={{display: "flex"}}>
                <span style={{marginLeft: "2px"}}>({singleProduct?.reviews_count} reviews)</span>
            </div>

            <div className="details-info-section">
                <div><span className="font-light ml-1">By: <Link
                    href={`/${singleProduct?.brand?.slugable?.prefix}/${singleProduct?.brand?.slugable?.key}`}>{singleProduct?.brand?.name}</Link></span>
                </div>
                <div><span className="font-light ml-1">Model</span> <span
                    className="font-bold ml-1"># {singleProduct?.sku}</span></div>
                <div><span className="font-light ml-1">Part Number</span> <span
                    className="font-bold ml-1"># {singleProduct?.eclipse_number}</span></div>
            </div>
            <div style={{
                width: "100%",
                display: "block",
                paddingBottom: "16px",
                marginBottom: "30px",
                borderBottom: "2px solid  #F1CBCC"
            }}>
                <div><span className="font-light ml-1">Weight</span> <span
                    className="font-bold ml-1">{singleProduct?.dimensions?.weight} lbs</span>
                </div>

                {
                    singleProduct?.dimensions?.height || singleProduct?.dimensions?.length || singleProduct?.dimensions?.wide ?
                        <div><span className="font-light ml-1">Dimensions</span> <span
                            className="font-bold ml-1">: {singleProduct?.dimensions?.height} {`× ${singleProduct?.dimensions?.length}`} {`× ${singleProduct?.dimensions?.wide}`} in</span>
                        </div> : ""
                }

            </div>
            {
                !auth && count !== 0 && count !== undefined && count !== null &&
                <table style={{width: "100%"}} className="regions-table">
                    <tbody>
                    <tr>
                        <th><i className='fas fa-check' style={{color: "#8CC643", marginRight: "6px"}}></i>Stock
                            Availability ({count || 0})
                        </th>
                        <th style={{textAlign: "center"}}>Show Full List</th>
                    </tr>
                    {

                        singleProduct?.branches?.map((el, i) => {

                            return (
                                Number(el?.qty) !== 0 && <tr key={i}>
                                    <td>{el?.branch}</td>
                                    <td>{el?.qty}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            }

        </div>
    );
};

export default ProductDetails;
