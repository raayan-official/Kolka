import React from 'react';
import Categorie1 from '../../assets/mehndi.jpg';
import Categorie2 from '../../assets/hand.jpg';
import Categorie3 from '../../assets/mehndi3.jpg';
import Categorie4 from '../../assets/balm.jpg';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    { name: 'Mehndi', path: 'mehndi', image: Categorie1 },
    { name: 'Cone', path: 'cone', image: Categorie2 },
    { name: 'Paper', path: 'paper', image: Categorie3 },
    { name: 'Box', path: 'box', image: Categorie4 },
  ];

  return (
    <div className="product__grid">
      {categories.map((category) => (
        <Link 
          to={`/categories/${category.path}`} 
          key={category.path} 
          className="categories__card">
        
            <img 
              src={category.image} 
              alt={category.name} 
              loading="lazy" 
            />
         
          <h4>{category.name}</h4>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
