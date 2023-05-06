import axios from "axios";
import { dir } from "i18next";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckOut from "./CheckOut";
import styles from "./cssComponents/Cart.module.css";

function Cart(props) {
  const [refresh,setRefresh]=useState(1)
  const [productsCart, setProductsCart] = useState();
  const navigate=useNavigate()
  const Data = new FormData();
  Data.append("user_id", localStorage.getItem("user_id"));
  function increase(index) {
    const newProductsCart = [...productsCart];
    const product = newProductsCart[index];
    if (product.quantity < product.productQuantity) {
      product.quantity += 1;
      setProductsCart(newProductsCart);
    }
  }
  
  function decrease(index) {
    const newProductsCart = [...productsCart];
    const product = newProductsCart[index];
    if (product.quantity > 1) {
      product.quantity -= 1;
      setProductsCart(newProductsCart);
    }
  }
  if (props.productId) {
    Data.append("product_id", props.productId);
    Data.append("quantity", props.quantity);
  }
  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/api/Cart", Data)
      .then((response) => {
        setProductsCart(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.visibility ]);
  function deleteCart(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/Cart/${id}`)
      .then(() => {
        setProductsCart(
          productsCart.filter((product) => product.cart_id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function updateCart() {
    axios.patch('http://127.0.0.1:8000/api/Cart',{productsCart})
      .then(response=>{
        console.log(response.data);
      })
      .catch (error=>{
        console.log(error);
      });
  }
  return( <> {props.visibility ? 
    
    <div id={styles.CartOverlay}>
      <div id={styles.CartContainer}>
        <div id={styles.Header}>
          <p>Cart</p>
          <span onClick={() => {props.setVisibility(false);updateCart()}}>X</span>
        </div>
        <div id={styles.Body}>
          {productsCart
            ? productsCart.map((product, index) => (
                <div key={product.cart_id} className={styles.productDiv}>
                  <img
                    src={"http://127.0.0.1:8000/pictures/" + JSON.parse(product.picture)[0]}
                    className={styles.img}
                  />
                  <div className={styles.CartDetails}>
                    <div className={styles.titleAndClose}>
                      <span className={styles.productName}>{product.name}</span>{" "}
                      <span
                        className={styles.close}
                        onClick={() => deleteCart(product.cart_id)}
                      >
                        X
                      </span>
                    </div>
                    <div>
                      <span className={styles.sizeTitle}>size :</span>
                      <span>{product.size}</span>
                    </div>
                    <span className={styles.counterContainer}>
                      <div id={styles.counter}>
                        <button
                          className={styles.btn}
                          onClick={() => decrease(index)}
                        >
                          -
                        </button>
                        <div>{product.quantity}</div>
                        <button
                          className={styles.btn}
                          onClick={() => increase(index)}
                        >
                          +
                        </button>
                      </div>
                      <div className={styles.price}>{product.promotion > 0 ? (
                    <>
                      <p >{product.price-(product.price * (product.promotion / 100))} DH</p>
                      
                    </>
                  ) : (
                    <p>{product.price} DH</p>
                  )}</div>
                    </span>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <div id={styles.footer}>
          <div id={styles.priceDiv}>
            <span id={styles.totalText}>subtotal :</span>
            <span id={styles.totalNumber}>
              {" "}
              {productsCart
                ? productsCart.reduce(
                    (total, product) =>
                      total +( product.price-(product.price * (product.promotion / 100))) * product.quantity,
                    0
                  )
                : 0}{" "}
              DH
            </span>
          </div>
          
          <button onClick={()=>{props.setVisibility(false);updateCart();navigate('/checkout');setRefresh(refresh+1)}}>check out</button>
        </div>
      </div>
      
    </div>:''}</>)
    
    
  
}

export default Cart;
