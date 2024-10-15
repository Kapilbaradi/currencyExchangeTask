const dropdown = document.querySelectorAll(".dropdown");
const fromInput = document.getElementById("from-input");
const toInput = document.getElementById("to-input");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");

var conversion_rates = {};
const rates = async () => {
  const response = await fetch(
    "https://v6.exchangerate-api.com/v6/64dfaf3170796fa062508c24/latest/usd",
    {
      method: "GET",
    }
  );

  var json = await response.json();
  const country_rate = json.conversion_rates;
  console.log(country_rate)
  const rates = Object.keys(country_rate);
  rates.forEach(key => {
    conversion_rates[key] = country_rate[key];
  })
//   Object.assign(conversion_rates, country_rate);
};

rates();

console.log(conversion_rates)
console.log(Object.length)

const conversion_rates_country = Object.keys(conversion_rates);
// console.log(conversion_rates.length);
// console.log(conversion_rates_country);

const createDropDown = () => {
  dropdown.forEach((dropdownMenu) => {
    const ul = document.createElement("ul");
    if (dropdownMenu.id === "from") {
      ul.setAttribute("id", "from");
    } else {
      ul.setAttribute("id", "to");
    }
    conversion_rates_country.forEach((country) => {
      const li = document.createElement("li");
      li.textContent = country;
      li.setAttribute("data-id", country);
      ul.appendChild(li);
    });
    dropdownMenu.appendChild(ul);
  });
};

dropdown.forEach((dropdownMenu) => {
  dropdownMenu.addEventListener("click", () => {
    dropdownMenu.lastElementChild.classList.toggle("showDropDown");
  });
});

createDropDown();

function setCurrency() {
  const parentId = this.parentElement.id;
  if (parentId === "from") {
    fromCurrency.innerText = this.dataset.id;
  } else {
    toCurrency.innerText = this.dataset.id;
    conversion_rates_country.forEach((rates) => {
      if (this.dataset.id === rates) {
        toInput.setAttribute("value");
      }
    });
  }
}

const li = document.querySelectorAll("li");
li.forEach((element) => {
  element.addEventListener("click", setCurrency);
});

fromInput.addEventListener("input", () => {
  fromInput.setAttribute("value");
});
