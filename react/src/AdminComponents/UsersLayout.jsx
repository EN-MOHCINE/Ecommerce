import React, { useEffect, useState } from "react";
import styles from "./cssAdminComponents/user.module.css";
import User from "./User";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Users() {
  const [name, setName] = useState("all");
  const [data_order, setData_order] = useState([]);
  const [id_user, setid_user] = useState();
  const [editDiv, setEditDiv] = useState(false);
  const [editUser, setEditUser] = useState(false);  
  const [datauser1 ,setaffichedatauser] =useState(false);
  const [affiche_data_order ,set_affiche_data_order] =useState(false);
  const [datauser ,setdatauser] =useState({});
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
  function afficheuser(data) {
    console.log(data);
    setaffichedatauser(true)
    setdatauser(data);
  }

  function order_user(id) {
    
    console.log(id);
    set_affiche_data_order(true)
  
    axios.get(`http://127.0.0.1:8000/api/orders_user/${id}`)
      .then((response) => {
        setData_order(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      
       // Déplacer cette ligne à l'intérieur de la fonction de rappel `.then()`
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
  {datauser1 ? (
    
    <div className={styles.carduser}>
          <div id={styles.editDiv}>
            <span id={styles.title}> Affiche user {datauser.name}  :</span>
            <span id={styles.close} onClick={() => setaffichedatauser(false)}>
              X
            </span>
            <div>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div className={styles.carduser1} style={{width:'100%'}}>
                  Nom :<span className={styles.champ}> {datauser.name} </span><br/>
                  Phone :<span className={styles.champ}>{datauser.phone  ?datauser.phone :"-"}</span><br/>
                  Email :<span className={styles.champ}>{datauser.email  ? datauser.email :"-"}</span><br/>
                  Name Role :<span className={styles.champ}>{datauser.name_role ?datauser.name_role :"-" }</span><br/>
                  Code Postal :<span className={styles.champ}>{datauser.code_postal  ?datauser.code_postal :"-"}</span><br/>
                </div>
              </div>
            </div>
          </div>
      </div>
    
  )
  :" "}



  {affiche_data_order ? (   
    
    <>
    <div className={styles.carduser}>
        <div id={styles.editDiv1}>
        <span id={styles.title1}> Affiche les Commende Confirmer  :</span>
              <div>Nombre des Commende   : <span className={styles.champ}>
              {data_order.length  ? data_order.length :"0"}
              
              </span></div><br/>
              <span id={styles.close} onClick={() => set_affiche_data_order(false)}>
                      X
                    </span>
      <table border='1px'>
        
          <tr>
            <th className={styles.th_affiche } >ID commende</th>
            <th className={styles.th_affiche } >Date</th>
            <th className={styles.th_affiche }>Quantity</th>

          </tr>
          {data_order.length > 0 ? (
            data_order.map((e, index) => (
              <tr key={index} className={styles.userDiv1}>
                <td className={styles.td_affiche}>{e.order_id ? e.order_id : "-"}</td>
                <td className={styles.td_affiche}>{e.order_date ? e.order_date : "-"}</td>
                <td className={styles.td_affiche}>{e.quantity ? e.quantity : "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{textAlign :"center"}}> <h4>Aucune commande</h4></td>
            </tr>
          )}


      
    </table>
      </div>
    </div>
        </>
    
  )
  :""}




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
              
          <User data={{ name: name, role: role }} 
          userEdit={handleEdit}  order_data={order_user}
          showuser={afficheuser} />
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
