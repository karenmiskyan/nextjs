import React, {Fragment, useEffect, useState} from 'react';
import {
    APICallUrl,
    APIImage,
    bannerdescription,
    CommonPath,
    shopdescription,
    ShopNow,
    ShopTheLatestTrends
} from '../../Constant';
import Img from '../../Element/Images';
import {Btn} from "../../AbstractElements";

const ShopBannerDetails = ({shopCategory, defImg}) => {
    let [imageUrl, setImageUrl] = useState("")
    useEffect(() => {
        setImageUrl(`${APIImage}/${encodeURIComponent(shopCategory?.image)}`.replace(/%2F/g, '/'));
    }, [shopCategory])

    // imageUrl = imageUrl.replace(/%2F/g, '/');

    return (
        <>
            {
                encodeURIComponent(shopCategory?.image) !== "undefined" && shopCategory?.image !== null &&
                <div className='banner-deatils'>
                    <div className='banner-image'
                         // src={imageLoaded ? `${APICallUrl}/storage/${brand?.logo}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                         // src={defImg === "" ? `${APICallUrl}/storage/${el?.image}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}

                         style={{backgroundImage: `url(${defImg === "" ? imageUrl : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" })`}}>
                        <Img src={""}
                             width="800" height="300"
                             className='img-fluid bg-img' alt='fashion'/>
                        {/*<Fragment>*/}
                        {/*    <div className='category-banner-button' style={{*/}
                        {/*        position: "absolute",*/}
                        {/*        bottom: "6%",*/}
                        {/*        right: "2.5%",*/}
                        {/*    }}>*/}
                        {/*        <Btn*/}
                        {/*            attrBtn={{*/}
                        {/*                className: 'btn-solid-default ',*/}
                        {/*                onClick: () => router.push('/shop/shop_left_sidebar'),*/}
                        {/*            }}>*/}
                        {/*            {ShopNow}*/}
                        {/*        </Btn>*/}
                        {/*    </div>*/}
                        {/*</Fragment>*/}
                    </div>
                </div>
            }

        </>

    );
};

export default ShopBannerDetails;
