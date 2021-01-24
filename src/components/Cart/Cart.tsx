import React, { useContext, useState } from 'react';
import './Cart.css'
import { Fade } from "react-awesome-reveal";
import { DressContext } from '../../context/DressContext';
import formatCurrency from '../../util';
const Cart: React.FC = () => {
  const {cartItems, addToCart, decrementQuantity, removeFromCart} = useContext(DressContext);
  const [showCheckout, setShowCheckout] = useState<Boolean>(false);

  return (
    <div>
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
                <span onClick={() => {setShowCheckout(true)}} className="proceed-button">Order</span>
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

      <div>  
        {
          showCheckout && (
            <Fade direction="right">
              <div className="form-container">
                  {/* <form onSubmit={createOrder}> */}
                  <form>
                      <ul>
                          <li>
                              <label>Email</label>
                              <input
                                name="email" 
                                type="email" 
                                required
                                // value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                              ></input>
                          </li>
                          <li>
                              <label>Name</label>
                              <input 
                                name="name"
                                type="text" 
                                required
                                // value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                              ></input>
                          </li>
                          <li>
                              <label>Address</label>
                              <input 
                                name="address"
                                type="text" 
                                required
                                // value={address} onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                              ></input>
                          </li>
                          <li>
                              <button className="proceed-button" type="submit" style={{paddingRight: "14rem", fontSize: "20px"}}
                                // onClick={(product: any) => {isOpen(product);
                                //   setModalState(true)}}   
                              >
                                  Submit
                              </button>
                          </li>
                      </ul>

                  </form>
              </div>
            </Fade>
              
        )}
      </div>
    </div>
  );
}

export default Cart;
