import React, { useEffect, useState } from "react";
import styles from "./cssAdminComponents/catalogs.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CollectionList() {
  const [collections, setCollections] = useState([]);
  const [editDiv, setEditDiv] = useState(false);
  const [addDiv, setAddDiv] = useState(false);
  const [editCollection, setEditCollection] = useState(false);
  const [updateCollection, setUpdateCollection] = useState(false);
  const [newCollection, setNewCollection] = useState(false);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dropDownCollections")
      .then((response) => {
        setCollections(response.data);
      });
  }, [editCollection]);
  function handleDelete(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/collection/${id}`)
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
      setEditCollection(id+1);
  }
  function handleEdite(id) {
    setEditDiv(true);
    setEditCollection(
      collections.find((collection) => collection.collection_id === id)
    );
  }
  function handleUpdate(id) {
    axios
      .patch(`http://127.0.0.1:8000/api/collection/${id}`, {
        name: updateCollection,
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
        setEditCollection(id);
        setEditDiv(false);
      });
  }
  function handleAdd(){
    axios
      .post(`http://127.0.0.1:8000/api/collection`, { name: newCollection })
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
        setEditCollection(id+1);
        setAddDiv(false);
      });
  }
  return (
    <>
      <div id={styles.spaceUp}></div>

      <div id={styles.container}>
        <span> <button id={styles.addBtn} onClick={()=>setAddDiv(true)}>Add Collection</button></span>
     
        <span id={styles.title}>Collections list</span>

        {collections ? (
          <div>
            {collections.map((collection) => (
              <div key={collection.collection_id} className={styles.userDiv}>
                <span className={styles.name}>
                  {collection.collection_name}
                </span>
                <button
                  className={styles.deletebtn}
                  onClick={() => handleDelete(collection.collection_id)}
                >
                  delete
                </button>
                <button
                  className={styles.editbtn}
                  onClick={() => handleEdite(collection.collection_id)}
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
            <span id={styles.title}>Edit Collection</span>
            <span id={styles.close} onClick={()=>setEditDiv(false)}>X</span>
            <div>
              Update the Collection {editCollection.collection_name} to :
              <div>
                
                <input
                  type="text"
                  id={styles.input}
                  onChange={(e) => setUpdateCollection(e.target.value)}
                />
                <button
                  id={styles.btn}
                  onClick={() => handleUpdate(editCollection.collection_id)}
                >
                  Update
                </button>
              </div>
            </div>
          </div></div>
        ) : (
          ""
        )}
        {addDiv ? (
          <div>
          <div id={styles.editDiv}>
            <span id={styles.title}>Create new Collection</span>
            <span id={styles.close} onClick={()=>setAddDiv(false)}>X</span>
            <div>
              <div>
                
                <input
                  type="text"
                  id={styles.input}
                  onChange={(e) => setNewCollection(e.target.value)}
                />
                <button
                  id={styles.btn}
                  onClick={() => handleAdd(editCollection.collection_id)}
                >
                  create
                </button>
              </div>
            </div>
          </div></div>
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

export default CollectionList;
