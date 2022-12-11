const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
// messageOne.textContent = 'form js'
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  // console.log(location);
  const locationUrl = "/weather?address=" + location;
  messageOne.textContent = "Looading...";
  messageTwo.textContent = "";
  fetch(locationUrl).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // console.log(data.error);
        messageOne.textContent = "";
        messageTwo.textContent = data.error;
      } else {
        console.log(data);
        messageOne.textContent = "Enter location " + data.location;
        messageTwo.textContent = " forecast " + data.forecast +' degree';
      }
    });
  });
});
