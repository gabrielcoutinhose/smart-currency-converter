const updateCurrencyFlag = (selectElement) => {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const flag = selectedOption.getAttribute("data-flag");
  selectElement.style.backgroundImage = `url(${flag})`;
};
const addFlagUpdateListener = (selectId) => {
  const selectElement = document.getElementById(selectId);
  selectElement.addEventListener("change", () =>
    updateCurrencyFlag(selectElement)
  );
  updateCurrencyFlag(selectElement);
};
addFlagUpdateListener("currency");
addFlagUpdateListener("currency-2");
