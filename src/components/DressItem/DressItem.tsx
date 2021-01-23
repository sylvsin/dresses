import React, { useContext, useState } from 'react';
import {DressContext, Dress } from '../../context/DressContext';
import formatCurrency  from '../../util';
import './Product.css';
import { Fade } from "react-awesome-reveal";

const DressItem: React.FC<{dress: Dress}> = ({dress}) => {
  const {addToCart} = useContext(DressContext);
  
  return (
    <div className="product">
      <Fade direction="down">
        <a href="#">
          <img src={dress.image} alt={dress.title} />
          <p>
              { dress.title }
          </p>
        </a>

        <div className="product-price">
            <div>
                { formatCurrency(dress.price) }
            </div>
            
            <button onClick={() => addToCart(dress)}>Add To Cart</button>
        </div>
      </Fade>
    </div>
  );
}

export default DressItem
