import React, { useEffect, useState } from 'react';

const StarterLoader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const timeout = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => {
      // eslint-disable-next-line no-undef
      clearTimeout(timeout);
    };
  }, [show]);
  return (
    <>
      {show && (
        <div className='loading bar'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default StarterLoader;
