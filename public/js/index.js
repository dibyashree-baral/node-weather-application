const weatherForm = document.getElementById("weather-form");
const contentDiv = document.querySelector(".content-wrap");
const input = document.getElementById("weather-inputbox");
const errorSpan = document.querySelector(".error");
const data = document.querySelector(".result");
const loader = document.querySelector(".loader");
const weatherImage = document.querySelector("#weather_image");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value && input.value !== undefined) {
    errorSpan.innerHTML = "";
    data.innerHTML = "";
    weatherImage.classList.remove("show");
    weatherImage.classList.add("hide");
    loader.style.display = "block";
    contentDiv.classList.add("loading");
    fetch(`/weather?address=${input.value}`)
      .then((response) => {
        contentDiv.classList.remove("loading");
        loader.style.display = "none";
        response
          .json()
          .then(
            ({
              address,
              feelslike,
              humidity,
              weather_descriptions,
              weather_icons,
              locationDetails,
              error,
              temperature,
            } = {}) => {
              if (error) {
                errorSpan.innerHTML = error;
                data.innerHTML = "";
              } else {
                errorSpan.innerHTML = "";
                weatherImage.src = weather_icons[0];
                weatherImage.classList.remove("hide");
                weatherImage.classList.add("show");
                data.innerHTML = `The searched address is ${address} and we are showing result for 
                ${locationDetails.name}, ${locationDetails.region} 
                which is in ${locationDetails.country}.
                The temparature in ${locationDetails.name} is ${temperature} degree and it feels 
                like ${feelslike} degree. Humidity is ${humidity} and it is ${ weather_descriptions[0]}.`;
              }
            }
          );
      })
      .catch((err) => {
        console.log(err);
      });

    input.value = "";
  } else {
    errorSpan.innerHTML = "please provide an input to continue search";
    data.innerHTML = "";
  }
});
