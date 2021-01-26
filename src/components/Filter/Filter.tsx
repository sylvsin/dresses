import React, { useContext } from 'react';
import { DressContext } from '../.././context/DressContext';
import './Filter.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const Filter: React.FC = () => {
  const {products, size, sort, sortDresses, filterDresses, cartItems } = useContext(DressContext);

  return (
    
    <div className="filter">
      <div className="filter-result">
        <strong>{products.length}</strong>{" "}
        Dresses
      </div>

      <div className="filter-sort">
          {" "}
          Order{" "}
          <select value={sort} onChange={sortDresses}>
              <option>Latest</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
          </select>
      </div>

      <div className="filter-size">
        Filter{" "}
        <select value={size} onChange={filterDresses}>
          <option>ALL</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>

      <div>
      {
        cartItems.length === 0? <div>
          <FontAwesomeIcon className="fas fa-cart-plus" icon='cart-plus'/> Cart is empty </div>
          :
          <div>
              <a href="/Cart/">
                <FontAwesomeIcon className="fas fa-cart-plus" icon='cart-plus'/>{" "}
                <button className="items-in-cart"> You have{" "}
                <strong> {cartItems.reduce((a, c) => a + c.count, 0)}{" "} 
                  items </strong> in Cart </button>
              </a>
          </div>
      } 
      </div>
    </div>  
    

  );
}

export default Filter;
