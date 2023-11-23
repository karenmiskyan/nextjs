import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { Prices } from '../../Constant';
import SortingFilter from './SortingFilter';

const FilterContent = ({ grid5, listGrid  }) => {
  const { price } = useSelector((state) => state.ProductFilter);
  const sortName = useSelector((state) => state.ProductFilter);
  const dispatch = useDispatch();

  return (
    <Row className='g-4' style={{margin:"10px 0",padding:"20px 0",backgroundColor:"white",borderRadius:"5px"}}>
      {/*<Col xs='12'>*/}
      {/*  <ul className='short-name'>*/}
      {/*    {sortName && (*/}
      {/*      <li>*/}
      {/*        <div className='label-tag'>*/}
      {/*          <span>*/}
      {/*            {Prices} : {price[0]} to {price[1]}*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </li>*/}
      {/*    )}*/}
      {/*    {sortName &&*/}
      {/*      Object.keys(sortName).map((elem, i) => (*/}
      {/*        <Fragment key={i}>*/}
      {/*          {elem !== 'price' &&*/}
      {/*            elem !== 'sorting' &&*/}
      {/*            elem !== 'discount' &&*/}
      {/*            sortName &&*/}
      {/*            sortName[elem].map((data, i) => (*/}
      {/*              <li key={i}>*/}
      {/*                <div className='label-tag'>*/}
      {/*                  <span>{data}</span>*/}
      {/*                  <Btn attrBtn={{ type: 'button', className: 'btn-close', onClick: () => dispatch({ type: elem.toUpperCase(), payload: data }) }}></Btn>*/}
      {/*                </div>*/}
      {/*              </li>*/}
      {/*            ))}*/}
      {/*        </Fragment>*/}
      {/*      ))}*/}
      {/*  </ul>*/}
      {/*</Col>*/}
      <SortingFilter sortName={sortName} grid5={grid5} listGrid={listGrid}  />
    </Row>
  );
};

export default FilterContent;
