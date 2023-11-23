import {Fragment, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {Container, Row} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
// import {useTranslation} from 'next-i18next';
import {getAPIData} from '../../Utils';
import {Menu} from '../../Components/Constant';
import useWindowDimensions from '../../Utils/useWindowDimensions';
import AddToHome from './AddToHome';
import ThreeBarToggle from './ThreeBarToggle';
import {Backdrop, CircularProgress} from "@mui/material";
import {useRouter} from "next/router";
import {toggleDivVisibility} from "../../ReduxToolkit/Slices/LoginSlice";

const NavBar = ({customClass, mainMenu}) => {

    // const {t} = useTranslation('common');

    const {width} = useWindowDimensions();

    const [check, setCheck] = useState(false);
    const divRef = useRef();
    const {overlay, TopMenuToggle} = useSelector((state) => state.ModalReducer);
    const dispatch = useDispatch();
    const router = useRouter();


    const handleClick = (e) => {
        dispatch({type: 'TOPMENUTOGGLE', payload: false});
        dispatch({type: 'OVERLAY', payload: false});
    };

    useEffect(() => {
        if (TopMenuToggle) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            document.body.style.overflow = 'auto'; // Allow scrolling
        }
    }, [TopMenuToggle]);

    useEffect(() => {
        dispatch({type: 'TOPMENUTOGGLE', payload: false});
        const handleOutsideClick = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                dispatch({type: 'TOPMENUTOGGLE', payload: false});
                dispatch({type: 'OVERLAY', payload: false});
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const sortedMenuNodes = [...mainMenu?.menu_nodes]?.sort((a, b) => a.position - b.position);

    return (
        <div className={`main-navbar ${TopMenuToggle ? 'nav-menu-overlay' : ''}`}>
            <div id='mainnav'>
                <ThreeBarToggle customClass={customClass}/>
                <ul className={`nav-menu `} style={{right: TopMenuToggle ? '0px' : '-410px'}} ref={divRef}>
                    <li className='back-btn d-xl-none' onClick={() => handleClick(false)}>
                        <div className='close-btn'>
                            {Menu}
                            <span className='mobile-back'>
                <i className='fa fa-angle-left'></i>
              </span>
                        </div>
                    </li>
                    {sortedMenuNodes?.map((menu, i) => {
                        
                        return (
                            <li className="dropdown" key={i}>
                                {menu.child?.length > 0 ? (
                                    <a className="menu-title nav-link" style={{cursor:"pointer"}} onClick={()=>setCheck(!check)}>{menu.title}</a>
                                ) : (
                                    <Link
                                        href={menu?.url}
                                        className="nav-link"
                                        onClick={() => {
                                            handleClick(false)
                                            // router.asPath === `${menu.url}/` ? handleClick(false) : "";
                                        }}
                                    >
                                        {menu.title}
                                    </Link>
                                )}
                                {overlay &&
                                    <span className='according-menu' onClick={() => setCheck(!check)}>
                                            {menu?.child.length > 0 ? check ? '-' : '+' : ""}</span>}
                                {
                                    menu?.child.length > 0 &&
                                    <ul
                                        className='nav-submenu menu-content'
                                        style={{
                                            marginTop: "16px",
                                            display: overlay ? (check ? 'block' : 'none') : (menu?.child.length > 0 ? 'block' : "none"),
                                        }}>
                                        {menu?.child.map((result, i) => {
                                            return (
                                                <Fragment key={i}>
                                                    {result.url && (
                                                        <li>
                                                            <Link
                                                                href={`${result?.url}`}
                                                                onClick={() => {
                                                                    width < 1200 && dispatch({
                                                                        type: 'OVERLAY',
                                                                        payload: false
                                                                    });
                                                                    dispatch({type: 'TOPMENUTOGGLE', payload: false});
                                                                    router.asPath === `${result.url}/` ? handleClick(false) : "";
                                                                }}>
                                                                {result?.title}
                                                                {/*{result?.badge && <span>{result?.badge}</span>}*/}
                                                            </Link>
                                                        </li>
                                                    )}

                                                </Fragment>
                                            );
                                        })}
                                    </ul>
                                }

                            </li>
                        );
                    })}
                    <AddToHome/>
                </ul>
            </div>
        </div>
    );
};
export default NavBar;
