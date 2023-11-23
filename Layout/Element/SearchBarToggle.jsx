import {useEffect, useRef, useState} from 'react';
import {Search, X} from 'react-feather';
import {useDispatch, useSelector} from 'react-redux';
import {Input, InputGroup} from 'reactstrap';
import {getAPIData} from '../../Utils';
import SearchSuggestion from './SearchSuggestion';
import {useRouter} from "next/router";

const SearchBarToggle = ({
                             setOnInputText,
                             productData,
                             brandsData,
                             categoriesData,
                             Is_Focus,
                             handleChange,
                             Is_Search,
                             onInputText,
                             loading, handleKeyPress, handleKeyUp
                         }) => {

    const dispatch = useDispatch();
    const divRef = useRef();


    const handleOutsideClick = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            dispatch({type: 'IS_SEARCH', payload: false});
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (Is_Search) {
            document.body.classList.add('body-hidden'); // Apply body-hidden class
        } else {
            document.body.classList.remove('body-hidden'); // Remove body-hidden class
        }
    }, [Is_Search]);


    return (
        <div className={`search-full${Is_Search ? ' open show' : ''}`}>
            <div style={{width: "100%"}}
                 ref={divRef}
            >
                <InputGroup>
        <span className='input-group-text'>
          <Search className='font-light'/>
        </span>
                    <Input type='text' className='search-type' placeholder='Search here..'
                           value={onInputText}
                           onKeyPress={handleKeyPress}
                        //        onChange={(e) => {
                        //            setOnInputText(e.target.value);
                        //
                        //            setTimeout(() => {
                        //                handleChange(e)
                        //            }, 300)
                        //        }}
                           onKeyUp={handleKeyUp}
                           onChange={(e) => setOnInputText(e.target.value)}
                    />
                    <span className='input-group-text close-search' onClick={() => {
                        // setOnInputText("");
                        // const fakeEvent = {
                        //     target: {value: ""}
                        // };
                        // handleChange(fakeEvent);
                        setOnInputText("")
                    }}>
          <X className='font-light'/>
        </span>
                </InputGroup>
                <SearchSuggestion productData={productData} brandsData={brandsData} categoriesData={categoriesData}
                                  onInputText={onInputText} Is_Focus={Is_Focus} loading={loading}/>
            </div>

        </div>
    );
};
export default SearchBarToggle;
