const unitElement = document.getElementById("unit");
const worthMessageElement = document.getElementById("worth-message");

init();

function init() {
  setupUnitElement();
  setupProductsElements();
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

function setupProductsElements() {
  const productElements = getProductElements();
  attachProductInputListener(productElements);
}

function getProductElements() {
  return document.querySelectorAll(".product");
}

function attachProductInputListener(productElements) {
  productElements.forEach(productElement => {
    const children = productElement.children;
    attachProductsChildrenInputListener(children);
  })
}

function attachProductsChildrenInputListener(children) {
  Array.from(children).forEach(child => child.addEventListener("input", whichIsWorth));
}

function whichIsWorth() {
  const productElements = getProductElements();
  const worthProductPosition = getWorthProductPosition(productElements);
  updateWorthProductMessage(worthProductPosition);
}

function getWorthProductPosition(productElements) {
  const productsAttributes = getProductAttributes(productElements);
  const worthProductIndex = getWorthProductIndex(productsAttributes);
  return worthProductIndex != null ? worthProductIndex + 1 : null;
}

function getProductAttributes(productElements) {
  return Array.from(productElements).map(productElement => {
    const price = productElement.querySelector(".product-price").value;
    const amount = productElement.querySelector(".product-amount").value;
    const unit = productElement.querySelector(".product-unit").value;

    return {
      price,
      amount,
      unit
    };
  });
}

function getWorthProductIndex(productsAttributes) {
  const productsValues = productsAttributes.map(getProductValue);
  const isSomeValueInvalid = productsValues.some(isInvalid);
  if (isSomeValueInvalid) {
    return null;
  }
  return findWorthProductIndex(productsValues);
}

function getProductValue({ price, amount, unit }) {
  const isAnyAttributeMissing = !price || !amount || !unit;
  if (isAnyAttributeMissing) {
    return null;
  }
  return price / (amount * unit);
}

function isInvalid(value) {
  return value === null;
}

function findWorthProductIndex(productsValues) {
  let minValue = productsValues[0];
  let worthProductIndex = 0;

  productsValues.forEach((value, index) => {
    if (value < minValue) {
      minValue = value;
      worthProductIndex = index;
    }
  });

  return worthProductIndex;
}

function updateWorthProductMessage(worthProductPosition) {
  let message = "Change values above to find out which product is worth";
  if (worthProductPosition) {
    message = `Product ${worthProductPosition} is worth!`;
  }
  worthMessageElement.innerText = message;
}
