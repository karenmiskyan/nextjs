import Link from 'next/link';
import { useRouter } from 'next/router';
import { Col } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CommonPath, ShopNow } from '../../Constant';
import Img from '../../Element/Images';

const RightSideOffer = ({ MiddleBanner }) => {
  const router = useRouter();
  return (
    <Col lg='6' className='ratio2_1'>
      {MiddleBanner &&
        MiddleBanner.map((item) => {
          return (
            <div className='collection-banner p-right text-right' key={item.id}>
              <Link href={`/shop/shop_left_sidebar`} className='banner-img'>
                <Img src={`${CommonPath}/${item.leftbanner.image}`} className='bg-img' alt='collection' />
              </Link>
              <div className='banner-text'>
                <div className='banner-content'>
                  <span className='span-top'>
                    {item.leftbanner.topheadingleft} <span className='theme-color'>{item.leftbanner.topheadingright}</span>
                  </span>
                  <h2>
                    {item.leftbanner.heading}
                    <span className='theme-color'>{item.leftbanner.price}</span>
                  </h2>
                  <Btn
                    attrBtn={{
                      className: 'btn-solid-default',
                      onClick: () => router.push('/shop/shop_left_sidebar'),
                    }}>
                    {ShopNow}
                  </Btn>
                </div>
              </div>
            </div>
          );
        })}
    </Col>
  );
};
export default RightSideOffer;
