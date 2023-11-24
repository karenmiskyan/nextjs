import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import {AutoFadeSliderNavData} from '../../../Data/SliderSettingsData';
import {APICallUrl,APIImage} from '../../Constant';
import ImageZoom from "../ZoomEffect";

const AutoFadeSlider = ({VideoPlay, singleProduct}) => {


    // const [state, setState] = useState({nav1: null, nav2: null});
    // const slider1 = useRef();
    // const slider2 = useRef();
    // const dispatch = useDispatch();
    //
    // useEffect(() => {
    //     setState({
    //         nav1: slider1.current,
    //         nav2: slider2.current,
    //     });
    // }, []);
    // const {nav1, nav2} = state;
    const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
    useEffect(() => {
        setDefImg("");
    }, []);
    const [image, setImage] = useState(`${APIImage}/${singleProduct?.image}`)
    useEffect(() => {
        setImage(`${APIImage}/${singleProduct?.image}`)
    }, [singleProduct])
    return (
        <div className='degree-section'>
            <div className='details-image ratio_asos'>
                <ImageZoom imageUrl={image} name={singleProduct?.name} defImg={defImg}/>
                {/*<ReactImageMagnify className="image-magnify" style={{zIndex: "999"}}*/}
                {/*                   enlargedImageContainerDimensions={{width: '170%', height: '140%'}}*/}
                {/*                   imageStyle={{maxWidth: "604px", maxHeight: "462px"}} {...{*/}
                {/*    smallImage: {*/}
                {/*        alt: 'Wristwatch by Ted Baker London',*/}
                {/*        isFluidWidth: true,*/}
                {/*        src: `${CommonPath}/empty-compare.png`,*/}
                {/*    },*/}

                {/*    largeImage: {*/}
                {/*        src: `${CommonPath}/empty-compare.png`,*/}
                {/*        width: 1200,*/}
                {/*        height: 1800*/}
                {/*    }*/}
                {/*}} />*/}
            </div>
            {/*{VideoPlay !== undefined ? (*/}
            {/*    <div className='image-360 videoplay-box' onClick={() => dispatch({type: 'YOUTUBEMODAL'})}>*/}
            {/*        <img src='https://img.icons8.com/ios/50/000000/circled-play.png' alt='image-360'/>*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    ''*/}
            {/*)}*/}

            <div className='details-image-option  mt-4 rounded overflow-hidden '>

                <Slider {...AutoFadeSliderNavData} style={{display: "flex"}} className="slick-custom"
                    // asNavFor={nav2} ref={(slider) => (slider1.current = slider)}
                >
                    {singleProduct && singleProduct?.images.length !== 1 &&
                        singleProduct?.images?.map((item, i) => {

                            return (

                                <div key={i}
                                     className="details-image-option-div"
                                     onClick={() => setImage(`${APIImage}/${item}`)}
                                >
                                    {
                                        <img src={defImg === "" ? `${APIImage}/${item}`: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                                             className='img-fluid' alt={item} title={item}/>
                                    }
                                </div>
                            );
                        })}
                </Slider>
            </div>
        </div>
    );
};

export default AutoFadeSlider;
