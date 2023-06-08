import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Cart from "./Cart";
import styles from "./cssComponents/productDetails.module.css";
import backBtn from "../photos/back.svg";
import SignIn from "./SignIn";
function ProductDetails() {
  const param = useParams();
  const [product, setProduct] = useState([]);
  const [sizeId, setSizeId] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeId, setSelectedId] = useState(null);
  const [visibilityCart, setVisiblityCart] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState("");
  const [authDiv, setAuthDiv] = useState(false);
  const navigate = useNavigate();

  function handleClickBack() {
    navigate(-1);
  }
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/ProductDetails/" + param.id)
      .then((response) => {
        setProduct(response.data.productDetails);
        setSizeId(response.data.productSize);
        setSelectedPicture(
          JSON.parse(response.data.productDetails.pictures)[0]
        );
        setSelectedId(response.data.productSize[0].product_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);
  function increase() {
    if (quantity <= product.quantity) {
      setQuantity(quantity + 1);
    }
  }
  function decrease() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }
  function handleSize(s) {
    setSelectedId(s);
  }
  function cartToggle() {
    if (!localStorage.getItem("user_id")) {
      setAuthDiv(true);
    } else {
      setVisiblityCart(true);
    }
  }
  return product.name ? (
    <>
      {selectedSizeId && visibilityCart ? (
        <Cart
          visibility={visibilityCart}
          setVisibility={setVisiblityCart}
          productId={selectedSizeId}
          quantity={quantity}
        />
      ) : (
        ""
      )}
      <div id={styles.spaceUp}></div>
      <span>
        <div id={styles.navigate}>
          <span
            onClick={() => navigate("/")}
            className={styles.firstNavigation}
          >
            Home
          </span>
          /{" "}
          <span onClick={() => navigate(-1)} className={styles.firstNavigation}>
            Products
          </span>
          / <span style={{ padding: "0 7px" }}>Details</span>
        </div>
      </span>
      <div>
        <div id={styles.container}>
          <div id={styles.picturesContain}>
            <div id={styles.sidePictures}>
              {JSON.parse(product.pictures).map((picture, index) => (
                <img
                  src={"http://127.0.0.1:8000/pictures/" + picture}
                  key={index}
                  onClick={() => setSelectedPicture(picture)}
                />
              ))}
            </div>
            <div id={styles.selectedImg}>
              <img
                src={"http://127.0.0.1:8000/pictures/" + selectedPicture}
                id={styles.img}
              />
            </div>
          </div>
          <div id={styles.detailsContainer}>
            <span id={styles.name}>{product.name}</span>
            <div>
              <span className={styles.titles}>price</span>
              <span id={styles.price}>{product.promotion > 0 ? (
                    <>
                      <p style={{marginBottom:'0'}}>{product.price-(product.price * (product.promotion / 100))} DH</p>
                      <p className={styles.priceAfterPromo}>{product.price} DH</p>
                    </>
                  ) : (
                    <p>{product.price} DH</p>
                  )}</span>
            </div>
            <div>
              <span className={styles.titles}>size</span>
              {sizeId.map((item) => (
                <span
                  key={item.product_id}
                  id={styles.size}
                  onClick={() => {
                    handleSize(item.product_id);
                  }}
                  style={{
                    border:
                      selectedSizeId === item.product_id
                        ? " solid 3px black"
                        : "solid 1px black",
                    color: selectedSizeId === item.product_id ? "black" : "solid 1px black",
                  }}
                >
                  {item.name_Size}
                </span>
              ))}
            </div>
            <div>
              <span className={styles.titles}>QUANTITY</span>
              <div id={styles.counter}>
                <button className={styles.btn} onClick={decrease}>
                  -
                </button>
                <div>{quantity}</div>
                <button className={styles.btn} onClick={increase}>
                  +
                </button>
              </div>
            </div>
            <div>
              <button id={styles.btnWishlist}>add to wishlist</button>
              <button id={styles.addCartBtn} onClick={cartToggle}>
                add to cart
              </button>
            </div>
          </div>
        </div>
        <div id={styles.description}>
          <span id={styles.descTitle}>description</span>
          <span id={styles.descContent}>{product.description}</span>
        </div>
      </div>
      <SignIn visibility={authDiv} setVisiblity={setAuthDiv} />
    </>
  ) : (
    ""
  );
}

export default ProductDetails;
