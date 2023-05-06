import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styles from "./cssComponents/signIn.module.css";
import SignUp from "./SignUp";
import Loading from "./loading";
function SignIn(props) {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Errors, setErrors] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const checkboxRef = useRef(null);
  const SignIn = async (e) => {
    e.preventDefault();
    setLoading(true)
    const Data = new FormData();
    Data.append("email", email);
    Data.append("password", password);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signIn",
        Data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("user_id", response.data.id);
      localStorage.setItem("user_name", response.data.name);
      localStorage.setItem('user_role',response.data.role);
      if (!checkboxRef.current.checked) {
        window.addEventListener("unload", function (event) {
          localStorage.removeItem("user_id");
          localStorage.removeItem("user_name");
          localStorage.removeItem('user_role');

        });
      }
      setIsError(false);
      setEmail("");
      setPassword("");
      props.setVisiblity(false);
      setLoading(false)
    } catch (error) {
      setIsError(true);
      if (error.response) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
      }
    }
  };
  function handleSignUp() {
    setSignUp(true);
  }

  return props.visibility ? (<>
  <Loading loading={loading} />
    <div id={styles.singIn}>
      <div id={styles.signInContainer}>
        <span id={styles.close} onClick={() => props.setVisiblity(false)}>
          X
        </span>
        <span id={styles.title}>Sign In</span>
        <form>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <span className={styles.errors}>
            {isError && Errors.email ? Errors.email : ""}
          </span>
          <input
            type="password"
            placeholder="Enter your password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className={styles.errors}>
            {isError && Errors.password ? Errors.password : ""}
          </span>
          <div id={styles.ctnCheck}>
            <span>
              <input type="checkbox" id={styles.checkbox} ref={checkboxRef} />
              <span>Stay signed in</span>{" "}
            </span>
            {/* <span id="forget">Forget password ?</span> */}
          </div>
          <button id={styles.authBtn} onClick={SignIn}>
            Sign In
          </button>
        </form>
        <span>
          Don't have an account yet?{" "}
          <span id={styles.changeSignUp} onClick={handleSignUp}>
            {" "}
            Sign Up
          </span>
        </span>
      </div>
      <SignUp
        visible={signUp}
        setVisiblitySignUp={setSignUp}
        setVisiblity={props.setVisiblity}
      />
    </div></>
  ) : (
    ""
  );
}

export default SignIn;
