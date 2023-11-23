import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Btn } from '../../../Components/AbstractElements';

const DarkLight = () => {
  const [moonlight, setMoonlight] = useState(false);
  const dispatch = useDispatch();
  const MoonlightToggle = (light) => {
    const html = document.querySelector('html');
    if (light) {
      setMoonlight(!light);
      html.className = 'light';
      dispatch({ type: 'ISMODE', payload: 'light' });
    } else {
      setMoonlight(!light);
      html.className = 'dark';
      dispatch({ type: 'ISMODE', payload: 'dark' });
    }
  };
  return (
    <>
      <li onClick={() => MoonlightToggle(moonlight)}>
        <Btn
          attrBtn={{
            id: 'darkButton',
            color: 'light',
            className: 'dark-buttton',
            size: 'sm',
          }}>
          {moonlight ? 'Light' : 'Dark'}
        </Btn>
      </li>
    </>
  );
};
export default DarkLight;
