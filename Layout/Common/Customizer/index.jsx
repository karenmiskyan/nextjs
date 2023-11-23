import { Copy } from 'react-feather';
import { useDispatch } from 'react-redux';
import ColorSelect from './ColorSelect';
import DarkLight from './DarkLight';
import Direction from './Direction';

const ThemeCustomizer = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className='theme-setting'>
        <ul>
          <li className='copy-box' onClick={() => dispatch({ type: 'CONFIGMODAL' })}>
            <Copy />
          </li>
          <DarkLight />
          <Direction />
          <ColorSelect />
        </ul>
      </div>
    </>
  );
};
export default ThemeCustomizer;
