// Function to get exchange rates
const getCurrencyRates = (currency) => {
  const rates = {
    USD: { USD: 1, EUR: 0.84, CHF: 0.92, BTC: 0.000023 },
    EUR: { EUR: 1, USD: 1.19, CHF: 1.1, BTC: 0.000027 },
    CHF: { CHF: 1, USD: 1.09, EUR: 0.91, BTC: 0.000025 },
    BTC: { BTC: 1, USD: 44000, EUR: 37000, CHF: 41000 },
  };
  if (!rates[currency]) {
    throw new Error(`Currency "${currency}" not found.`);
  }
  return rates[currency];
};

// Global variables to maintain state
let currentCurrency = null;
let ValueForConversion = 0;

// Updates the status of the selected currency
const selectedCurrency = (selectedItem) => {
  const selectedValue = selectedItem.value;
  return getCurrencyRates(selectedValue);
};

// Add listeners for currency selection
const addSelectedCurrencyUpdateListener = (selectedId) => {
  const selectedItem = document.getElementById(selectedId);
  selectedItem.addEventListener("change", () => {
    currentCurrency = selectedCurrency(selectedItem);
  });
};

// Updates flag based on selection
const updateCurrencyFlag = (selectElement) => {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const flag = selectedOption.getAttribute("data-flag"); // Assuming the options have a `data-flag` attribute with the flag URL
  selectElement.style.backgroundImage = `url(${flag})`;
};

// Add listeners to update flags
const addFlagUpdateListener = (selectId) => {
  const selectElement = document.getElementById(selectId);
  selectElement.addEventListener("change", () => {
    updateCurrencyFlag(selectElement);
  });
};

// Add currency and flags listeners
addSelectedCurrencyUpdateListener("currency");
addSelectedCurrencyUpdateListener("currency-2");
addFlagUpdateListener("currency");
addFlagUpdateListener("currency-2");

// Update the input value for conversion
const imputedValue = document.getElementById("imputed-value");
imputedValue.addEventListener("change", () => {
  ValueForConversion = parseFloat(imputedValue.value) || 0;
});

// Function for currency conversion
const convertCurrency = (ValueForConversion, fromRate, toRate) => {
  if (!fromRate || !toRate) {
    throw new Error("As taxas de conversão são inválidas.");
  }
  return (ValueForConversion * toRate) / fromRate;
};

// Set the conversion button
const converterBtn = document.getElementById("converter-btn");
const result = document.getElementById("result");

converterBtn.addEventListener("click", () => {
  if (!currentCurrency) {
    alert("Selecione uma moeda de origem.");
    return;
  }
  const fromRate = currentCurrency.USD; // Source example
  const toRate = getCurrencyRates("EUR").USD; // Target example
  const resultValue = convertCurrency(ValueForConversion, fromRate, toRate);
  result.innerText = resultValue.toFixed(2); // Format and display the result
});

// Configure the clear/reset button
const cleanBtn = document.getElementById("reset-btn");
cleanBtn.addEventListener("click", () => {
  imputedValue.value = "";
  result.innerText = "";
  // Reset selections (optional)
  const currencySelect = document.getElementById("currency");
  const currencySelect2 = document.getElementById("currency-2");
  currencySelect.value = "USD"; // Set a default value
  currencySelect2.value = "USD";
  updateCurrencyFlag(currencySelect); // Update the flag with the default
  updateCurrencyFlag(currencySelect2);
});
