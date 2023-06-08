import React, { useEffect, useState } from "react";
import styles from "./cssAdminComponents/catalogs.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SizeList() {
  const [sizes, setSizes] = useState([]);
  const [addDiv, setAddDiv] = useState(false);
  const [editDiv, setEditDiv] = useState(false);
  const [editSize, setEditSize] = useState(false);
  const [updateSize, setUpdateSize] = useState(false);
  const [newSize, setNewSize] = useState(false);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/size").then((response) => {
      setSizes(response.data);
    });
  }, [editDiv, addDiv]);
  function handleDelete(id) {
    axios.delete(`http://127.0.0.1:8000/api/size/${id}`).then((response) => {
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
    });
  }
  function handleEdite(id) {
    setEditDiv(true);
    setEditSize(sizes.find((size) => size.size_id === id));
  }
  function handleUpdate(id) {
    axios
      .patch(`http://127.0.0.1:8000/api/size/${id}`, {
        name: updateSize,
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
        setEditSize(id);
        setEditDiv(false);
      });
  }
  function handleAdd() {
    axios
      .post(`http://127.0.0.1:8000/api/size`, { name: newSize })
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
        setEditSize(id);
        setAddDiv(false);
      });
  }
  return (
    <>
      <div id={styles.spaceUp}></div>

      <div id={styles.container}>
        <span>
          <button id={styles.addBtn} onClick={() => setAddDiv(true)}>
            Add Size
          </button>
        </span>

        <span id={styles.title}>Sizes list</span>

        {sizes ? (
          <div>
            {sizes.map((size) => (
              <div key={size.size_id} className={styles.userDiv}>
                <span className={styles.name}>{size.name_Size}</span>
                <button
                  className={styles.deletebtn}
                  onClick={() => handleDelete(size.size_id)}
                >
                  delete
                </button>
                <button
                  className={styles.editbtn}
                  onClick={() => handleEdite(size.size_id)}
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
              <span id={styles.title}>Edit Size</span>
              <span id={styles.close} onClick={() => setEditDiv(false)}>
                X
              </span>
              <div>
                Update the size {editSize.name_Size} to :
                <div>
                  <input
                    type="text"
                    id={styles.input}
                    onChange={(e) => setUpdateSize(e.target.value)}
                  />
                  <button
                    id={styles.btn}
                    onClick={() => handleUpdate(editSize.size_id)}
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
              <span id={styles.title}>Create New Size</span>
              <span id={styles.close} onClick={() => setAddDiv(false)}>
                X
              </span>
              <div>
                <div>
                  <input
                    type="text"
                    id={styles.input}
                    onChange={(e) => setNewSize(e.target.value)}
                  />
                  <button
                    id={styles.btn}
                    onClick={() => handleAdd(editSize.size_id)}
                  >
                    Create
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

export default SizeList;
