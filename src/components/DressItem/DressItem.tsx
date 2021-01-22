import React from 'react';
import { Dress } from '../../context/DressContext';
import formatCurrency  from '../../util';
import './Product.css'

const DressItem: React.FC<{dress: Dress}> = ({dress}) => {
  return (
    <div className="product">
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

    </div>
  )
}

export default DressItem
