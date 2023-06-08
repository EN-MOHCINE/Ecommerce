import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import styles from "../Components/cssComponents/category.module.css";
import styles1 from './cssAdminComponents/products.module.css';
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import DeleteIcon from '../photos/delete.svg';
import Edit from '../photos/edit.svg';
import Stack from "@mui/material/Stack";
function Products() {
  const [size, price,stock,categorySelect,collectionSelect] = useOutletContext();
  const param = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [deletedProductId, setDeletedProductId] = useState(null);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const navigate = useNavigate();
 
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/allProducts/${size}/${price}/${stock}/${categorySelect}/${collectionSelect}?page=${page}`)
      .then((response) => {
        setProducts(response.data.data);
        setNumberOfPages(response.data.last_page);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [param, size, price, stock,categorySelect,collectionSelect, page, deletedProductId]);

  function navigatTo(p) {
    navigate(`/productDetails/${p}`);
  }
  function handleDelete(id) {
    axios.delete(`http://127.0.0.1:8000/api/product/${id}`)
    .then((response)=>{
      console.log(response.data)
      setDeletedProductId(id);
    })
  }
  function handleUpdate(id){
    navigate(`/adminPannel/updateProduct/${id}`)
  }
  return (
    <>
      {products?
      <Stack>
        <div id={styles.categories}>
          <div className={styles.containerGrid}>
          
            {products ? (
              products.map((product) => (
                <div className={styles.product} key={product.id}>
                  
                  <div className={`${styles.divImg} ${styles1.divImg}`}>
                  <div className={`${styles.overlay} ${styles1.overlay}` } >
                   <img
                    src={DeleteIcon}
                     className={styles1.icon}
                     onClick={() => handleDelete(product.id)}
                   />
                   <img
                   src={Edit}
                    className={styles1.icon}
                    onClick={() => handleUpdate(product.id)}
                  />
                 </div>
                  <img
                      src={
                        "http://127.0.0.1:8000/pictures/" +
                        JSON.parse(product.pictures)[0]
                      }
                    />
                  </div>
                  <p id={styles.categoryTitle}>{product.category}</p>
                  <p className={styles.productName}>{product.name}</p>
                  <p>{product.price} DH</p>
                  <ul>
                    
                      <li >{product.size}</li>
                    
                  </ul>
                </div>
              ))
            ) : (
              <h1>No product found</h1>
            )}
          </div >
          {products[0] && numberOfPages>1? (
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
      </Stack>:''}
    </>
  )
}

export default Products