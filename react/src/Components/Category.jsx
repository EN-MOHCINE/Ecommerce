import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import styles from "./cssComponents/category.module.css";
import { useOutletContext } from "react-router-dom";
import Heart from "../photos/Heart.svg";
import Bheart from "../photos/Bheart.svg";
import ProductsLayout from "./ProductsLayout";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loading from "./loading";

function Category() {
  const [size, price,stock] = useOutletContext();
  const param = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const navigate = useNavigate();
 
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/category/${param.id}/${size}/${price}/${stock}?page=${page}`)
      .then((response) => {
        setProducts(response.data);
        if (response.data[0]) {
          setNumberOfPages(response.data[0].all);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [param, size, price, stock, page]);

  function navigatTo(p) {
    navigate(`/productDetails/${p}`);
  }

  return (
    <>
      
      <Stack>
        <div id={styles.categories}>
          <div className={styles.containerGrid}>
            {products ? (
              products.map((product) => (
                <div className={styles.product} key={product.id}>
                  <div className={styles.overlay}>
                    <img src={Heart} className={styles.Heart} />
                    <button
                      className={styles.btnView}
                      onClick={() => navigatTo(product.id)}
                    >
                      view
                    </button>
                  </div>
                  <div className={styles.divImg} onClick={() => navigatTo(product.id)}>
                    {product.promotion>0?
                    <div className={styles.promotionDiv}>
                        <span>-{product.promotion} %</span>
                    </div>
                    :''}
                    <img
                      src={
                        "http://127.0.0.1:8000/pictures/" +
                        JSON.parse(product.picture)[0]
                      }
                    />
                  </div>
                  <p id={styles.categoryTitle}>{product.category}</p>
                  <p className={styles.productName}>{product.name}</p>
                  {product.promotion > 0 ? (
                    <>
                      <p style={{marginBottom:'0'}}>{product.price-(product.price * (product.promotion / 100))} DH</p>
                      <p className={styles.priceAfterPromo}>{product.price} DH</p>
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
            ) : (
              <h1>No product found</h1>
            )}
          </div >
          {products[0] ? (
            <Pagination
              count={numberOfPages}
              page={page}
              onChange={handleChange}
              id={styles.paginate}
            />
          ) : (
            ""
          )}
        </div>
      </Stack>
    </>
  );
}

export default Category;
