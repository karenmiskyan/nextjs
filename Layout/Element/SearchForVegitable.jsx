import React from 'react';
import {Search} from 'react-feather';
import {useDispatch} from 'react-redux';
import SearchSuggestion from './SearchSuggestion';
import {useRouter} from "next/router";

const SearchForVegitable = ({
                                productData,
                                brandsData,
                                categoriesData,
                                Is_Focus,
                                onInputText,
                                divRef,
                                loading, setOnInputText, handleKeyUp
                            }) => {
    const router = useRouter();
    const dispatch = useDispatch();


    return (
        <div className={`search-box1 d-lg-block  ${onInputText.length > 1 && Is_Focus ? 'show' : ''}`}
             onClick={() => dispatch({type: 'IS_FOCUS', payload: true})}>
            <div ref={divRef}>
                <div className='the-basics input-group' style={{zIndex: "10"}}>
                    <input type='text' className='form-control typeahead' placeholder='Search a Product'
                        // onKeyPress={handleKeyPress}
                           value={onInputText}
                        // onChange={(e) => {
                        //     setOnInputText(e.target.value);
                        //     setTimeout(() => {
                        //         handleChange(e)
                        //     }, 300)
                        // }}
                           onKeyUp={handleKeyUp}
                           onChange={(e) => setOnInputText(e.target.value)}
                    />
                    <button className='input-group-text close-search theme-bg-color search-box'
                            disabled={onInputText.length <= 1}
                            onClick={() =>
                                onInputText.length > 1 && router.push(`/shop/?s=${onInputText}`)
                            }>
                        <Search/>
                    </button>
                </div>
                <SearchSuggestion productData={productData} brandsData={brandsData} categoriesData={categoriesData}
                                  onInputText={onInputText} loading={loading}
                                  divRef={divRef} Is_Focus={Is_Focus}/>
            </div>

        </div>
    );
};

export default SearchForVegitable;
