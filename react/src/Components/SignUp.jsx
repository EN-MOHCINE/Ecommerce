import axios from "axios";
import React, { useState } from "react";
import Loading from "./loading";
import styles from "./cssComponents/signUp.module.css";
function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);
  const [Errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true)
    const Data = new FormData();
    Data.append("email", email);
    Data.append("password", password);
    Data.append("password_confirmation", confirmPassword);
    Data.append("name", name);
    await axios
      .post("http://127.0.0.1:8000/api/signUp", Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        props.setVisiblitySignUp(false);
        setIsError(false);
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false)
      })
      .catch((error) => {
        setIsError(true);
        setErrors(error.response.data.errors);
      });
  };
  function handlePaste(e) {
    e.preventDefault();
  }
  function handleSignIn() {
    props.setVisiblitySignUp(false);
  }
  function handleClose() {
    props.setVisiblity(false);
    props.setVisiblitySignUp(false);
  }
  return props.visible ? (<>
    <Loading loading={loading} />
    <div id={styles.singUp}>
      <div id={styles.signUpContainer}>
        
        <span id={styles.close} onClick={handleClose}>
          X
        </span>
        <span id={styles.title}>Sign Up</span>
        <form>
          <input
            type="name"
            placeholder="Enter your name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className={styles.errors}>
            {isError && Errors.name ? Errors.name : ""}
          </span>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className={styles.errors}>
            {isError && Errors.email ? Errors.email : ""}
          </span>
          <input
            type="password"
            placeholder="Enter your password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className={styles.errors}>
            {isError && Errors.password ? Errors.password : ""}
          </span>
          <input
            type="password"
            placeholder="Confirm your password"
            className={styles.input}
            value={confirmPassword}
            onPaste={handlePaste}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className={styles.errors}>
            {isError && Errors.password ? Errors.password : ""}
          </span>
          <button id={styles.authBtn} onClick={signUp}>
            Sign Up
          </button>
        </form>
        <span>
          Have you an account ?
          <span id={styles.changeSignIn} onClick={handleSignIn}>
            Sign In
          </span>
        </span>
      </div>
    </div></>
  ) : (
    ""
  );
}

export default SignUp;
