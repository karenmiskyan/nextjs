import Link from 'next/link';
import React from 'react';
import {CommonPath} from '../../Components/Constant';

const HeadingLogo = ({defImg}) => {

    return (
        <div className='brand-logo' style={{maxHeight:"44px"}}>
            <Link href={'/'}>
                {/*<svg className='svg-icon'>*/}
                {/*  <use className='fill-color' xlinkHref='/assets/svg/koalogo.png'></use>*/}
                {/*</svg>*/}
                <img
                    src={defImg === "" ? `/assets/svg/koalogowhite.svg` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                    width="130" height="44" style={{maxWidth: "130px", objectFit: "contain"}} className='img-fluid'
                    alt='logo'/>
            </Link>
        </div>
    );
};
export default HeadingLogo;
