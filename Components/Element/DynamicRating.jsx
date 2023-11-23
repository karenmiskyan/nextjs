import React from 'react';

const DynamicRating = ({data, customeclass}) => {

    const arr = [1, 1, 1, 1, 1];
    return (
        <ul className={`rating ${customeclass}`}>
          {arr.map((el, i) => {
            if (i < data) {
              return (
                <li key={i}>
                  <i className='fas fa-star theme-color'></i>
                </li>
              );
            } else
              return (
                <li key={i}>
                  <i className='fas fa-star'></i>
                </li>
              );
          })}
        </ul>

            // <div className="rating-star-parent">
            //     <div className="rating-star-percent"
            //          style={{width: `${data / 5 * 100}% `}}/>
            // </div>

    );
};

export default DynamicRating;
