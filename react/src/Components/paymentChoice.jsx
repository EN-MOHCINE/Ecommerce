import React, { useState } from "react";
import paypalLogo from "../photos/Paypal_2014_logo.png";
import MasterLogo from "../photos/MasterCard_Logo.png";
import Pyment from "../photos/Pyment.svg";
import style from "./cssComponents/choice.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Loading from "./loading";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function PaymentForm() {
  const [selectedOption, setSelectedOption] = useState("cashOnDelivery");
  const [emailPaypal, setEmailPaypal] = useState("");
  const [passwordPaypal, setPasswordPaypal] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user_id,
    name,
    Lname,
    streetAdress,
    postCode,
    city,
    phone,
    email,
    shopNow,
    total,
  } = location.state;

  function handleConfirm() {
    const Data = {
      user_id :user_id,
      name: name,
      Lname: Lname,
      streetAdress: streetAdress,
      postCode: postCode,
      city: city,
      phone: phone,
      email: email,
      shopNow:shopNow,
      products: total,
    };
    if (selectedOption === "creditCard") {
      Data.expDate = expDate;
      Data.numberCard = cardNumber;
      Data.cvv = cvv;
      Data.selectedOption="creditCard"
    }
    axios
      .post("http://127.0.0.1:8000/api/paymentMethod/", Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data)
       if(response.data.success){
         navigate("/success", {replace : true ,index : -1 , state:{
          message : response.data.message
         }})
       }
      });
  }
  return (
    <>
      <div id={style.spaceUp}></div>
      <div id={style.container}>
        <span id={style.title}>Payment Method</span>
        <div>
          <span>
            <img width={70} src={Pyment} alt="PayPal Logo" />
            Cash on delivery
            <input
              type="radio"
              name="paymentOption"
              value="cashOnDelivery"
              checked={selectedOption === "cashOnDelivery"}
              onChange={handleOptionChange}
            />
          </span>
        </div>
        <span id={style.or}>
          <hr />
          <span>Or</span>
          <hr />
        </span>
        <div>
          <span>
            <img width={70} src={MasterLogo} />
            Credit Card
            <input
              type="radio"
              name="paymentOption"
              value="creditCard"
              checked={selectedOption === "creditCard"}
              onChange={handleOptionChange}
            />
          </span>
        </div>

        {selectedOption === "creditCard" ? (
          <div>
            <label>
              Card Number:
              <input
                id={style.master}
                type="text"
                name="cardNumber"
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </label>
            <label>
              Expiration Date:
              <input
                id={style.master}
                type="text"
                name="expirationDate"
                onChange={(e) => setExpDate(e.target.value)}
              />
            </label>
            <label>
              CVV:
              <input
                id={style.master}
                type="text"
                name="cvv"
                onChange={(e) => setCvv(e.target.value)}
              />
            </label>
          </div>
        ) : (
          ""
        )}
        <button id={style.placeOrderBtn} onClick={handleConfirm}>
          confirm
        </button>
      </div>
    </>
  );
}

export default PaymentForm;
