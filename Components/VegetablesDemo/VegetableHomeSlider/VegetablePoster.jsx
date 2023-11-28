import React, {Fragment, useEffect, useState} from 'react';
import Slider from 'react-slick';
import {MainHomeSlider} from '../../../Data/SliderSettingsData';
import {APIImage} from '../../Constant';
import Image from "next/image";

const VegetablePoster = ({nav2, slider1, slider}) => {

    const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
    useEffect(() => {
        setDefImg("");
    }, []);

    return (
        <div className='poster-image slider-for custome-arrow classic-arrow-1' style={{height: "100%"}}>
            <Slider
                style={{height: "100%"}}
                asNavFor={nav2}
                {...MainHomeSlider}
                ref={(slider) => (slider1.current = slider)}
            >
                {slider?.map((el, i) => {
                    return (

                        <div key={i} className="h-100">
                            {
                                el.link !== "" &&
                                <div style={{
                                    width: "100%",
                                    height: "100%",
                                    position: 'absolute',
                                    zIndex: "20",
                                    cursor: "pointer"
                                }}
                                     onClick={() => window.open(el?.link, '_blank')}/>
                            }

                            <Image height="350" width="1400"
                                   loading={i !== 0 ? "lazy" : "eager"} alt={i}
                                   src={defImg === "" ? `${APIImage}/${el?.image}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                   className="image-slider"

                            />
                            {
                                (el?.title || el?.content) && <Fragment>
                                    <div className='left-side-contain'>
                                        <div className='banner-left'>
                                            {
                                                el?.title && <h2>
                                                    {el?.title}
                                                </h2>
                                            }
                                            {
                                                el?.content &&
                                                <h3>
                                                    {el?.content}
                                                </h3>
                                            }
                                        </div>
                                    </div>
                                </Fragment>
                            }

                        </div>


                    );
                })
                }
            </Slider>
        </div>
    );
};

export default VegetablePoster;
