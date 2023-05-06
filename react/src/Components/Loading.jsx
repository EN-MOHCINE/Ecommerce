import React from "react";
import styles from "./cssComponents/loading.module.css";

function Loading(props) {
  return (
    <>
      {props.loading === true && (
        <div id={styles.overlay}>
          <div className={styles.dotSpinner}>
            <div className={styles.dotSpinnerdot}></div>
            <div className={styles.dotSpinnerdot}></div>
            <div className={styles.dotSpinnerdot}></div>
            <div className={styles.dotSpinnerdot}></div>
            <div className={styles.dotSpinnerdot}></div>
            <div className={styles.dotSpinnerdot}></div>
            <div className={styles.dotSpinnerdot}></div>
            <div className={styles.dotSpinnerdot}></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Loading;

