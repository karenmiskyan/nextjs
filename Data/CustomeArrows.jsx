import React from 'react';
export const CustomeArrowNext = (props) => {
  const { onClick } = props;
  return (
    <div className='custom-arrow next' onClick={onClick}>
      <span>Next</span>
      <i className='fas fa-chevron-right ms-3'></i>
    </div>
  );
};
export const CustomeArrowPrev = (props) => {
  const { onClick } = props;
  return (
    <div className='custom-arrow prev' onClick={onClick}>
      <i className='fas fa-chevron-left me-3'></i>
      <span>Prev</span>
    </div>
  );
};
export const FlowerCustomeArrowNext = (props) => {

  const { onClick } = props;
  return (
    <div className='custom-arrow next' style={{display:"flex",alignItems:"center"}} onClick={onClick}>
      {/*<span>Next</span>*/}
      <i className='fas fa-chevron-right ms-3' style={props?.onClick === null ? {color:'#eff2f7'}:{color:"black",cursor:"pointer"}}></i>
    </div>
  );
};

export const FlowerCustomeArrowPrev = (props) => {


  const { onClick } = props;
  return (
    <div className='custom-arrow prev' style={{display:"flex",alignItems:"center"}} onClick={onClick}>
      <i className='fas fa-chevron-left me-3' style={props?.onClick === null ? {color:'#eff2f7'}:{color:"black",cursor:"pointer"}}></i>
      {/*<span>Prev</span>*/}
    </div>
  );
};
