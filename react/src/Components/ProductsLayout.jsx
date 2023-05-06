import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "./cssComponents/productsLayouts.module.css";
import Loading from "./loading";

function ProductsLayout() {
  const param = useParams();
  const [size, setSize] = useState("all");
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState("all");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("all");
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    if (param.type) {
      axios
        .get(`http://127.0.0.1:8000/api/${param.type}/${param.id}`)
        .then((response) => {
          if (response.data === "all") {
            setCategory("Products");
          } else {
            setCategory(response.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoading(false);
      setCategory(param.key);
    }
    axios.get("http://127.0.0.1:8000/api/size").then((response) => {
      setSizes(response.data);
    });
  }, [param]);
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleStock = (event) => {
    setStock(event.target.value);
  };
  return (
    <>
      <Loading loading={loading} />
      <div id={styles.spaceUp}></div>
      <span id={styles.title}>
        {category === "Products" ? "all" : ""}
        <span id={styles.titleCategory}>
          {param.key ? <div style={{ color: "black" }}>search by :</div> : ""}{" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {category}
          </div>
        </span>
      </span>
      <span id={styles.navigate}>
        <span onClick={() => navigate("/")} id={styles.firstNavigation}>
          Home
        </span>
        / <span style={{ padding: "0 7px" }}>Products</span>
      </span>
      <div></div>
      <div id={styles.containerGrid}>
        <div id={styles.leftFilter}>
          Filter :
          <select
            value={size}
            onChange={handleSizeChange}
            className={styles.filter}
          >
            <option value="all" disabled>
              Size
            </option>
            <option value="all">All</option>
            {sizes.map((size) => (
              <option key={size.size_id} value={size.size_id}>
                {size.name_Size}
              </option>
            ))}
          </select>
          <select
            name="price"
            value={price}
            className={styles.filter}
            onChange={handlePriceChange}
          >
            <option value="all" disabled>
              Price
            </option>
            <option value="all">All</option>
            <option value="0-500">0DH-500DH</option>
            <option value="500-1000">500DH-1000DH</option>
            <option value="1000-2000">1000DH-2000DH</option>
          </select>
          <select name="stock" value={stock} onChange={handleStock} className={styles.filter}>
            <option value="all" disabled>
              Stock
            </option>
            <option value="all">All</option>
            <option value="1">in Stock</option>
            <option value="0">out of Stock</option>
          </select>
        </div>
        <div>
          <Outlet context={[size,price,stock]} />
        </div>
      </div>
    </>
  );
}

export default ProductsLayout;
