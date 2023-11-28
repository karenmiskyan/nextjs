import {Container, Row} from 'reactstrap';
import ContactFooter from './ContactFooter';
import MenuFooter from './MenuFooter';
import GetTouch from './GetTouch';
import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "../../../../ReduxToolkit/store";

const MainFooter = ({ footerLeft, footerCenter, footerRight, defImg}) => {


    return (
        <Container>
            <Row className='gy-4'>
                <ContactFooter  defImg={defImg}  />
                <MenuFooter  footerLeft={footerLeft} footerCenter={footerCenter}
                            footerRight={footerRight}/>
                <PersistGate loading={null} persistor={persistor}>
                    <GetTouch/>
                </PersistGate>
            </Row>
        </Container>
    );
};
export default MainFooter;
