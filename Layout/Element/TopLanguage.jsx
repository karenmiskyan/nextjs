import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Language } from '../../Components/Constant';

const TopLanguage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const langData = [
    { LanuageName: 'English', lang: 'en-US' },
    { LanuageName: 'Franch', lang: 'fn' },
    { LanuageName: 'Spanish', lang: 'es' },
  ];
  return (
    <li>
      <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} color='primary' className='top-header-dropdown'>
        <DropdownToggle>
          <span>{Language} </span>
          <i className='fas fa-chevron-down'></i>
        </DropdownToggle>
        <DropdownMenu className='dropdown-menu-end' aria-labelledby='dropdownMenuLink'>
          {langData.map((data, i) => (
            <DropdownItem key={i}>
              <Link href={router.pathname} locale={data.lang} className='d-block'>
                {data.LanuageName}
              </Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </li>
  );
};

export default TopLanguage;
