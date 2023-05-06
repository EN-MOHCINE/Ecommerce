import axios from "axios";
import React, { useState } from "react";
import styles from "./cssComponents/Contact.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./loading";
function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [LastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [FirstName, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const Data = new FormData();
    Data.append("email", email);
    Data.append("FirstName", FirstName);
    Data.append("LastName", LastName);
    Data.append("message", message);
    await axios
      .post("http://127.0.0.1:8000/api/message", Data, {})
      .then((response) => {
        setLoading(false);
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
        setEmail("");
        setLastName("");
        setMessage("");
        setName("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Loading loading={loading} />
      <div id={styles.spaceUp}></div>
      <div id={styles.containerContact}>
        <span id={styles.title}>Contact us</span>
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input
            type="text"
            value={FirstName}
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Last Name:</label>
          <input
            type="text"
            value={LastName}
            className={styles.input}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Email:</label>
          <input
            type="text"
            value={email}
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Message:</label>
          <textarea
            name=""
            id=""
            value={message}
            cols="10"
            rows="20"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className={styles.button}> Submit</button>
        </form>
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

export default Contact;
