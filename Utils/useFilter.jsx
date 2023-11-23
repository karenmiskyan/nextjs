import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const useFilter = (products) => {
  const [filterProduct, setFilterProduct] = useState(products);
  const [work, setWork] = useState(false);
  const router = useRouter();
  const { brand, color, category, price, sorting, discount } = useSelector((state) => state.ProductFilter);
  const storedData = useSelector((state) => state.ProductFilter);
  const dispatch = useDispatch();
  const Data = router.query;
  var oldData = !!Object.keys(Data).length && JSON.parse(decodeURIComponent(Data.filterDetails));

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  useEffect(() => {
    oldData && !!oldData?.brand?.length && !arraysEqual(oldData?.brand, storedData?.brand) && dispatch({ type: 'BRAND', payload: oldData?.brand });
    oldData && !!oldData?.color?.length && !arraysEqual(oldData?.color, storedData?.color) && dispatch({ type: 'COLOR', payload: oldData?.color });
    oldData && !!oldData?.price?.length && !arraysEqual(oldData?.price, storedData?.price) && dispatch({ type: 'PRICEFILTER', payload: oldData?.price });
    oldData && !!oldData?.category?.length && !arraysEqual(oldData?.category, storedData?.category) && dispatch({ type: 'CATEGORY', payload: oldData?.category });
    oldData && !!oldData?.sortByType?.length && !arraysEqual(oldData?.sortByType, storedData?.sortByType) && dispatch({ type: 'SORTBYTYPE', payload: oldData?.sortByType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Data]);

  useEffect(() => {
    setFilterProduct(
      products
        ?.filter((product) => {
          let filterBrand = brand.length ? brand.includes(product.brand) : true;
          let filterCategory = category.length ? category.includes(product.type) || category.includes('All') : true;
          let filterColor = color.length ? color.map((item) => product.colors.includes(item)).includes(true) : true;
          let priceMatch = price ? price[0] <= product.price && price[1] >= product.price && true : true;
          let filterDiscount = discount.length ? product?.discount > discount : true;
          return filterBrand && filterColor && filterCategory && priceMatch && filterDiscount;
        })
        .sort((product1, product2) => {
          if (sorting === 'Price, High To Low') {
            return product2.price < product1.price ? -1 : 1;
          } else if (sorting === 'Price, Low To High') {
            return product2.price > product1.price ? -1 : 1;
          } else if (sorting === 'Alphabetically A-Z') {
            return product1.name < product2.name ? -1 : 1;
          } else if (sorting === 'Alphabetically Z-A') {
            return product1.name > product2.name ? -1 : 1;
          } else {
            return product2.price !== product1.price ? 1 : 1;
          }
        }),
    );
    work && router.push({ pathname: router.pathname, query: { filterDetails: encodeURIComponent(JSON.stringify(storedData)) } }, undefined, { shallow: true });
    setTimeout(() => {
      setWork(true);
    }, 2000);
  }, [brand, color, category, price, products, sorting, discount]);
  return filterProduct;
};

export default useFilter;
