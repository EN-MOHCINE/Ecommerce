import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./cssComponents/CheckOut.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CheckOut(props) {
  const [products, setProducts] = useState([]);
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [PostCode, setPostCode] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/Cart/${localStorage.getItem("user_id")}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleOrder = async () => {
    setLoading(true);
    const Data = new FormData();
    Data.append("name", Fname);
    Data.append("Lname", Lname);
    Data.append("streetAdress", Address);
    Data.append("postCode", PostCode);
    Data.append("city", City);
    Data.append("phone", Phone);
    Data.append("email", Email);
    Data.append("user_id", localStorage.getItem("user_id"));
    products.forEach((product) => {
      Data.append(`products[]`, JSON.stringify(product));
    });
    await axios
      .post("http://127.0.0.1:8000/api/CheckOut", Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.status === "error") {
          setLoading(false);
          setError(response.data.message);
        } else {
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
          setAddress("");
          setCity("");
          setLname("");
          setPhone("");
          setPostCode("");
          setFname("");
          setLname("");
          setLoading(false);
          setEmail("");
          setError([]);
        }
      });
  };
  return (
    <>
      <Loading loading={loading} />
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
      <div id={styles.spaceUp}></div>
      <div id={styles.container}>
        <span>CHECK OUT</span>
        <span>
          <div id={styles.navigate}>
            <span onClick={() => navigate("/")} id={styles.firstNavigation}>
              Home
            </span>
            / <span>Check Out</span>
          </div>
        </span>
        <div id={styles.containerGrid}>
          <div id={styles.formContaiener}>
            <div>
              <div className={styles.twoInputs}>
                <label>
                  First Name <br />
                  {error && <span className={styles.error}>{error[0]}</span>}
                  <input
                    type="text"
                    className={styles.input2}
                    value={Fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Last Name <br />
                  {error && <span className={styles.error}>{error[1]}</span>}
                  <input
                    type="text"
                    className={styles.input2}
                    value={Lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                </label>
              </div>
              <label>Street address *</label>
              {error && <span className={styles.error}>{error[2]}</span>}
              <input
                type="text"
                className={styles.input}
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <label>Town / City *</label>
              {error && <span className={styles.error}>{error[3]}</span>}
              <input
                type="text"
                className={styles.input}
                value={City}
                onChange={(e) => setCity(e.target.value)}
                required
              />

              <label>Postcode / ZIP *</label>
              {error && <span className={styles.error}>{error[4]}</span>}
              <input
                type="text"
                className={styles.input}
                value={PostCode}
                onChange={(e) => setPostCode(e.target.value)}
                required
              />

              <div className={styles.twoInputs}>
                <label>
                  Phone * <br />
                  {error && <span className={styles.error}>{error[5]}</span>}
                  <input
                    type="number"
                    className={styles.input2}
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Email address *<br />
                  {error && <span className={styles.error}>{error[6]}</span>}
                  <input
                    type="email"
                    className={styles.input2}
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>
          </div>
          <div id={styles.productSelectedDiv}>
            <div id={styles.cartContainer}>
              <div id={styles.header}>
                <span id={styles.titleCart}>Order summary {status}</span>
              </div>
              <div id={styles.productSection}>
                {products !== undefined
                  ? products.map((product) => (
                      <div className={styles.productInfo} key={product.cart_id}>
                        <span className={styles.infoDiv}>
                          <img
                            src={
                              "http://127.0.0.1:8000/pictures/" +
                              JSON.parse(product.picture)[0]
                            }
                            className={styles.img}
                          />
                          {product.name}
                          <span className={styles.quantity}>
                            x{product.quantity}
                          </span>
                        </span>
                        <span>{product.price-(product.price * (product.promotion / 100))} DH</span>
                      </div>
                    ))
                  : ""}
              </div>
              <div>
                <div id={styles.calculateDiv}>
                  <div>
                    <span>subtotal</span>
                    <span>
                      {products
                        ? products.reduce(
                            (total, product) =>
                              total + (product.price-(product.price * (product.promotion / 100))) * product.quantity,
                            0
                          )
                        : 0}
                      DH
                    </span>
                  </div>
                  <div>
                    <span>shipping</span>
                    <span>free</span>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>total</span>
                  <span>
                    {products
                      ? products.reduce(
                          (total, product) =>
                            total + (product.price-(product.price * (product.promotion / 100))) * product.quantity,
                          0
                        )
                      : 0}
                    DH
                  </span>
                </div>
              </div>
            </div>
            <button id={styles.placeOrderBtn} onClick={handleOrder}>
              place order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOut;