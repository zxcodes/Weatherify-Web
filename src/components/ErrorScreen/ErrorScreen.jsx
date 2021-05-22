import React from "react";
import styles from "./ErrorScreen.module.css";
import { IoIosArrowBack } from "react-icons/io";

function ErrorScreen() {
  return (
    <div className={styles.error_container}>
      <a href="/" className={styles.link}>
        <IoIosArrowBack className={styles.arrow} />
        Home
      </a>
      <h1 className={styles.error_text}>
        City not found! Check the city name and try again.
      </h1>
    </div>
  );
}

export default ErrorScreen;
