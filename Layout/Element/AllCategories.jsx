import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Btn} from '../../Components/AbstractElements';
import {PromotionalCatalog} from '../../Components/Constant';
import {useRouter} from "next/router";
import {selectAuth} from "../../ReduxToolkit/Slices/LoginSlice";

const AllCategories = ({isCategories}) => {

    const auth = useSelector(selectAuth);
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null;
    }


    return (
        <li className='category-menu onhover-dropdown wislist-dropdown' style={{marginLeft: "0"}}>

            <Btn
                attrBtn={{
                    className: 'btn-solid-default toggle-id d-sm-block black-button',
                    onClick: () => {
                        !auth ?
                            openInNewTab("https://catalog.koaedi.com/cat/697643645781587/") :
                            openInNewTab("https://catalog.koaedi.com/cat/654465132687/")
                    },
                }}>
                {PromotionalCatalog.toUpperCase()}
            </Btn>
            {/*<a href={pdfUrl} target="_blank" rel="noopener noreferrer"*/}
            {/*   className="btn-solid-default toggle-id d-sm-block black-button">*/}
            {/*    {PromotionalCatalog.toUpperCase()}*/}
            {/*</a>*/}

        </li>
    );
};
export default AllCategories;
