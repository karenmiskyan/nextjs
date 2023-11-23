import Link from 'next/link';
import {useRouter} from 'next/router';
import {ShoppingCart, User} from 'react-feather';
import {APICallUrl, Logins, Pleasefillthename, Registers} from '../../Components/Constant';
import {firebase_app} from '../../Config/firebase';
import {Input, Label} from "reactstrap";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAuth, selectAuthUser,
    // selectAuth,
    selectLoginToken, selectOpenModal,
    setAuth,
    setLoginToken,
    setUser,
    signOut, toggleDivVisibility
} from "../../ReduxToolkit/Slices/LoginSlice";
import BeforeSignInAccount from "../../Components/Pages/UserDashboard/BeforeSignInAccount";
import AfterSignInAccount from "../../Components/Pages/UserDashboard/AfterSignInAccount ";
import useWindowDimensions from "../../Utils/useWindowDimensions";

const AdminUser = () => {
    const router = useRouter();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const auth = useSelector(selectAuth);
    const open = useSelector(selectOpenModal);
    const {width} = useWindowDimensions();


    const divRef = useRef();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                // dispatch(toggleDivVisibility(false));
                setIsCartOpen(false)
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    useEffect(() => {
        if (open) {
            setIsCartOpen(!isCartOpen);
        }
    }, [open])

    const isOpen = () => {
        setIsCartOpen(!isCartOpen);
    };

    useEffect(() => {
        if (isCartOpen && width < 768 || isCartOpen && auth) {
            document.body.style.overflow = 'hidden'; // Hide body overflow
        } else {
            document.body.style.overflow = 'visible'; // Restore body overflow
        }

    }, [isCartOpen, auth]);


    return (
        <li className={`onhover-dropdown account-dropbox cart-dropdown${isCartOpen ? !auth ? ' show-mobile' : " show" : ''}`}>
            <div className='cart-media become-partner'
                // ref={divRef}
                 onClick={() => {
                     auth ? setIsCartOpen(true) :
                         router.push("/my-account/")
                 }}>
                <User/>
                <p style={{margin: "0 0 0 8px"}}>
                    {auth ? "SIGN IN" : "MY ACCOUNT"}
                </p>
            </div>
            {auth !== false ?
                <BeforeSignInAccount isOpen={isOpen} divRef={divRef} setIsCartOpen={setIsCartOpen}/> :
                <AfterSignInAccount isOpen={isOpen} divRef={divRef} setIsCartOpen={setIsCartOpen}/>
            }
        </li>
    );
};
export default AdminUser;
