import React, { useEffect, useState } from "react";
import styles from "./cssAdminComponents/catalogs.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [editDiv, setEditDiv] = useState(false);
  const [addDiv, setAddDiv] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [newCategory, setNewCategory] = useState(false);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dropDownCategories")
      .then((response) => {
        setCategories(response.data);
      });
  }, [editCategory]);
  function handleDelete(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/category/${id}`)
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
      });
      setEditCategory(id+1);
  }
  function handleEdite(id) {
    setEditDiv(true);
    setEditCategory(categories.find((category) => category.category_id === id));
  }
  function handleUpdate(id) {
    axios
      .patch(`http://127.0.0.1:8000/api/category/${id}`, { name: updateCategory })
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
        setEditCategory(id);
        setEditDiv(false);
      });
  }
  function handleAdd(){
    axios
      .post(`http://127.0.0.1:8000/api/category`, { name: newCategory })
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
        setEditCategory(id);
        setAddDiv(false);
      });
  }
  return (
    <>
      <div id={styles.spaceUp}></div>

      <div id={styles.container}>
        <span><button id={styles.addBtn} onClick={()=>setAddDiv(true)}>Add Category</button></span>
        <span id={styles.title}>Categories list</span>
        {categories ? (
          <div>
            {categories.map((category) => (
              <div key={category.category_id} className={styles.userDiv}>
                <span className={styles.name}>{category.name_Category}</span>
                <button
                  className={styles.deletebtn}
                  onClick={() => handleDelete(category.category_id)}
                >
                  delete
                </button>
                <button
                  className={styles.editbtn}
                  onClick={() => handleEdite(category.category_id)}
                >
                  edit
                </button>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        {editDiv ? (
        <div>
          <div id={styles.editDiv}>
            <span id={styles.title}>Edit Category</span>
            <span id={styles.close} onClick={()=>setEditDiv(false)}>X</span>
            <div>
              Update the Category <b> {editCategory.name_Category}</b> to :
              <div>
                
                <input
                  type="text"
                  id={styles.input}
                  onChange={(e) => setUpdateCategory(e.target.value)}
                />
                <button
                  id={styles.btn}
                  onClick={() => handleUpdate(editCategory.category_id)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          </div>
        ) : (
          ""
        )}
        {addDiv ? (
        <div>
          <div id={styles.editDiv}>
            <span id={styles.title}>Add new Category</span>
            <span id={styles.close} onClick={()=>setAddDiv(false)}>X</span>
            <div>
              <div>
                
                <input
                  type="text"
                  id={styles.input}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button
                  id={styles.btn}
                  onClick={() => handleAdd(editCategory.category_id)}
                >
                  create
                </button>
              </div>
            </div>
          </div>
          </div>
        ) : (
          ""
        )}
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
    </>
  );
}

export default CategoryList;
