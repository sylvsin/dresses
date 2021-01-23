import React, { useState } from 'react';
import { Dress } from '../../context/DressContext';
import formatCurrency  from '../../util';
import './Product.css';
import { Fade } from "react-awesome-reveal";

const DressItem: React.FC<{dress: Dress}> = ({dress}) => {
  
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
            
            <button>Add To Cart</button>
        </div>
      </Fade>
    </div>
  );
}

export default DressItem
