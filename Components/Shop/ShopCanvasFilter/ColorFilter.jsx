import React, {useState} from 'react';
import {AccordionBody, AccordionHeader, AccordionItem} from 'reactstrap';
import {Color} from '../../Constant';

const ColorFilter = ({productData, categoryArray, setCategoryArray, addCategory}) => {
    // const dispatch = useDispatch();
    // const {color} = useSelector((state) => state.ProductFilter);
    const [colorArray, setColorArray] = useState([]);
    // useEffect(() => {
    // productData?.map((el) => setColorArray((prev) => Array.from(new Set([...prev, ...el?.colors]))));
    // }, [productData]);

    // const addColor = (elem) => {
    //     if (colorArray.includes(elem)) {
    //         setColorArray((prev) => prev.filter((color) => color !== elem));
    //     } else {
    //         setColorArray((prev) => [...prev, elem]);
    //     }
    // };
    return (
        <AccordionItem className='category-color'>
            <AccordionHeader targetId='2'>{Color}</AccordionHeader>
            <div id='collapseThree' className='accordion-collapse collapse show' aria-labelledby='headingThree'
                 data-bs-parent='#accordionExample'>
                <AccordionBody accordionId='2'>
                    <ul className='category-list'>
                        {productData?.value?.map((elem, i) => {
                                const isChecked = categoryArray?.some((brand) => brand === elem);
                                const wordsArray = elem.split(" ");
                                const joinedSentenceWithHyphen = wordsArray.join("");

                                return (
                                    <li
                                        className={`${isChecked ? 'active' : ''}`}
                                        key={i}>
                                        <a
                                            style={{backgroundColor: joinedSentenceWithHyphen}}
                                            // onClick={() => dispatch({type: 'COLORFILTER', payload: elem})}
                                            onClick={() => addCategory(elem)}
                                        >
                                            <i className='fas fa-check'></i>
                                        </a>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </AccordionBody>
            </div>
        </AccordionItem>
    );
};

export default ColorFilter;
