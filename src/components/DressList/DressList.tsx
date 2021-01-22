import React from 'react';
import DressItem from '../DressItem/DressItem';
import Filter from '../Filter/Filter';

const DressList: React.FC = () => {
  return (
    <div className="">
        <Filter />
        <DressItem />
    </div>
  );
}

export default DressList;
