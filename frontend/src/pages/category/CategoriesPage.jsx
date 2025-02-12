import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from "../../data/productsData.json";
import ProductCarts from '../shop/ProductCarts';

const CategoriesPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [categoryName]);

  useEffect(()=>{
    window.scrollTo(0,0)
  })

  return (
    <>
    <section className="search__header">
     <h2 className='section__header capitalize'>{categoryName}</h2>
     <p className='section__subheader'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis veritatis distinctio neque!</p>
    </section>
{/* products cart*/}
<div className='section__container '>
<ProductCarts products={filteredProducts}/>
</div>
    </>
  );
};

export default CategoriesPage;
