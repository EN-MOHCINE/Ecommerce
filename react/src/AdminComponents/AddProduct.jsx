import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./cssAdminComponents/addProduct.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [promotion, setPromotion] = useState(0);
  const [productPictures, setProductPictures] = useState([]);
  const [moreProductPictures, setMoreProductPictures] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [size_id, setSize_id] = useState("");
  const [collection_id, setCollection_id] = useState("");
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");
  const [data, setData] = useState();
  const [sizes, setSizes] = useState([]);
  const [collectionName, setCollectionName] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/size").then((response) => {
      setSizes(response.data);
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
    });
  }, []);

  const handleKeyDown = () => {
    if (value.trim() === '') {
      // Don't add an empty tag
      return;
    }
    setTags(tags => [...tags, { tag: value }]);
    setValue("");
    
  };
  function handleDelete(index) {

    setTags(tags.filter((tag, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      price,
      productPictures,
      description,
      quantity,
      category_id,
      size_id,
      collection_id,
      tags,
      promotion,
    };
    axios
      .post("http://127.0.0.1:8000/api/Product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };
  
  const handleSizeChange = (event) => {
    setSize_id(event.target.value);
  };const handleCollectionsChange = (event) => {
    setCollection_id(event.target.value);
  };const handleCategoriesChange = (event) => {
    setCategory_id(event.target.value);
    console.log(event.target.value)
  };
  return (
    <div id={styles.addProduct}>
      <div id={styles.spaceUp}></div>
      <div
        onSubmit={handleSubmit}
        id={styles.container}
      >
      <span id={styles.title}>Add Product</span>
        <label>
          NAME :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </label>
        <label>
          PRICE :
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input}
          />
        </label>
        <label id={styles.fileLabel}>
          PICTURE :
          <input
            type="file"
            onChange={(e) => setProductPictures(e.target.files)}
            multiple
            id={styles.inputFile}
          />
          <span id={styles.fileTitle}>chouse pictures</span>
        </label>
        <label>
          QUANTITY :
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={styles.input}
          />
        </label>
        <label>
          DESCRIPTION :
          <textarea
          cols='30'
          rows='50'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            className={styles.input}
          />
        </label>
        <label>
          Categories :
          <select
            name="category"
            id="category"
            onChange={handleCategoriesChange}
          >
            <option value="all" disabled>
              Category
            </option>
            {categoriesName.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name_Category}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="collection">
          Collection
          <select
            name="collection"

            id="collection"
            onChange={handleCollectionsChange}
          >
            <option value="" disabled>
              Select Collection
            </option>
            {collectionName.map((collection) => (
              <option key={collection.collection_id} value={collection.collection_id}>
                {collection.collection_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          SIZE :
          <select
            name="size"
            id="size"
            onChange={handleSizeChange}
          >
            <option value="all" disabled>
              Size
            </option>
            {sizes.map((size) => (
              <option key={size.size_id} value={size.size_id}>
                {size.name_Size}
              </option>
            ))}
          </select>
        </label>
        
          <label>
            TAGS:
            <div className="tagsContainer">
              {tags[0]?tags.map((tag, index) => (
                <div className={styles.tagsItem} key={index}>
                  <span className={styles.tag}>{tag.tag}</span>
                  <span className={styles.close} onClick={() => handleDelete(index)}>
                    &times;
                  </span>
                </div>
              )):''}
              <br />
              <input
                type="text"
                placeholder="enter some tags"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }} 
                className={styles.input}
              />
            </div>
            <button onClick={handleKeyDown} className={styles.btn}>add tag</button>
          </label>
          <label>
          PROMOTION :
          <input
            type="number"
            value={promotion}
            onChange={(e) => setPromotion(e.target.value)}
            className={styles.input}
          />
        </label>
        <button onClick={handleSubmit} className={styles.btn}>Add product</button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default AddProduct;
