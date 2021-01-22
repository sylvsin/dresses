import React, { createContext, useState } from 'react';
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
}

export const DressContext = createContext<IDressContext>({
    product: products,
});
const DressContextProvider: React.FC = ({children}) => {
    const [product, setProduct] = useState<Dress[]>(products);

    return (
        <DressContext.Provider value={{ product }}>
            {children}
        </DressContext.Provider>
    );
}

export default DressContextProvider;
