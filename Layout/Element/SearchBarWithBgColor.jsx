import {useRouter} from "next/router";
import {Search} from "react-feather";
import {useDispatch, useSelector} from "react-redux";

const SearchBarWithBgColor = ({customeClass}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const isLayout = router.pathname;
    var isBgColor = false;
    if (
        isLayout &&
        !isLayout.includes("fashion") &&
        !isLayout.includes("flower")
    ) {
        isBgColor = true;
    }
    const toggleSearch = () => {
        dispatch({type: "IS_SEARCH", payload: true});
        dispatch({type: "IS_FOCUS", payload: true});
    };
    return (
        <li onClick={() => toggleSearch()}>
            <div
                className={`search-box search-box-2 theme-bg-color ${
                    customeClass ? customeClass : ""
                }`}
            >
                <Search/>
            </div>
        </li>
    );
};
export default SearchBarWithBgColor;
