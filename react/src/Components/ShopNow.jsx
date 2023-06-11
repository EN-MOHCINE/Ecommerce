import axios from "axios";
import PaymentForm from "./PaymentChoice";
import React, { useEffect, useState } from "react";
import styles from "./cssComponents/CheckOut.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./loading";
import { ToastContainer, toast } from "react-toastify";
import paypalLogo from "../photos/Paypal_2014_logo.png";
import MasterLogo from "../photos/MasterCard_Logo.png";
import style from "./cssComponents/choice.module.css";
import "react-toastify/dist/ReactToastify.css";
function ShopNow() {
  const [product, setProduct] = useState([]);
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
  const [selectedOption, setSelectedOption] = useState("");
  const [emailPaypal, setEmailPaypal] = useState("");
  const [passwordPaypal, setPasswordPaypal] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const location = useLocation()
  const {productId,quantity}=location.state
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/shopNow/${productId}`)
      .then(response=>{
        setProduct(response.data)
      }).catch((error) => {
        console.log(error);
      });
  }, []);;
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
    Data.append(`products[]`, JSON.stringify(product));
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
          PaymentMethod();
        }
      });
  };
  let filename = "";

if (typeof product.picture_path === "string") {
  const parsedData = JSON.parse(product.picture_path.replace(/'/g, ""));
  filename = parsedData[0];
}

console.log(filename);

// Output: 16835402355be5f8113548359.602a7c6cd4919.jpg

  function PaymentMethod() {
    navigate("/paymentMethod", {
      state: {
        name: Fname,
        Lname: Lname,
        streetAdress: Address,
        postCode: PostCode,
        city: City,
        phone: Phone,
        email: Email,
        total: {
          product_id: product.product_id,
          quantity:quantity,
          total:
            (product.price - product.price * (product.promotion / 100)) *
            quantity,
        }
        
      },
    });
  }
  return (
    <>
      <Loading loading={loading} />

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
              <br />
            </div>
          </div>

          <div id={styles.productSelectedDiv}>
            <div id={styles.cartContainer}>
              <div id={styles.header}>
                <span id={styles.titleCart}>Order summary {status}</span>
              </div>
              <div id={styles.productSection}>
                      <div className={styles.productInfo} key={product.product_id}>
                        <span className={styles.infoDiv}>
                          <img
                            src={
                                "http://127.0.0.1:8000/pictures/"+
                                filename
                              
                            }
                            className={styles.img}
                          />
                          {product.name}
                          <span className={styles.quantity}>
                            x{quantity}
                          </span>
                        </span>
                        <span>
                          {product.price -
                            product.price * (product.promotion / 100)}
                          DH
                        </span>
                      </div>
              </div>
              <div>
                <div id={styles.calculateDiv}>
                  <div>
                    <span>subtotal</span>
                    <span>
                        {product.price -
                        product.price * (product.promotion / 100) *
                        quantity}
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
                  {product.price -
                        product.price * (product.promotion / 100) *
                        quantity}
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

export default ShopNow;
