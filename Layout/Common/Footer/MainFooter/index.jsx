import {useEffect, useState} from 'react';
import {Container, Row} from 'reactstrap';
import {getAPIData} from '../../../../Utils';
import ContactFooter from './ContactFooter';
import MenuFooter from './MenuFooter';
import GetTouch from './GetTouch';
import QuestionTabs from './QuestionTab';
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "../../../../ReduxToolkit/store";

const MainFooter = ({QuestionTab, footerLeft, footerCenter, footerRight, defImg}) => {
    const [getFooter, setGetFooter] = useState([]);



    return (
        <Container>
            <Row className='gy-4'>
                <ContactFooter getFooter={getFooter} defImg={defImg}  />
                <MenuFooter getFooter={getFooter} footerLeft={footerLeft} footerCenter={footerCenter}
                            footerRight={footerRight}/>
                <PersistGate loading={null} persistor={persistor}>
                    <GetTouch/>
                </PersistGate>
                {/*{QuestionTab ? <GetTouch />:  <QuestionTabs /> }*/}
            </Row>
        </Container>
    );
};
export default MainFooter;
