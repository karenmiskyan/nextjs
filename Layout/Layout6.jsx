import React, {useEffect, useState} from 'react';
import Cookie1 from './Common/Cookie/Cookie1';
import ThemeCustomizer from './Common/Customizer';
import Footers from './Common/Footer';
import Header5 from './Common/Header/Header5';
import StarterLoader from './Common/Loader';
import TapTop from './Common/TapTop';

const Layout6 = ({children, mainMenu, data, footerLeft, footerCenter, footerRight}) => {
    const QuestionTab = true;
    const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
    useEffect(() => {
        setDefImg("");
    }, []);
    return (
        <>
            {/*<StarterLoader />*/}
            <Header5 mainMenu={mainMenu} defImg={defImg} />
            {children}
            {/*<ThemeCustomizer />*/}
            {/*<Cookie1 />*/}
            <TapTop/>
            <Footers QuestionTab={QuestionTab} defImg={defImg} data={data}
                     footerLeft={footerLeft} footerCenter={footerCenter} footerRight={footerRight}/>
        </>
    );
};
export default Layout6;
