import React, { useContext } from 'react';
import DressItem from '../DressItem/DressItem';
import Filter from '../Filter/Filter';
import { DressContext } from '../../context/DressContext';
import './DressList.css';
import { Fade } from "react-awesome-reveal";

const DressList: React.FC = () => {
  const { products } = useContext(DressContext)

  return (
    <Fade direction="down">
      <div className="grid-container">
        <div className="filter-container">
          <Filter />
        </div>
        <div>
          <ul className="products">
            {
              products.map((dress, i) => {
                return(
                  <DressItem dress={dress} key={`${dress._id}-${dress.title}-${i}`}/>
                )
              })
            }
          </ul>
        </div>
      </div>
    </Fade>
  );
}

export default DressList;
