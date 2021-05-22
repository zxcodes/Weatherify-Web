import { useRef, useState } from "react";
import styles from "./Search.module.css";
import { FaChevronCircleDown as DownArrow } from "react-icons/fa";
import background from "assets/main_background.jpg";
import { FaGithub as GithubIcon } from "react-icons/fa";

function Search(props) {
  const [weather, setWeather] = useState("");
  const [image, setImage] = useState(background);
  const [imageArray, setImageArray] = useState([]);
  const cityInput = useRef("");
  const availableCities = ["Hyderabad", "Adilabad", "Mumbai", "Chennai"];

  // To get weather data.
  async function getWeather(e) {
    e.preventDefault();
    let cityInputValue = cityInput.current.value;
    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE_ONE;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${API_KEY}&units=metric
`;
    if (cityInputValue !== "") {
      let data = await fetch(URL);
      let fetchedWeather = await data.json();
      setWeather(fetchedWeather);
      getBackgroundImage();
    }
  }
  // To dynamically change the app background.
  async function getBackgroundImage() {
    const URL = `https://api.pexels.com/v1/search?query=night and stars&orientation=landscape&per_page=30"`;
    const req = await fetch(URL, {
      headers: {
        Authorization: process.env.REACT_APP_NOT_SECRET_CODE_TWO,
      },
    });
    const res = await req.json();
    const images = res.photos.map((image) => image.src.large2x);
    setImageArray([...imageArray, ...images]);
    const randomImage = Math.floor(Math.random() * images.length);
    setImage(images[randomImage]);
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.mob_styles}>
        <div className={styles.mob_header}>
          <a href="/">
            <h1>Weatherify</h1>
          </a>
          <a href="https://github.com/zxcodes/weatherify-web">
            <GithubIcon className={styles.github} />
          </a>
        </div>
        <div className={styles.mob_result}>
          {weather !== "" ? (
            <>
              <h1 className={styles.temp}>{weather.main.temp}</h1>
              <h1 className={styles.city_name}>{weather.name}</h1>
            </>
          ) : (
            <p className={styles.no_data}>
              No data! Enter a city and hit enter.
            </p>
          )}
        </div>
      </div>
      <form
        onSubmit={
          (props.data(weather),
          props.image(image),
          (e) => {
            getWeather(e);
          })
        }
      >
        <input
          type="text"
          placeholder="Enter a city name..."
          ref={cityInput}
          autoFocus
          required
        />
      </form>
      <div className={styles.cities_holder}>
        <h3>Available Cities</h3>
        <DownArrow className={styles.down_arrow} />
      </div>
      {availableCities.map((city, index) => (
        <p
          key={index}
          onClick={(e) => {
            cityInput.current.value = e.currentTarget.innerHTML;
            getWeather(e);
            props.image(image);
          }}
        >
          {city}
        </p>
      ))}
      <div className={styles.weather_detail}>
        {weather !== "" ? (
          <>
            <h3>{weather.name} Weather Brief</h3>
            <p>Feels like: {weather.main.feels_like}</p>
            <p>Humidity: {weather.main.humidity}</p>
            <p>Pressure: {weather.main.pressure}</p>
          </>
        ) : (
          <p>No data available!</p>
        )}
      </div>
    </div>
  );
}
export default Search;
