import React from 'react';
import {useRouter} from "next/router";

const RightSide = () => {
    const router = useRouter();
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null;
    }

    return (
        <div className="our-community">
            <div className="our-community-single">
                <h2>JOIN OUR COMMUNITY</h2>
                <p>We are committed to providing our customers with the best products available. We
                    verify all applications and once your business has been approved, you can start
                    shopping. Please allow 2-3 business days for processing.</p>
            </div>
            <div className="our-community-single">
                <h4>About us</h4>
                <p>KOA EDI offers the most advanced, cutting-edge Security, Audio & Video and Home
                    Innovation Products for your business or home with a diverse selection of high
                    quality Video Surveillance Cameras from some of today's leading manufactures.</p>
                <h5 style={{cursor: "pointer"}} onClick={() => router.push("/about/")}>Learn More </h5>
            </div>
            {/*<div className="our-community-single">*/}
            {/*    <h4>Support</h4>*/}
            {/*    <p>KOA EDI offers the most advanced, cutting-edge Security, Audio & Video and Home*/}
            {/*        Innovation Products for your business or home with a diverse selection of high*/}
            {/*        quality Video Surveillance Cameras from some of today's leading manufactures.</p>*/}
            {/*    <h5 style={{cursor: "pointer"}} onClick={() => router.push("/contact-us/")}>Learn More </h5>*/}
            {/*</div>*/}
            {/*<div className="our-community-single">*/}
            {/*    <h4>Promotional Catalog</h4>*/}
            {/*    <p>KOA EDI offers the most advanced, cutting-edge Security, Audio & Video and Home*/}
            {/*        Innovation Products for your business or home with a diverse selection of high*/}
            {/*        quality Video Surveillance Cameras from some of today's leading manufactures.</p>*/}
            {/*    <h5 style={{cursor: "pointer"}}*/}
            {/*        onClick={() => openInNewTab("https://catalog.koaedi.com/cat/654465132687/")}>Learn More </h5>*/}
            {/*</div>*/}
        </div>
    );
};

export default RightSide;