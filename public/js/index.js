const weatherForm = document.getElementById("weather-form");
const contentDiv = document.querySelector(".content-wrap");
const input = document.getElementById("weather-inputbox");
const errorSpan = document.querySelector(".error");
const data = document.querySelector(".result");
const loader = document.querySelector(".loader");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  if (input.value && input.value !== undefined) {
    errorSpan.innerHTML = "";
    data.innerHTML = "";
    loader.style.display = "block";
    contentDiv.classList.add("loading");
    fetch(`/weather?address=${input.value}`)
      .then(response => {
        contentDiv.classList.remove("loading");
        loader.style.display = "none";
        response
          .json()
          .then(({ address, feelslike, error, temperature } = {}) => {
            if (error) {
              errorSpan.innerHTML = error;
              data.innerHTML = "";
            } else {
              errorSpan.innerHTML = "";
              data.innerHTML = `The searched address ${address} where temparature is ${temperature} degree but it feels like ${feelslike} degree `;
            }
          });
      })
      .catch(err => {
        console.log(err);
      });

    input.value = "";
  } else {
    errorSpan.innerHTML ="please provide an input to continue search";
    data.innerHTML = "";
  }
});
