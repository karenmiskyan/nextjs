import { useRouter } from 'next/router';
import { Search } from 'react-feather';
import { useDispatch } from 'react-redux';
const SearchBar = () => {
  const dispatch = useDispatch();
  const toggleSearch = () => {
    dispatch({ type: 'IS_SEARCH' });
    dispatch({ type: 'IS_FOCUS' });
  };
  return (
    <li onClick={() => toggleSearch()}>
      <div className='search-box'>
        <Search />
      </div>
    </li>
  );
};
export default SearchBar;
