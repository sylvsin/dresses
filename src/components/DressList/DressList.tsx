import React, { useContext } from 'react';
import DressItem from '../DressItem/DressItem';
import Filter from '../Filter/Filter';
import { DressContext } from '../../context/DressContext';

const DressList: React.FC = () => {
  const { product } = useContext(DressContext)

  return (
    <div className="grid-container">
      <div className="filter-container">
        <Filter />
      </div>
      <div>
        <ul className="products">
          {
            product.map((dress, i) => {
              return(
                <DressItem dress={dress} key={`${dress._id}-${dress.title}-${i}`}/>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default DressList;
