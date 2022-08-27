/* Register */
function onClick(event) {
  event.preventDefault();
  this.style.backgroundColor = "black";
  console.log("click...");
  console.log(event);

  const mensaje = {
    name: document.getElementById("shop").value,
    email: document.getElementById("name").value,
    message: document.getElementById("cell").value,
  };
  console.log(mensaje);

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(mensaje),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      Swal.fire("Enviado", "Gracias por contactarnos", "success");
      cleanForm();
      /* redirectUrl(); */
    })
    .catch((err) => console.log(err));
}

function cleanForm() {
  let formulario = document.getElementById("formulario");
  formulario.reset();
}
function redirectUrl() {
  window.location.href = "https://google.com";
}

let boton = document.getElementById("enviar");
boton.addEventListener("click", onClick);

/* Async - Await */
/* async function getIp() {
  try {
    let response = await fetch("https://api.ipify.org/?format=json");
    let ipResponse = await response.json();
    console.log(ipResponse);

    let responseLocation = await fetch(
      "http://ip-api.com/json/" + ipResponse.ip
    );
    let locationResponse = await responseLocation.json();
    console.log(locationResponse);
  } catch {
    console.log("Algo paso, no se pudo resolver...");
  }
}
getIp(); */

/* Weather */
window.addEventListener("load", () => {
  let lon;
  let lat;
  const API_KEY = "db981fec8cc05866175276217ef7a861";

  let tempValue = document.getElementById("temp-value");
  let tempDesc = document.getElementById("temp-desc");

  //let ubic = document.getElementById("ubic");
  let iconoAnimado = document.getElementById("icono-animado");

  let vientoVelocidad = document.getElementById("viento-velocidad");

  lon = -65.3321146;
  lat = -24.182653;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`;

  //ubicación por ciudad
  //const url = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&units=metric&appid=${AQUI_VIENE_TU_API_KEY}`
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let temp = Math.round(data.main.temp);
      tempValue.textContent = `${temp} ° C`;
      let desc = data.weather[0].description;
      tempDesc.textContent = desc.toUpperCase();
      //ubic.textContent = `Ciudad Cultural`;
      vientoVelocidad.textContent = `${data.wind.speed} m/s`;

      //para iconos estáticos
      //const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`
      //icono.src = urlIcon
      //console.log(data.weather[0].icon)

      //para iconos dinámicos
      console.log(data.weather[0].main);
      switch (data.weather[0].main) {
        case "Thunderstorm":
          iconoAnimado.src = "assets/thunder.svg";
          console.log("TORMENTA");
          break;
        case "Drizzle":
          iconoAnimado.src = "assets/rainy-2.svg";
          console.log("LLOVIZNA");
          break;
        case "Rain":
          iconoAnimado.src = "assets/rainy-7.svg";
          console.log("LLUVIA");
          break;
        case "Snow":
          iconoAnimado.src = "assets/snowy-6.svg";
          console.log("NIEVE");
          break;
        case "Clear":
          iconoAnimado.src = "assets/day.svg";
          console.log("LIMPIO");
          break;
        case "Atmosphere":
          iconoAnimado.src = "assets/weather.svg";
          console.log("ATMOSFERA");
          break;
        case "Clouds":
          iconoAnimado.src = "assets/cloudy-day-1.svg";
          console.log("NUBES");
          break;
        default:
          iconoAnimado.src = "assets/cloudy-day-1.svg";
          console.log("por defecto");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
