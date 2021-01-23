import React, { ChangeEvent, createContext, useState } from 'react';
import { products } from '../Data';

export class Dress {
    _id!: number;
    image!: string;
    title!: string;
    description!: string;
    availableSizes!: string[];
    price!: number;
    count!: number;
}

export interface IDressContext {
    product: Dress[];
    size: string;
    sort: string;
    sortDresses: (sort: any) => void;
    filterDresses: (size: any) => void; 
}

export const DressContext = createContext<IDressContext>({
    product: products,
    size: "",
    sort: "",
    sortDresses: (sort: any) => {},
    filterDresses: (size: any) => {},
});
const DressContextProvider: React.FC = ({children}) => {
    const [product, setProduct] = useState<Dress[]>(products);
    const [size, setSize] = useState<string>("");
    const [sort, setSort] = useState<string>("");

    const sortDresses = ({target: { value }, 
    }: ChangeEvent<HTMLSelectElement>) => {
      
      if (value === "") {
        setSort(value);
      } else {
        setSort(value);
        setProduct(
          products.slice().sort((a, b) => (
            value === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : value === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
              ? 1
              : -1
          ))
        );
      }
    };

    const filterDresses = ({
        target: { value },
      }: ChangeEvent<HTMLSelectElement>) => {
        // imp
        if (value === "") {
          setSize(value);
        } else {
          setSize(value);
          setProduct(
            products.filter((dress) =>
              value === "ALL" ? true : dress.availableSizes.indexOf(value) >= 0
            )
          );
        }
    }


    return (
        <DressContext.Provider value={{ product, sort, size, sortDresses, filterDresses, }}>
            {children}
        </DressContext.Provider>
    );
}

export default DressContextProvider;
