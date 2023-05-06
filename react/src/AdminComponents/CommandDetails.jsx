import React, { useEffect, useState } from "react";
import styles from "./cssAdminComponents/commandsDetails.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../Components/loading";
function CommandDetails() {
  const params = useParams();
  const [selectedPicture, setSelectedPicture] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/detailsCommand/${params.id}`)
      .then((response) => {
        setData(response.data[0]);
        setSelectedPicture(JSON.parse(response.data[0].picture_path)[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);
  function handleClick() {
    setLoading(true);
    if (data.productQuantity - data.orderQuantity > 0) {
      const Data = new FormData();
      Data.append("userId", data.userId);
      Data.append("quantity", data.orderQuantity);
      Data.append("productId", data.productId);
      Data.append("email", data.email);
      Data.append("address", data.address);
      Data.append("productName", data.productName);
      Data.append("name", data.userName);
      Data.append('orderId',params.id)
      axios
        .post("http://127.0.0.1:8000/api/confirmOrder/", Data)
        .then((response) => {
          setMessage(response.data);
          setLoading(false);
          
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      console.log("the product was not confirmed");
      setLoading(true);
    }
  }
  return (
    <>
      <Loading loading={loading} />
      <div id={styles.spaceUp}></div>
      {data ? (
        <div id={styles.infoContainer}>
          <div>
            <div id={styles.userInfos}>
              <span id={styles.userTitle}>User Informations :</span>
              <div>
                User: <span>{data.userName}</span>
              </div>
              <div>
                Address : <span>{data.address}</span>
              </div>
              <div>
                Email : <span>{data.email}</span>
              </div>
              <div>
                Phone : <span>{data.phone}</span>
              </div>
            </div>
            <div id={styles.commandsInfos}>
              <span id={styles.userTitle}>Commands Informations :</span>
              <div>Product Quantity : {data.productQuantity}</div>
              <div>Order quantity : {data.orderQuantity}</div>
              <div>
                <button id={styles.btnConfirm} onClick={handleClick}>
                  Confirm Order
                </button>
              </div>
              <div>
                {message ? (
                  <span style={{ color: "green" }}>{message}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div id={styles.productInfos}>
            <h2 style={{ marginTop: "0" }}>{data.productName}</h2>
            <div id={styles.picturesContain}>
              <div id={styles.sidePictures}>
                {JSON.parse(data.picture_path).map((picture, index) => (
                  <img
                    src={"http://127.0.0.1:8000/pictures/" + picture}
                    key={index}
                    onClick={() => setSelectedPicture(picture)}
                  />
                ))}
              </div>
              <div id={styles.selectedImg}>
                <img
                  src={"http://127.0.0.1:8000/pictures/" + selectedPicture}
                  id={styles.img}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default CommandDetails;
