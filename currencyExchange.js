const dropdown = document.querySelectorAll(".dropdown");
const fromInput = document.getElementById("from-input");
const toInput = document.getElementById("to-input");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");

let conversion_rates = {};
let conversion_rates_country = null;

const getConversionRates = async () => {
  try {
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/db818d764cb5126bc4ee0090/latest/USD"
    );
    const data = await response.json();

    setConversionRates(data.conversion_rates);
    //getting object keys as array.
    conversion_rates_country = Object.keys(conversion_rates);
    createDropDown();
  } catch (error) {
    console.log(error);
  }
};

const setConversionRates = (rates) => {
  conversion_rates = { ...rates };
};

const createDropDown = () => {
  dropdown.forEach((dropdownMenu) => {
    const ul = document.createElement("ul");
    ul.id = dropdownMenu.id;

    //creating li list and adding conversion contries which are fetched form api.
    conversion_rates_country.forEach((country) => {
      const li = document.createElement("li");
      li.textContent = country;
      li.dataset.id = country;
      li.addEventListener("click", setCurrency);
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

//setting currency
function setCurrency() {
  const parentId = this.parentElement.id;
  if (parentId === "from") {
    fromCurrency.innerText = this.dataset.id;
  } else {
    toCurrency.innerText = this.dataset.id;
  }
  convertCurrency();
}

// this function has the logic to convert currency.
function convertCurrency() {
  const fromCurrencyInput = conversion_rates[fromCurrency.innerText];
  const toCurrencyInput = conversion_rates[toCurrency.innerText];

  //converting the currency
  const result = (
    fromInput.value *
    (toCurrencyInput / fromCurrencyInput)
  ).toFixed(3);

  //setting currency value to toInput after conversion.
  toInput.value = result;
}

fromInput.addEventListener("input", (event) => {
  fromInput.value = event.target.value;
  convertCurrency();
});

getConversionRates();

window.onclick = (event) => {
  dropdown.forEach((dropdownMenu) => {
    if (!dropdownMenu.contains(event.target)) {
      dropdownMenu.lastElementChild.classList.remove("showDropDown");
    }
  });
};
