import {Heart, Settings} from 'react-feather';

const WishList = ({icon}) => {
    return (
        <li className='onhover-dropdown wislist-dropdown' >
            <div className='cart-media'>
                <div className='cart-icon'>{icon ? <Settings/> : <Heart/>}</div>
            </div>
            <div className='onhover-div'>
                <div className='wislist-empty'>
                    <i className='fab fa-gratipay'></i>
                    <h6 className='mb-1'>Your wislist empty !!</h6>
                    <p className='font-light mb-0'>explore more and shortlist items.</p>
                </div>
            </div>
        </li>
    );
};
export default WishList;
