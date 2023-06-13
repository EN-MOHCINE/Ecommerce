import React, { useState, useEffect } from 'react';
import styles from './cssComponents/InfosUser.module.css';
import axios from 'axios';
import Loading from "./loading";

export default function Infos_user() {
  const [id, setID] = useState();
  const [ProductOrder, setProductOrder] = useState([]);
  const [ProductConfirm_oreders, setProductConfirm_oreders] = useState([]);
  const [Order, setOrder] = useState([]);
  const [Role, setRole] = useState('All');
  const [loading, setLoading] = useState(false);

  function handleSearch(value) {
    setRole(value);


  }

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://127.0.0.1:8000/api/OrderUser/${Role}/${localStorage.getItem('user_id')}`)
      .then((response) => {
        console.log(response.data.orders);
        setOrder(response.data.orders);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Role]);

  return (
    <div>
      <Loading loading={loading} />
      <div id={styles.spaceUp}></div>
      <div id={styles.filterContainer}>
        <div id={styles.layout}>
          <div id={styles.filtreDiv}>
            Filter:
            <select onChange={(e) => handleSearch(e.target.value)}>
              <option value="All">filter by roles</option>
              <option value="All">all</option>
              <option value="Encours">En cours</option>
              <option value="Validé">Commands Confirmé</option>
            </select>
          </div>
        </div>
        <div>
          {Order.length ? (
            <div className={styles.wrap}>
              {Order.map((data) => (
                <div key={data.id} className={styles.box}>
                  <div className={styles.boxTop}>
                    <div className={styles.boxImage1}>
                      <img
                        className={styles.boxImage}
                        src={`http://127.0.0.1:8000/pictures/${JSON.parse(data.picture_path)[0]}`}
                        alt="Girl Eating Pizza"
                      />
                    </div>
                    <div className={styles.titleFlex}>
                      <h4 className={styles.boxTitle}>{data.name}</h4>
                    
                    </div>

                    <p>
                      <span className={styles.description2}>Quantity :</span>
                      {data.quantity}
                      <span className={styles.description1}>Promotion :</span>
                      {data.promotion}
                    </p>
                    <p>
                      <span className={styles.description2}>Price  :</span>
                      {data.price}
                    </p>
                    <p>
                      <span className={styles.description2}>Price Totale :</span>
                      <b>{data.quantity*(data.price -(data.price  * (data.promotion  / 100)))}</b>
                      
                    </p>
                  </div>
                  {data.hasOwnProperty('order_id') ? (
                    <p disabled className={styles.button}>
                      Confirmer
                    </p>
                  ) : (
                    <p disabled className={styles.orange}>
                      En cours
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div id={styles.aucun}>
              Aucune Order
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
