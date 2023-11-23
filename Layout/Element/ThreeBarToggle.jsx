import React from 'react';
import { useDispatch } from 'react-redux';
import {AiOutlineMenu} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";

const ThreeBarToggle = ({ customClass }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: 'TOPMENUTOGGLE',payload:true });
    dispatch({ type: 'OVERLAY',payload:true  });
  };
  return (
    <div className={`toggle-nav ${customClass ? customClass : ''}`} onClick={() => handleClick()}>
      <GiHamburgerMenu size={30}/>
    </div>
  );
};

export default ThreeBarToggle;
