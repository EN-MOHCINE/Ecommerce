import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./cssAdminComponents/addProduct.module.css";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [promotion, setPromotion] = useState(0);
  const [productPictures, setProductPictures] = useState([]);
  const [moreProductPictures, setMoreProductPictures] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [category_idSelected, setCategory_idSelected] = useState("");
  const [size_idSelected, setSize_idSelected] = useState("");
  const [collection_idSelected, setCollection_idSelected] = useState("");
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
  const params = useParams();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/${params.id}`)
      .then((response) => {
  
        setData(response.data);
        setName(response.data[0].name);
        setSize_idSelected(response.data[0].size_id);
        setQuantity(response.data[0].quantity);
        setTags(response.data[0].tags);
        setDescription(response.data[0].description);
        setProductPictures(response.data[0].picture_path);
        setDescription(response.data[0].description);
        setPrice(response.data[0].price);
        setCategory_idSelected(response.data[0].category_id);
        setCollection_idSelected(response.data[0].collection_id);
        setPromotion(response.data[0].promotion)
      });
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
  }, [params.id]);

  const handleKeyDown = () => {
    var updatedTags = [...tags];
    if (updatedTags.length > 0) {
      const newTags = { tag: value };
      updatedTags.push(newTags);
    } else {
      const newTags = [{ tag: value }];
      updatedTags = newTags;
    }
    setTags(updatedTags);
    setValue("");
    console.log(tags);
  };
  function handleDelete(index) {
    setTags(tags.filter((tag, i) => i !== index));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      id: params.id,
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
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/product`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(response=>{
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
      });
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  const handleSizeChange = (event) => {
    setSize_id(event.target.value);
  };
  const handleCollectionsChange = (event) => {
    setCollection_id(event.target.value);
  };
  const handleCategoriesChange = (event) => {
    setCategory_id(event.target.value);
  };
  return (
    <div id={styles.addProduct}>
      <div id={styles.spaceUp}></div>
      <div
        onSubmit={handleSubmit}
        id={styles.container}
      >
        <span id={styles.title}>Update Product</span>
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
        <label>
          PICTURE :
          <input
            type="file"
            onChange={(e) => setProductPictures(e.target.files)}
            multiple
            className={styles.input}
          />
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
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
          />
        </label>
        <label>
          Categories :
          <div>default category:{categoriesName[0]
                ? 
                    categoriesName.find(
                      (category) => category.category_id === category_idSelected
                    ).name_Category
                  
                : ""}</div>
          <select name="category" id="size" onChange={handleCategoriesChange}>
            <option value="all" selected disabled>
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
          Collection:
          <div>default collection : {collectionName[0]
                ? 
                  collectionName.find(
                      collection => collection.collection_id === collection_idSelected
                    ).collection_name
                  
                : ""}</div>
          <select
            name="collection"
            id="collection"
            onChange={handleCollectionsChange}
          >
            <option value="" selected disabled>
              Select Collection
            </option>
            {collectionName.map((collection) => (
              <option
                key={collection.collection_id}
                value={collection.collection_id}
              >
                {collection.collection_name}
              </option>
            ))}
          </select>
        </label>

        <label>
        
          SIZE :
          <div>default size:{sizes[0]
                ?sizes.find((size) => size.size_id === size_idSelected).name_Size
                : ""}</div>
          <select name="size"  id="size" onChange={handleSizeChange}>
            <option value="all" selected disabled>
              Size
            </option>
            {sizes?sizes.map((size) => (
              <option key={size.size_id} value={size.size_id}>
                {size.name_Size}
              </option>
            )):''}
          </select>
        </label>

        <label>
          TAGS:
          <div className="tagsContainer">
            {tags.map((tag, index) => (
              <div className={styles.tagsItem} key={index}>
                <span className={styles.tag}>{tag.tag}</span>
                <span className={styles.close} onClick={() => handleDelete(index)}>
                  &times;
                </span>
              </div>
            ))}
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
        <button onClick={handleSubmit} className={styles.btn}>update product</button>
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
