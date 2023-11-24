import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Slider from 'react-slick';
import {ShoesCategorySlider} from '../../../Data/SliderSettingsData';
import {APICallUrl,APIImage} from '../../Constant';
import {useRouter} from "next/router";

const CategoryCard = ({ShoesFilter, slug}) => {
        const {symbol, currencyValue} = useSelector((state) => state.CurrencyReducer);
        let router = useRouter()
    const [defImg, setDefImg] = useState("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=");
    useEffect(() => {
        setDefImg("");
    }, []);


        return (
            <div className='category-wrapper category-slider white-arrow'>
                <Slider {...ShoesCategorySlider} style={{display: "flex"}}>
                    {ShoesFilter?.map((elem, i) => {
                        return (
                            <div key={i}>
                                <div className='category-wrap category-color'
                                     style={{justifyContent: "center", margin: "0 8px"}}>
                                    <Link
                                        href={`${slug ? `/${slug}` : ""}/${router?.query?.id}${router?.query?.category ? `/${router?.query?.category}` : ""}/${elem?.slugable?.key}`}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            maxWidth: "200px",
                                            width: "100%",
                                            minHeight: "100px",
                                        }}>
                                            <img width="118" height="100"
                                                 src={defImg === "" ? `${APIImage}/${elem?.image}` : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
                                                 style={{maxHeight: "100px", objectFit:"contain"}}
                                                 className='img-fluid'
                                                 alt={elem?.name} title={elem?.name}/>
                                        </div>
                                        <h5 style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "10px",
                                            color: "black",
                                            fontWeight: "500"
                                        }}>{elem.name.length > 20 ? `${elem.name.substring(0, 19)}...` : elem.name}</h5>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        );
    }
;

export default CategoryCard;
