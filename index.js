let unitElement;

window.addEventListener("load", init);

function init() {
  setupUnitElement();
}

function setupUnitElement() {
  initializeUnitElement();
  addUnitOptions();
}

function initializeUnitElement() {
  unitElement = document.getElementById("unit");
}

function addUnitOptions() {
  const options = [
    { placeholder: "Liter (l)", value: "liter" },
    { placeholder: "Kilograms (kg)", value: "kilogram" }
  ];

  const fragment = document.createDocumentFragment();
  options.forEach(({ placeholder, value }) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerText = placeholder;
    fragment.append(option);
  });
  unitElement.append(fragment);
}
