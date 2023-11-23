import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Globe } from 'react-feather';

const SelectLanguages = () => {
  const router = useRouter();

  const langData = [
    { LanuageName: 'English', lang: 'en-US' },
    { LanuageName: 'Franch', lang: 'fn' },
    { LanuageName: 'Spanish', lang: 'es' },
  ];
  return (
    <>
      <li className='onhover-dropdown small-dropdown'>
        <div className='cart-media'>
          <a href='#javascript'>
            <Globe />
          </a>
        </div>
        <div className='onhover-div profile-dropdown'>
          <ul>
            {langData.map((data, i) => (
              <li key={i}>
                <Link href={router.pathname} locale={data.lang} className='d-block'>
                  {data.LanuageName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </>
  );
};

export default SelectLanguages;
