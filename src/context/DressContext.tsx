import React, { ChangeEvent, createContext, useEffect, useState } from 'react';
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
    cartItems: Dress[];
    addToCart: (dress: Dress) => void;
    removeFromCart: (id: number) => void;
    decrementQuantity: (dress: Dress) => void;
     
}

export const DressContext = createContext<IDressContext>({
    product: products,
    size: "",
    sort: "",
    sortDresses: (sort: any) => {},
    filterDresses: (size: any) => {},
    cartItems: [],
    addToCart: (dress: Dress) => {},
    removeFromCart: (id: number) => {},
    decrementQuantity: (dress: Dress) => {},
});

const myDresses = () => {
  const localData = localStorage.getItem('cartItems');
  return localData ? JSON.parse(localData) : [];
}
const DressContextProvider: React.FC = ({children}) => {
    const [product, setProduct] = useState<Dress[]>(products);
    const [size, setSize] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [cartItems, setCartItems] = useState<Dress[]>(myDresses);

    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems]);

    const removeFromCart = (id: number) => {
      setCartItems(cartItems.filter(item => item._id !== id));
    }

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

    const addToCart = (product: Dress) => {

      const doesExist = cartItems.find(item => item._id === product._id);
  
      if(!doesExist) {
        setCartItems([...cartItems, ...[{...product, count:1}]]);
      } else {
        const pos = cartItems.findIndex(item => item._id === product._id)
        if(pos!==-1)
        setCartItems([...cartItems.slice(0, pos), ...[{...cartItems[pos], count:cartItems[pos].count+1}], ...cartItems.slice(pos+1)]);
      }
    }

    const decrementQuantity = (product: Dress) => {
      const pos = cartItems.findIndex(item => item._id === product._id)
        if(pos!==-1){
          const count = cartItems[pos].count-1 < 1 ? 1 : cartItems[pos].count-1
        setCartItems( [...cartItems.slice(0, pos), ...[{...cartItems[pos], count},], ...cartItems.slice(pos+1)]);
      }
    }


    return (
        <DressContext.Provider value={{ product, sort, size, sortDresses, filterDresses, cartItems, addToCart, decrementQuantity, removeFromCart, }}>
            {children}
        </DressContext.Provider>
    );
}

export default DressContextProvider;
