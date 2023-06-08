import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./cssComponents/indexFirst.module.css";
import styles2 from "./cssComponents/indexSecond.module.css";
import styles3 from "./cssComponents/thirdSection.module.css";
import styles4 from "./cssComponents/fourthSection.module.css";

import "../Header.css";
import djalaba from "../photos/djalaba.jpg";
import tkchita from "../photos/tkchita.jpg";
import abaya from "../photos/abaya.jpg";
import card1 from  "../photos/card1.png"; 
import cardd3 from  "../photos/cardd3.png";
import card2 from  "../photos/card2.png";
import Heart from "../photos/Heart.svg";
import Flesh from '../photos/fleshShop.svg'
import Shipping from "../photos/Shipping.svg";
import Support from "../photos/Support.svg";
import Payment from "../photos/Pyment.svg";
import Gunic from "../photos/Gunic.svg"
import Bunic from "../photos/Bunic.svg"
import Guy from "../photos/indexGuy.svg"
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
        <img src={Guy} id={styles.bgGuy}alt="" />
        
        <div
          id={
            localStorage.getItem("transliton") === "ar"
              ? styles.ar
              : styles.headTxt
          }
        >
          <span>
          Street <br/>wears
            <div id={styles.subTitle}>High quality cool tshirts for street fashion</div>
            <Link
            to="/products/categories/categories/all"
            id={styles.discoverLink}
          >
            <button id={styles.discover}> <span id={styles.btnShoping}>Start shopping</span> <img src={Flesh} alt="" /></button>
          </Link>
          </span>
          
        </div>
        <img src={Gunic} id={styles.Gunic} alt="" />
        <img src={Bunic} id={styles.Bunic} alt="" />
      </section>

          <section id={styles2.second}>
            <main className={styles2.main}>
                <div className={`${styles2.card} ${styles2.box1}`}   >
                  <img className={styles2.img2} src={card2} alt="" />
                  <div className="card-content">
                    <h2 className={styles2.hh2}>
                      Card Heading
                    </h2>
                    <p className={styles2.pp1}>
                    voluptates cumque, veritatis atque nostrum corrupti 
                    </p>
                    <a href="#" className={styles2.button1}>
                      Find out more 
                      
                    </a>
                  </div>
                </div>
                <div className={`${styles2.card} ${styles2.box2}`}>
                  <img className={styles2.img2} src={card1} alt="" />
                  <div className={styles2.cardContent}>
                    <h2 className={styles2.hh2}>
                      Card Heading
                    </h2>
                    <p className={styles2.pp1}>
                    voluptates cumque, veritatis atquea odio aut hic.
                    </p>
                    <a href="#" className={styles2.button1}>
                      Find out more 
                      
                    </a>
                  </div>
                </div>
                <div className={`${styles2.card} ${styles2.box3}`}>
                  <img className={styles2.img2} src={cardd3} alt="" />
                  <div className={styles2.cardContent}>
                    <h2 className={styles2.hh2}>
                      Card Heading
                    </h2>
                    <p className={styles2.pp1}>
                    voluptates cumque, veritatis atque n Dicta odio aut hic.
                    </p>
                    <a href="#" className={styles2.button1}>
                      Find out more 
                      
                    </a>
                  </div>
                </div>
                <div className={`${styles2.card} ${styles2.box4}`}>
                  <img className={styles2.img2} src={cardd3} alt="" />
                  <div className={styles2.cardContent}>
                    <h2 className={styles2.hh2}>
                      Card Heading
                    </h2>
                    <p className={styles2.pp1}>
                    voluptates cumque, veritatis atque n Dicta odio aut hic.
                    </p>
                    <a href="#" className={styles2.button1}>
                      Find out more 
                      
                    </a>
                  </div>
                </div>
                <div className={`${styles2.card} ${styles2.box5}`}>
                  <img className={styles2.img2} src={cardd3} alt="" />
                  <div className="card-content">
                    <h2 className={styles2.hh2}>
                      Card Heading
                    </h2>
                    <p className={styles2.pp1}>
                    voluptates cumque, veritatis atque n Dicta odio aut hic.
                    </p>
                    <a href="#" className={styles2.button1}>
                      Find out more 
                      
                    </a>
                  </div>
                </div>
            </main>
          </section>

        {/* <h1 id="title">Categories</h1> */}
      {/* <section id={styles2.second}>
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
      </section> */}
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
