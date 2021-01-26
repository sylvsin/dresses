import axios, { AxiosInstance } from "axios";
import React, { createContext, useCallback, useState, useEffect } from "react";
import { Dress } from "./DressContext";

export interface AppConfig {
  api?: AxiosInstance;
  products: Dress[];
}

interface Props {
  baseUrl: string
}

export const AppContext = createContext<AppConfig>({
    products: []
});

export const AppContextProvider: React.FC<Props> = ({ baseUrl, children }) => {
  const api = axios.create({
    baseURL: baseUrl,
  });

  const [products, setProducts] = useState<Dress[]>([]);
  
  const fetchProduct = useCallback(() => {
    if (api) {
      api
        .get("products")
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          setProducts(data);
          console.log(data);
        });
    }
  }, [api] );

  return <AppContext.Provider value={{ api, products }}>{children}</AppContext.Provider>;
};


