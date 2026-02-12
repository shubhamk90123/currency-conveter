const BASE_URL = "https://cdn.moneyconvert.net/api/latest.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerHTML = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (el) => {
  let currCode = el.value;
  let countryCode = countryList[currCode];
  let newSourse = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = el.parentElement.querySelector("img");
  img.src = newSourse;
};

const updateExchRate = async () => {
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal <= 0) {
    amountVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let responce = await fetch(URL);
  let data = await responce.json();
  let rate = data[toCurr.value.toLowerCase()];
  console.log(rate);

  let finVal = amountVal * rate;

  msg.innerHTML = `${amountVal} ${fromCurr.value} = ${finVal} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchRate();
});

window.addEventListener("load", () => {
  updateExchRate;
});
