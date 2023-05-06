import React, { useEffect, useState } from "react";
import styles from "./cssAdminComponents/user.module.css";
import User from "./User";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Users() {
  const [name, setName] = useState("all");
  const [editDiv, setEditDiv] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [roleEdit, setRoleEdit] = useState("");
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/roles`).then((response) => {
      setRoles(response.data);
    });
  }, []);
  function handleSearch() {
    const nameSearch = document.getElementById(styles.input).value;
    setName(nameSearch);
  }
  function handleEdit(prop, user) {
    setEditDiv(prop);
    setEditUser(user);
  }
  function handleUpdate(idRole) {
    axios
      .patch(`http://127.0.0.1:8000/api/roles/${editUser.user_id}`, {
        role_id: idRole,
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
        setEditDiv(false);
      });
  }
  return (
    <>
      <div id={styles.spaceUp}></div>
      {editDiv ? (
        <div>
          <div id={styles.editDiv}>
            <span id={styles.title}>Edit User</span>
            <span id={styles.close} onClick={() => setEditDiv(false)}>
              X
            </span>
            <div>
              Update the role of {editUser.name} to :
              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <span style={{width:'75%'}}>
                <select onChange={(e) => setRoleEdit(e.target.value)}>
                  <option value="all">select role</option>
                  {roles
                    ? roles.map((role) => (
                        <option key={role.role_id} value={role.role_id}>
                          {role.name_role}
                        </option>
                      ))
                    : ""}
                </select></span>
                <span>
                <button id={styles.btn} onClick={() => handleUpdate(roleEdit)}>
                  Update
                </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div id={styles.filterContainer}>
        <div id={styles.layout}>
          <div id={styles.searchDiv}>
            <label>Search with names</label>
            <input type="text" id={styles.input} />
            <button onClick={handleSearch} id={styles.btn}>
              Search
            </button>
          </div>
          <div id={styles.filtreDiv}>
            Filter:
            <select onChange={(e) => setRole(e.target.value)}>
              <option value="">filter by roles</option>
              <option value="">all</option>
              {roles
                ? roles.map((role) => (
                    <option key={role.role_id} value={role.role_id}>
                      {role.name_role}
                    </option>
                  ))
                : ""}
            </select>
          </div>
        </div>
        <div>
          <User data={{ name: name, role: role }} userEdit={handleEdit} />
        </div>
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

export default Users;
