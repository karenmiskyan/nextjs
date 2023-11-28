import React, {useEffect, useState} from 'react';
import Footers from './Common/Footer';
import Header5 from './Common/Header/Header5';
import TapTop from './Common/TapTop';

const Layout6 = ({children, mainMenu, data, footerLeft, footerCenter, footerRight}) => {
    const QuestionTab = true;
    const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
    useEffect(() => {
        setDefImg("");
    }, []);
    return (
        <>
            <Header5 mainMenu={mainMenu} defImg={defImg}/>
            {children}
            <TapTop/>
            <Footers QuestionTab={QuestionTab} defImg={defImg} data={data}
                     footerLeft={footerLeft} footerCenter={footerCenter} footerRight={footerRight}/>
        </>
    );
};
export default Layout6;
