import React, {useEffect, useRef, useState} from "react";
import {AlignLeft} from 'react-feather';
import {useDispatch} from 'react-redux';
import {Filter} from '../../Constant';
import {Btn} from '../../AbstractElements';
import SidebarFilter from "../ShopLeftSidebarContain/SidebarFilter";
import FilterOptions from "./FilterOptions";
import {BsFillFilterCircleFill} from "react-icons/bs";
import {Col, Row} from "reactstrap";

const FilterButton = ({productData, customClass}) => {
    // const dispatch = useDispatch();
    // const toggle = () => {
    //   dispatch({
    //     type: 'IS_OFFSET',
    //   });
    //   dispatch({
    //     type: 'OVERLAY',
    //     payload: false,
    //   });
    // };

    const [burgerShow, setBurgerShow] = useState(false);
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const menuRef = useRef();


    const handleScroll = () => {
        if (window.scrollY > 80) {
            setBurgerShow(true);
        } else {
            setBurgerShow(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const updateMenu = () => {
        setIsMenuClicked(true)
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuClicked(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef, isMenuClicked]);


    useEffect(() => {
        if (isMenuClicked) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [isMenuClicked]);


    return (
        <div className="filter">
            <div className={`menu ${isMenuClicked ? "visible" : "hidden"}`}>

                <div className="filter-items" style={isMenuClicked ? {left: "0"} : {left: "-1000px"}} ref={menuRef}>
                       <span className='d-block' style={{textAlign: "end", cursor: "pointer"}}
                             onClick={() => setIsMenuClicked(false)}>
              <i className='fas fa-arrow-left back-cart'></i>
            </span>
                    <div className="item">
                        <SidebarFilter productData={productData}/>
                    </div>
                </div>
            </div>
            {
                burgerShow && <div className="filter-button">
                    <BsFillFilterCircleFill style={{color: "var(--theme-color)"}} onClick={updateMenu} size={34}/>
                </div>
            }

        </div>

    );
};

export default FilterButton;
