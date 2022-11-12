const warning = document.getElementById("warning");
const locationEl = document.getElementsByClassName("location");
let temperatureDegree = document.querySelector(".temperature-degree");
let temperatureDescritpion = document.querySelector(".temperature-description");
let locationTimezone = document.querySelector(".location-timezone");
let image = document.querySelector(".weather-icon");
let temperatureSection = document.querySelector(".degree-section");
let temperatureSpan = document.querySelector(".temperature span")
let searchButton = document.querySelector(".search-button");
let inputForm = document.querySelector('.input-location');
var input = true;
let searchButtonIcon = document.querySelector('#icon-search-button');
let gustWindSpeedEl = document.querySelector(".winds span");
let humidityEl = document.querySelector(".humidity span")
let precipEl = document.querySelector(".precip span")
let pressEl = document.querySelector(".press span")
let lightEl=document.querySelector(".lght span");
let windsEl = document.querySelector(".wnds span");
let carbonEl=document.querySelector(".co span");
let noEl = document.querySelector(".no span");
let ozoEl = document.querySelector(".o span");
let pm25El = document.querySelector(".pm25 span");
let pm10El = document.querySelector(".pm10 span");
let soEl = document.querySelector(".so span");

const findMyState = () => {
    const success = (position) => {
        console.log(position);
    }
    const error = () => {
        console.error("Allow Your location to access");
    }
    navigator.geolocation.getCurrentPosition(success, error);
}

var addrss = '22 Main st Boston MA';

function geocode() {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: addrss,
            key: 'AIzaSyC6Hw-zsLvadtaJJ_4nJsxMkhz8kGzlEls'
        }
    }).then(function (response) {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
}
geocode();

window.addEventListener('load', () => {
    defaultLocationWeather();
});

function defaultLocationWeather() {
    let long;
    let lat;
    temperatureSpan.textContent = "\u00B0C";
    
    windsEl.textContent = "12.2kph/7.6mph \"NW\" @323\u00B0";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com";
            const api = `https://api.weatherapi.com/v1/current.json?key=6b3f1234826449f3b46180933221011&q=${lat},${long}&aqi=yes`;
            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                const { gust_kph,gust_mph,humidity,precip_in,precip_mm,pressure_in,pressure_mb,feelslike_c, feelslike_f, uv,vis_km,vis_miles,wind_degree,wind_dir,wind_kph,wind_mph} = data.current;
                console.log(feelslike_f);
                const { text } = data.current.condition;
                //set DOM Elements from api
                temperatureDegree.innerText = feelslike_c;
                temperatureDescritpion.innerText = text;
                gustWindSpeedEl.innerText = gust_kph+"kph/"+gust_mph+"mph";
                humidityEl.innerText=humidity+"%";
                precipEl=precip_in+"in/"+precip_mm+"mm";
                pressEl=pressure_in+"in/"+pressure_mb+"mb";
                lightEl.innerText =vis_km+"km/"+vis_miles+"miles [ with UV : "+uv+" sf]";
                windsEl.innerText=wind_kph+"kph/"+wind_mph+"mph \""+wind_dir+"\" @"+wind_degree+"\u00B0";
                locationTimezone.textContent = data.location.region + " " + data.location.country;
                let str = data.current.condition.icon;
                let nu = str.substring(str.length - 7, str.length - 4);
                image.src = ".\\assests\\weather\\64x64\\" + ((data.current == 1) ? "day" : "night") + "\\" + nu + ".png";

                //Converter degree celsius to farenheit on click
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureDegree.innerText = feelslike_c;
                        temperatureSpan.textContent = "\u00B0C";
                    }
                    else {
                        temperatureDegree.innerText = feelslike_f;
                        temperatureSpan.textContent = "F";
                    }
                });
            });
        });

    }
    else {
        warning.innerHTML = "Not Supported";
        locationEl.innerText = "";
    }

}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e);
    if (input === true) {
        searchButtonIcon.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>";
        input = false;
        displayWeather(inputForm.value);
    }
    else {
        searchButtonIcon.innerHTML = "<i class=\"fa-solid fa-magnifying-glass\"></i>";
        input = true;
        inputForm.value = "";
        defaultLocationWeather();
    }
});

function displayWeather(location) {
    var index = location.indexOf(",");
    var lat = location.substring(0, index);
    var long = location.substring(index + 1, location.length);
    console.log(lat, long);
    const proxy = "https://cors-anywhere.herokuapp.com";
    const api = `https://api.weatherapi.com/v1/current.json?key=6b3f1234826449f3b46180933221011&q=${lat},${long}&aqi=yes`;
    fetch(api).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        const { gust_kph,gust_mph,humidity,precip_in,precip_mm,pressure_in,pressure_mb,feelslike_c, feelslike_f, uv,vis_km,vis_miles,wind_degree,wind_dir,wind_kph,wind_mph} = data.current;
        console.log(feelslike_f);
        const { text } = data.current.condition;
        //set DOM Elements from api
        temperatureDegree.innerText = feelslike_c;
        temperatureDescritpion.innerText = text;
        gustWindSpeedEl.innerText = gust_kph+"kph/"+gust_mph+"mph";
        humidityEl.innerText=humidity+"%";
        precipEl=precip_in+"in/"+precip_mm+"mm";
        pressEl=pressure_in+"in/"+pressure_mb+"mb";
        lightEl.innerText =vis_km+"km/"+vis_miles+"miles [ with UV : "+uv+" sf]";
        windsEl.innerText=wind_kph+"kph/"+wind_mph+"mph \""+wind_dir+"\" @"+wind_degree+"\u00B0";
        locationTimezone.textContent = data.location.region + " " + data.location.country;
        let str = data.current.condition.icon;
        let nu = str.substring(str.length - 7, str.length - 4);
        image.src = ".\\assests\\weather\\64x64\\" + ((data.current == 1) ? "day" : "night") + "\\" + nu + ".png";

        //Converter degree celsius to farenheit on click
        temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === "F") {
                temperatureDegree.innerText = feelslike_c;
                temperatureSpan.textContent = "\u00B0C";
            }
            else {
                temperatureDegree.innerText = feelslike_f;
                temperatureSpan.textContent = "F";
            }
        });
    });

}