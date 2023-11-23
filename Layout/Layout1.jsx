import ThemeCustomizer from './Common/Customizer';
import Cookie from './Common/Cookie';
import TapTop from './Common/TapTop';
import Footers from './Common/Footer/index';
import Header1 from './Common/Header/Header1';
import StarterLoader from './Common/Loader';

const Layout1 = ({ children, isCookie }) => {
  return (
    <>
      <Header1 />
      {children}
      <ThemeCustomizer />
      {isCookie === '/layout/fashion' || isCookie === '/' ? <Cookie /> : false}
      <TapTop />
      <Footers />
      <StarterLoader />
    </>
  );
};
export default Layout1;
