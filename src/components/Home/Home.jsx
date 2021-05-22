import Search from "components/Search/Search";
import { useState } from "react";
import styles from "./Home.module.css";
import background from "assets/main_background.jpg";
import { FaGithub as GithubIcon } from "react-icons/fa";
import { ErrorBoundary } from "react-error-boundary";
import ErrorScreen from "components/ErrorScreen/ErrorScreen";

function Home() {
  const [weather, setWeather] = useState("");
  const [image, setImage] = useState(background);
  // Receiving weather data from child (Search component) by lifting state up.
  function getWeather(data) {
    setWeather(data);
  }
  // Receiving image from child by lifting state up. (Search component).
  function getBackgroundImage(image) {
    setImage(image);
  }
  const NoData = (
    <div className={styles.no_data}>
      <p>No data! Enter a city name and hit enter.</p>
    </div>
  );
  const WeatherResults = (
    <div className={styles.weather_result}>
      {weather !== "" ? (
        <h1 className={styles.temp}>{weather.main.temp}°C</h1>
      ) : (
        ""
      )}

      <div>
        <h1 className={styles.city}>{weather.name}</h1>
      </div>
    </div>
  );
  const homeStyles = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
  };
  return (
    <div className={styles.wrapper} id={styles.wrapper} style={homeStyles}>
      <div className={styles.header}>
        <a href="/">
          <header>Weatherify</header>
        </a>
        <a href="https://github.com/zxcodes/weatherify-web">
          <GithubIcon className={styles.github} />
        </a>
      </div>
      {weather === "" ? NoData : WeatherResults}
      <div className={styles.search_section}>
        <ErrorBoundary FallbackComponent={ErrorScreen}>
          <Search data={getWeather} image={getBackgroundImage} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default Home;
