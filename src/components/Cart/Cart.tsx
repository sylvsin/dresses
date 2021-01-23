import React, { useContext } from 'react';
import './Cart.css'
import { Fade } from "react-awesome-reveal";
import { DressContext } from '../../context/DressContext';
import formatCurrency from '../../util';
const Cart: React.FC = () => {
  const {cartItems, addToCart, decrementQuantity, removeFromCart} = useContext(DressContext);

  return (
    <div className="cart">
      <div className="cart-table">
        <div className="row cart-header"> 
          <span className="center">Product Image</span>
          <span className="center">Product Title</span>
          <span className="center">Product Action</span>
          <span className="center">Product Price</span>
          <span className="center">Increase Product</span>
          <span className="center">Decrease Product</span>
        </div>
      </div>

      <Fade direction="left">
            {cartItems.map((item, i) => {
              return(
                <div className="row" key={`${item._id}-${item.title}-${i}`}>
                      <div className="center">
                        <img src={item.image} alt={item.title} height="50px" width="50px"/> {" "}
                      </div>
                        <span className="center">{item.title}</span>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="remove-from-cart-button"
                        >
                          Remove
                        </button>
                      <span className="center">{item.count} x {formatCurrency(item.price)}</span>
                      <span onClick={() => addToCart(item)} className="center"><button className="quantity">+</button></span>
                      <span  onClick={() => decrementQuantity(item)} className="center"><button className="quantity">-</button></span>  
                </div>
              )
            })}
        
          <div className="row">
              {/* <span onClick={() => {setShowCheckout(true)}} className="proceed-button">Order</span> */}
              <span className="center">
                  Total: {" "}
                  <strong className="amount">
                      {
                          formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))
                      }
                  </strong>
              </span>
              <span className="center">
                <a href="/"><button className="add-new-product">Add New Product</button></a>
              </span>
          </div>
        </Fade>
    </div>
  );
}

export default Cart;
