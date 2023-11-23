import React from 'react';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { ButtontextData } from '../../../../Data/ButtonsData';
import { Btn } from '../../../AbstractElements';
import { ButtontextSizes } from '../../../Constant';

const ButtontextSize = () => {
  return (
    <Col sm='12'>
      <Card className='custome-card'>
        <CardHeader>
          <h3 className='font-weight-bold'>{ButtontextSizes}</h3>
        </CardHeader>
        <CardBody>
          <div className='btn-group-showcase'>
            {ButtontextData.map((elem) => {

              return (
                <Btn attrBtn={{ className: elem.class }} key={elem.id}>
                  {elem.btn}
                </Btn>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ButtontextSize;
