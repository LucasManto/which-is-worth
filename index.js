const unitElement = document.getElementById("unit");

init();

function init() {
  setupUnitElement();
}

function setupUnitElement() {
  addUnitOptions();
  attachUnitChangeListener();
}

function addUnitOptions() {
  const options = [
    { placeholder: "Liter (l)", value: "liter" },
    { placeholder: "Kilograms (kg)", value: "kilogram" }
  ];

  const fragment = createFragmentWithOptions(options);
  unitElement.append(fragment);
}

function attachUnitChangeListener() {
  unitElement.addEventListener("change", updateProductsUnitSelectOptions);
}

function updateProductsUnitSelectOptions() {
  const options = getOptionsForUnit();
  const productsUnitSelect = getProductsUnitSelectElements();
  clearProductsUnitSelectOptions(productsUnitSelect);
  addProductsUnitSelectOptions(productsUnitSelect, options);
}

function getOptionsForUnit() {
  const literOptions = [
    { placeholder: "l", value: 1 },
    { placeholder: "ml", value: 1e-3 },
  ];
  const kilogramOptions = [
    { placeholder: "kg", value: 1 },
    { placeholder: "g", value: 1e-3 },
  ];
  const options = {
    liter: literOptions,
    kilogram: kilogramOptions
  };

  return options[unitElement.value];
}

function getProductsUnitSelectElements() {
  return document.querySelectorAll(".product-unit");
}

function clearProductsUnitSelectOptions(productsUnitSelect) {
  productsUnitSelect.forEach(productUnitSelect => productUnitSelect.replaceChildren());
}

function addProductsUnitSelectOptions(productsUnitSelect, options) {
  const fragment = createFragmentWithOptions(options);
  productsUnitSelect.forEach(productUnitSelect => productUnitSelect.append(fragment.cloneNode(true)));
}

function createFragmentWithOptions(options) {
  const fragment = document.createDocumentFragment();
  options.forEach(({ placeholder, value }) => {
    const option = createOptionWithPlaceholderAndValue({value, placeholder});
    fragment.append(option);
  });
  return fragment;
}

function createOptionWithPlaceholderAndValue({placeholder, value}) {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = placeholder;
  return option;
}
