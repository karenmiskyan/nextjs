import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Btn } from '../../../Components/AbstractElements';
import { LTR, RTL } from '../../../Components/Constant';

const Direction = () => {
  const [isDir, setIsDir] = useState('ltr');
  const dispatch = useDispatch();
  const onHandleClick = (value) => {
    setIsDir(value);
    if (value === 'ltr') {
      localStorage.setItem('direction', 'ltr');
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
      document.documentElement.dir = 'ltr';
      document.getElementById('rtl-link').setAttribute('href', '/assets/css/bootstrap.min.css');
      dispatch({ type: 'ISDIRECTION', payload: 'ltr' });
    } else {
      localStorage.setItem('direction', 'rtl');
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
      document.documentElement.dir = 'rtl';
      document.getElementById('rtl-link').setAttribute('href', '/assets/css/bootstrap.rtl.min.css');
      dispatch({ type: 'ISDIRECTION', payload: 'rtl' });
    }
  };
  return (
    <li>
      {isDir === 'ltr' ? (
        <Btn
          attrBtn={{
            className: 'btn-sm rtl-button',
            // color: "btn-light",
            onClick: () => onHandleClick('rtl'),
          }}>
          {RTL}
        </Btn>
      ) : (
        <Btn
          attrBtn={{
            className: 'btn-sm rtl-button',
            // color: "btn-light",
            onClick: () => onHandleClick('ltr'),
          }}>
          {LTR}
        </Btn>
      )}
    </li>
  );
};
export default Direction;
