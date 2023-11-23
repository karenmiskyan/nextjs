import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SidebarFilter from "../Components/Shop/ShopLeftSidebarContain/SidebarFilter";
import {Btn} from "../Components/AbstractElements";
import {ArrowLeft} from "react-feather";
import {Close} from "../Components/Constant";

const Overlay = ({shopFilters}) => {
    const {overlay} = useSelector((state) => state.ModalReducer);
    const dispatch = useDispatch();
    const onHandleClick = () => {
        dispatch({type: 'OVERLAY', payload: false});
        dispatch({type: 'RESETOVERLAY'});
    };

    return(
        <div className={`bg-overlay${overlay ? ' show' : ''}`} onClick={() => onHandleClick()}>
        <div className='button-close mb-3'>
            <Btn attrBtn={{className: 'btn p-0'}}>
                <ArrowLeft/>
                {Close}
            </Btn>
        </div>
        <SidebarFilter productData={shopFilters}/>
    </div>

    )

};
export default Overlay;
