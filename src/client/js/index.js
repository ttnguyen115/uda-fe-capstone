import moment from "moment";
import { isDateValid } from "./URLValidator";

/**
 * open window with the page to print it
 */
export const printTrip = () => {
  window.print();
};

const showResults = (to, departing, countryName, weather, photo) => {
  document.querySelector("#results").classList.remove("hide");

  document.querySelector("#resultToValue").innerText = to + ", " + countryName;
  document.querySelector("#resultDepartingValue").innerText = departing;
  const now = moment();

  const momentDeparting = moment(departing, "YYYY-MM-DD");
  const days = momentDeparting.diff(now, "days");
  document.querySelector("#resultDaysValue").innerText =
    to + ", " + countryName + " is " + days + " days away";
  const temp = weather.temp;
  const weatherDescription = weather.weather.description;
  document.querySelector("#weatherValue").innerText =
    temp + ". " + weatherDescription;
  document.querySelector("#cityPhotoValue").src = photo;
};

const getGeonameInfo = async (to) => {
  try {
    const info = await fetch("http://localhost:8081/city-info", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to }),
    });
    return await info.json();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export async function findTrip(event) {
  event.preventDefault();

  const to = document.querySelector("#to").value;
  const departing = document.querySelector("#departing").value;

  // Validate form
  const now = moment();
  const momentDeparting = moment(departing, "YYYY-MM-DD");

  if (!to) {
    alert("Please enter a valid city");
    return;
  }

  if (momentDeparting.isBefore(now)) {
    alert("Please enter a valid date");
    return;
  }

  if (!isDateValid(departing)) {
    alert("Please enter a valid formated date");
    return;
  }

  let forecast = null;
  if (momentDeparting.isBefore(now.add(7, "days"))) {
    console.log("Get current weather");
    forecast = "current";
  } else {
    console.log("Get foreCast weather");
    forecast = "forecast/daily";
  }

  try {
    const info = await getGeonameInfo(to);
    const { name, countryCode, countryName } = info;

    console.log(name, countryCode, countryName);

    const weather = await getWeather(forecast, name, countryCode);
    console.log(weather);

    const photo = await getCityPhoto(name);
    console.log(photo);

    showResults(to, departing, countryName, weather.data[0], photo.url);
  } catch (e) {
    console.log(e);
  }
}

const getWeather = async (forecast, name, countryCode) => {
  try {
    const info = await fetch("http://localhost:8081/weather", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ forecast, name, countryCode }),
    });
    return await info.json();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

/**
 * Get the url of the photo of the city
 * @param {string} name City Name
 */
const getCityPhoto = async (name) => {
  try {
    const info = await fetch("http://localhost:8081/city-photo", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    return await info.json();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Add event listeners
document.querySelector("#searchForm").addEventListener("submit", findTrip);
document.querySelector("#printTrip").addEventListener("click", printTrip);
