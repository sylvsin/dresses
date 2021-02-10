import React, { ChangeEvent, useContext, useState } from 'react';
import {DressContext, Dress } from '../../context/DressContext';
import formatCurrency  from '../../util';
import './Product.css';
import { Fade } from "react-awesome-reveal";
import Modal from 'react-modal'
import { join } from 'path';

const customStyles = {
  content : {
    top                   : "21.5rem",
    left                  : "52rem",
    right                 : "54rem",
    bottom                : "auto",
    width                 : "60%",
    height                : "50%",
    transform             : 'translate(-50%, -50%)'
  }
};

const DressItem: React.FC<{dress: Dress}> = ({dress}) => {
  const {addToCart} = useContext(DressContext);
  const [ product, setProduct ] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [choseSize, SetChoseSize] = useState<string>("");

  const isOpen = (product: any) => {
    setProduct(product);
  };

  const closeModal = ():void => {
      setProduct(product);
      setModalState(false)
  }

  const chosenSize = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    SetChoseSize(value);
  }
  
  return (
    <div className="product">
      <Fade direction="down">
        <a href="#" onClick={(product: any) => {isOpen(product);
            setModalState(true)}}
        >
          <img src={dress.image} alt={dress.title} />
        </a>
        <p className="product-title">
            <span>{ dress.title }</span> 
            <span> Sizes: 
                <select value={choseSize} onChange={chosenSize}>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
            </span>
        </p>

        <div className="product-price">
            <div>
                { formatCurrency(dress.price) }
            </div>
            
            <button onClick={() => addToCart({...dress, currentSize:choseSize})}>Add To Cart</button>
        </div>
      </Fade>
      
      {
        product && (
        <Modal
          isOpen={modalState}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
                
          <button className="close-modal" onClick={closeModal}>
            x
          </button>
          <div className="product-details">
            <img src={dress.image} alt={dress.title}></img>
            <div className="product-details-description">
              <p>
                <strong>{dress.title}</strong>
              </p>
              <p>{dress.description}</p>
              <p>
                Avaiable Sizes:{" "}
                {dress.availableSizes.map((x, i) => (
                  <span key={i}>
                    {" "}
                    <button className="button">{x}</button>
                  </span>
                ))}
              </p>
              <div className="product-price">
                <div>{formatCurrency(dress.price)}</div>
                <button
                  className="button primary"
                  onClick={() => {
                    // addToCart(dress);
                    closeModal();
                  }}
                >
                  {/* Add To Cart */}
                </button>
              </div>
            </div>
          </div>
        </Modal>
        )
      }
      
    </div>
  );
}

export default DressItem
