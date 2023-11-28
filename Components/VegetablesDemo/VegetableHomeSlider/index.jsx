import React, { useEffect, useRef, useState } from 'react';
import VegetablePoster from './VegetablePoster';
const VegetableHomeSlider = ({ slider }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);


  const {  nav2 } = state;
  return (
    <section className='pt-0 home-section home-section-6' style={{paddingBottom:"0"}}>
      <VegetablePoster nav2={nav2} slider1={slider1} slider={slider}/>
    </section>
  );
};
export default VegetableHomeSlider;
