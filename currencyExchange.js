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
      "https://v6.exchangerate-api.com/v6/64dfaf3170796fa062508c24/latest/usd"
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
    if (dropdownMenu.id === "from") {
      ul.setAttribute("id", "from");
    } else {
      ul.setAttribute("id", "to");
    }

    //creating li list and adding conversion contries which are fetched form api.
    conversion_rates_country.forEach((country) => {
      const li = document.createElement("li");
      li.textContent = country;
      li.setAttribute("data-id", country);
      li.addEventListener("click", convertCurrency);
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

function convertCurrency() {
  const parentId = this.parentElement.id;
  if (parentId === "from") {
    fromCurrency.innerText = this.dataset.id;
  } else {
    toCurrency.innerText = this.dataset.id;

    let findValue = {};
    findValue.fromInput = conversion_rates[fromCurrency.innerText];
    findValue.toInput = conversion_rates[this.dataset.id];

    //converting the currency
    const toValue = fromInput.value * (findValue.toInput / findValue.fromInput);

    //setting currency value to toInput after conversion.
    toInput.setAttribute("value", toValue.toFixed(3));
  }
}

fromInput.addEventListener("input", (event) => {
  fromInput.setAttribute("value", event.target.value);
});

getConversionRates();

window.onclick = (event) => {
  dropdown.forEach((dropdownMenu) => {
    if (
      event.target.id !== "from-currency" &&
      event.target.id !== "to-currency"
    ) {
      dropdownMenu.lastElementChild.classList.remove("showDropDown");
    }
  });
};
