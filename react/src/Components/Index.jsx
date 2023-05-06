import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./cssComponents/indexFirst.module.css";
import styles2 from "./cssComponents/indexSecond.module.css";
import styles3 from "./cssComponents/thirdSection.module.css";
import styles4 from "./cssComponents/fourthSection.module.css";
import backgroudIndex from "../photos/backGroudIndex.jpg";
import "../Header.css";
import djalaba from "../photos/djalaba.jpg";
import tkchita from "../photos/tkchita.jpg";
import abaya from "../photos/abaya.jpg";
import Heart from "../photos/Heart.svg";
import Shipping from "../photos/Shipping.svg";
import Support from "../photos/Support.svg";
import Payment from "../photos/Pyment.svg";

function Index() {
  const [t, i18n] = useTranslation();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/category/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <section id={styles.first}>
        <div id={styles.overlay}></div>
        <img
          src={backgroudIndex}
          id={styles.bgIndex}
          style={
            localStorage.getItem("transliton") === "ar"
              ? { transform: "scaleX(-1)" }
              : {}
          }
        />
        <div
          id={
            localStorage.getItem("transliton") === "ar"
              ? styles.ar
              : styles.headTxt
          }
        >
          <span>
            {t("bigTitle.0")} <br /> {t("bigTitle.1")}
            <span id={styles.unique}>{t("bigTitle.2")}</span>
            <div id={styles.subTitle}>{t("subTitle")}</div>
          </span>
          <Link
            to="/products/categories/categories/all"
            id={styles.discoverLink}
          >
            <button id={styles.discover}>{t("discover")}</button>
          </Link>
        </div>
      </section>
      <section id={styles2.second}>
        {/* <h1 id="title">Categories</h1> */}
        <div className={styles2.container}>
          <div className={styles2.box1}>
            <span id={styles2.num1}>590+</span>
            <span id={styles2.desc1}>Products for you</span>
          </div>
          <div className={styles2.box2}>
            <div className={styles2.overlay}></div>
            <img
              src={djalaba}
              id={styles2.djalabaPic}
              className={styles2.img}
            />
            <span id={styles2.containerS1}>
              <span id={styles2.djalaba} className={styles2.catTitle}>
                DJALABA
              </span>
              <br />
              <b>New</b> collection
              <div className={styles2.spanDsc}>New Autumn arrivals 2023</div>
              <Link to="/products/categories/categories/1">
                <div id={styles2.shop}>
                  <button className={styles2.button}>view products</button>
                </div>
              </Link>
            </span>
          </div>
          <div className={styles2.box3}>
            <div className={styles2.overlay}></div>
            <img src={abaya} id={styles2.abayaPic} className={styles2.img} />
            <span id={styles2.containerS2}>
              <span id={styles2.abaya} className={styles2.catTitle}>
                abaya
              </span>
              <div>
                <b>New</b> categories
              </div>
              <div className={styles2.spanDsc}>fashion for this summer</div>
              <Link to="/products/categories/categories/5">
                <div id={styles2.shop2}>
                  <button className={styles2.button}>view products</button>{" "}
                </div>
              </Link>
            </span>
          </div>
          <div className={styles2.box4}>
            <div className={styles2.overlay}></div>
            <img
              src={tkchita}
              id={styles2.tkchitaPic}
              className={styles2.img}
            />
            <span id={styles2.containerS3}>
              <span id={styles2.takchita} className={styles2.catTitle}>
                takchita
              </span>
              <div>women Fashion</div>
              <div className={styles2.spanDsc}> Trandy look for every day</div>
              <Link to="/products/categories/categories/4">
                <div id={styles2.shop3}>
                  <button className={styles2.button}>view products</button>
                </div>
              </Link>
            </span>
          </div>
          <div className={styles2.box5}></div>
        </div>
        <button className={styles2.button}>Show more</button>
      </section>
      <section id={styles3.third}>
        <div id={styles3.titleThird}>Newest</div>
        <div className={styles3.container2}>
          {products !== undefined
            ? products.map((product) => (
                <div className={styles3.product} key={product.id}>
                  <div className={styles3.divImg}>
                    <Link to={`/productDetails/${product.id}`}>
                      {product.promotion > 0 ? (
                        <div className={styles3.promotionDiv}>
                          <span>-{product.promotion} %</span>
                        </div>
                      ) : (
                        ""
                      )}
                      <img
                        src={
                          "http://127.0.0.1:8000/pictures/" +
                          JSON.parse(product.picture)[0]
                        }
                      />
                    </Link>
                  </div>
                  <p id={styles3.category}>{product.category}</p>
                  <p className={styles.productName}>{product.name}</p>
                  {product.promotion > 0 ? (
                    <>
                      <p style={{marginBottom:'0'}}>{product.price-(product.price * (product.promotion / 100))} DH</p>
                      <p className={styles3.priceAfterPromo}>{product.price} DH</p>
                    </>
                  ) : (
                    <p>{product.price} DH</p>
                  )}
                  <ul>
                    {product.sizes.map((size, index) => (
                      <li key={index}>{size}</li>
                    ))}
                  </ul>
                </div>
              ))
            : ""}
        </div>
      </section>
      <section id={styles4.fourth}>
        <div>
          <img src={Shipping} />
          <div>
            <span className={styles4.LastTitle}>Shipping</span>
            <br />
            Delivery Everywhere In Morocco
          </div>
        </div>
        <div>
          <img src={Payment} />
          <div>
            <span className={styles4.LastTitle}>Flexible Payment</span>
            <br /> Cash On Delivery
          </div>
        </div>
        <div>
          <img src={Support} />
          <div>
            <span className={styles4.LastTitle}>Online Support</span> <br /> 24
            hours a day, 7 days a week
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;