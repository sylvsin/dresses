import { sign } from 'crypto';
import React, { ChangeEvent, createContext, useCallback, useContext, useEffect, useState } from 'react';
// import { products } from '../Data';
import { AppContext } from './AppContext';

export class Dress {
    _id!: number;
    image!: string;
    title!: string;
    description!: string;
    availableSizes!: string[];
    price!: number;
    count!: number;
    currentSize?: string
}

export interface CartItem {
  _id: number;
  size: string;
  count: number;
  price: number;
  title:string;
  image:string;
}

export interface Order{
  name:string
  email:string
  address:string
  cartItems:CartItem[]
  total:number
  _id:string
  createdAt:Date
  updatedAt:string
  size: string;
}

export interface IDressContext {
    products: Dress[];
    size: string;
    sort: string;
    sortDresses: (sort: any) => void;
    filterDresses: (size: any) => void;
    cartItems: CartItem[];
    incrementCartItem: (cartItem:CartItem)=>void,
    addToCart: (dress: Dress) => void;
    removeFromCart: (id: number) => void;
    decrementQuantity: (cartItem: CartItem) => void;
    order?: Order;
    createOrderItems: (item: any) => void;
    orders: Order[];
}

export const DressContext = createContext<IDressContext>({
    products: [],

    size: "",
    sort: "",
    incrementCartItem: (cartItem)=>{},
    sortDresses: (sort: any) => {},
    filterDresses: (size: any) => {},
    cartItems: [],
    addToCart: (dress: Dress) => {},
    removeFromCart: (id: number) => {},
    decrementQuantity: (cartItem: CartItem) => {},
    createOrderItems: (item: any) => {},
    orders: [],
});

const myDresses = () => {
  const localData = localStorage.getItem('cartItems');
  return localData ? JSON.parse(localData) : [];
}
const DressContextProvider: React.FC = ({children}) => {
    const [products, setProducts] = useState<Dress[]>([]);
    const [size, setSize] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [cartItems, setCartItems] = useState<CartItem[]>(myDresses);
    const { api } = useContext(AppContext);
    const [order, setOrder] = useState<Order>();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems]);

    const removeFromCart = (id: number) => {
      setCartItems(cartItems.filter(item => item._id !== id));
    }

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

    const incrementCartItem = useCallback((cartItem:CartItem)=>{
      const pos = cartItems.findIndex(item => item._id === cartItem._id && item.size===cartItem.size);
      if(pos!==-1){
        setCartItems([...cartItems.slice(0, pos), ...[{...cartItems[pos], count:cartItems[pos].count+1}], ...cartItems.slice(pos+1)]);
      }
  
    },[cartItems])

    let createOrderItems = (item: any) => {
      const order = {
          _id: item._id,
          name: item.name,
          email: item.email,
          address: item.address,
          cartItems: cartItems,
          size: size,
          total: cartItems.reduce((a,b) => a + b.price*b.count, 0),
      };
      createOrderItems2(order);   
    }

    const createOrderItems2 = (order:any) => {
      // alert("Need to save order for " + name);
      console.log("Sending data", order)
      if(api) {
        api
        .post("orders", order,{
          headers: {
              "Content-Type": "application/json"
          },
        })
      
        .then(res=>res)
        .then(data=>{
          console.log(data.data)
          setOrder(data.data)
          localStorage.clear();
        })}
    };

    const fetchOrders = useCallback(() => {
      if (api) {
        api
          .get("orders")
          .then((response) => {
            return response.data;
          })
          .then((data) => {
            setOrders(data);
            console.log(data);
          });
      }
    }, [api]);

    useEffect(()=>{
      fetchProduct()
    },[fetchProduct]);

    useEffect(() => {
      fetchOrders()
    }, [fetchOrders]);

    const sortDresses = ({target: { value }, 
    }: ChangeEvent<HTMLSelectElement>) => {
      
      if (value === "") {
        setSort(value);
      } else {
        setSort(value);
        setProducts(
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
        if(api){
          api
          .get("products")
          .then((response) => {
            return response.data;
          })
          .then((data) => {
            setProducts(data);
            console.log(data);
          });
          api.get('products').then(result=>result.data).then((products:Dress[])=>{
            setProducts(
              products.filter((dress) =>
                value === "ALL" ? true : dress.availableSizes.indexOf(value) >= 0
              )
            );
  
          })
        }
      }
    };

    const addToCart = (product: Dress) => {

      const doesExist = cartItems.find(item => item._id === product._id && item.size===product?.currentSize);
  
      if(!doesExist) {
        setCartItems([...cartItems, ...[{image:product.image,title:product.title,size:product.currentSize??"M", _id:product._id, price:product.price, count:1}]]);
      } else {
        const pos = cartItems.findIndex(item => item._id === product._id)
        if(pos!==-1)
        setCartItems([...cartItems.slice(0, pos), ...[{...cartItems[pos], count:cartItems[pos].count+1}], ...cartItems.slice(pos+1)]);
      }
    }

    const decrementQuantity = (product: CartItem) => {
      const pos = cartItems.findIndex(item => item._id === product._id && item.size===product.size)
        if(pos!==-1){
          const count = cartItems[pos].count-1 < 1 ? 1 : cartItems[pos].count-1
        setCartItems( [...cartItems.slice(0, pos), ...[{...cartItems[pos], count},], ...cartItems.slice(pos+1)]);
      }
    }


    return (
        <DressContext.Provider value={{incrementCartItem,products, sort, size, sortDresses, filterDresses, cartItems, addToCart, decrementQuantity, removeFromCart, order, createOrderItems, orders }}>
            {children}
        </DressContext.Provider>
    );
}

export default DressContextProvider;
