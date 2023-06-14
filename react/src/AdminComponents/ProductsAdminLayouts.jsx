import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "../Components/cssComponents/productsLayouts.module.css";
import Loading from "../Components/loading";
import styles1 from './cssAdminComponents/ProductsAdminLayouts.module.css';
function ProductsAdminLayout() {
  const param = useParams();
  const [size, setSize] = useState("all");
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState("all");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("all");
  const [collectionName, setCollectionName] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);
  const [collectionSelect, setCollectionSelect] = useState('all');
  const [categorySelect, setCategorySelect] = useState('all');
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
    axios
      .get("http://127.0.0.1:8000/api/dropDownCollections")
      .then((response) => {
        setCollectionName(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("http://127.0.0.1:8000/api/dropDownCategories")
      .then((response) => {
        setCategoriesName(response.data);
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
  const handleCategory = (event) => {
    setCategorySelect(event.target.value);
  };
  const handleCollection = (event) => {
    setCollectionSelect(event.target.value);
  };
  return (
    <>
      <Loading loading={loading} />
      <div id={styles.spaceUp}></div>
      <span><Link to={'/adminPannel/addProduct'} id={styles1.addBtn}>ADD PRODUCT</Link></span>

      <div id={styles.containerGrid}>
        <div id={styles.leftFilter}>
          Filter :
          <select
            name="size"
            value={size}
            id="size"
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
            id="price"
            onChange={handlePriceChange}
            className={styles.filter}
          >
            <option value="all" disabled>
              Price
            </option>
            <option value="all">All</option>
            <option value="0-500">0DH-500DH</option>
            <option value="500-1000">500DH-1000DH</option>
            <option value="1000-2000">1000DH-2000DH</option>
          </select>
          <select name="stock" id="stock" value={stock} onChange={handleStock}  className={styles.filter}>
            <option value="all" disabled>
              Stock
            </option>
            <option value="all">All</option>
            <option value="1">in Stock</option>
            <option value="0">out of Stock</option>
          </select>
          <select name="category" id="category" value={categorySelect} onChange={handleCategory}  className={styles.filter}>
            <option value="all" disabled>
              Category
            </option>
            <option value="all">All</option>
            
            {categoriesName.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name_Category}
              </option>
            ))}
          </select>
          <select name="collection" id="collection" value={collectionSelect} onChange={handleCollection}  className={styles.filter}>
            <option value="all" disabled>
              Collection
            </option>
            <option value="all">All</option>
            {collectionName.map((collection) => (
              <option key={collection.collection_id} value={collection.collection_id}>
                {collection.collection_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Outlet context={[size,price,stock,categorySelect,collectionSelect]} />
        </div>
      </div>
    </>
  );
}

export default ProductsAdminLayout;
