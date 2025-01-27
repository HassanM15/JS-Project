// Select elements
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDescription");

var productNameWarning = document.getElementById("productNameWarning");
var productPriceWarning = document.getElementById("productPriceWarning");
var productDescriptionWarning = document.getElementById(
  "productDescriptionWarning"
);

var actionButton = document.getElementById("actionButton");
var tableBody = document.getElementById("result");

var products;
var editIndex = -1;

// Initialize products
if (localStorage.getItem("productsList")) {
  products = JSON.parse(localStorage.getItem("productsList"));
  displayProducts(products);
} else {
  products = [];
}


var nameRegex = /^[A-Z][A-Za-z0-9\s]{2,100}$/;
var priceRegex = /^\d+$/; 
var descriptionRegex = /^[A-Za-z0-9\s]{5,100}$/; 

productName.addEventListener("input", validateName);
productPrice.addEventListener("input", validatePrice);
productDescription.addEventListener("input", validateDescription);

function validateName() {
  var value = productName.value.trim();
  if (nameRegex.test(value)) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    productNameWarning.innerText = "";
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    productNameWarning.innerText =
      "Name must be at least 2–5 characters & First Letter Capital";
  }
}

function validatePrice() {
  var value = productPrice.value.trim();
  if (priceRegex.test(value)) {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    productPriceWarning.innerText = "";
  } else {
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    productPriceWarning.innerText = "Price must be numbers only.";
  }
}

function validateDescription() {
  var value = productDescription.value.trim();
  if (descriptionRegex.test(value)) {
    productDescription.classList.add("is-valid");
    productDescription.classList.remove("is-invalid");
    productDescriptionWarning.innerText = "";
  } else {
    productDescription.classList.add("is-invalid");
    productDescription.classList.remove("is-valid");
    productDescriptionWarning.innerText =
      "Description must be 5–100 characters (letters, digits, spaces).";
  }
}

function addOrUpdateProduct() {
  // Final check before submission
  var isNameValid = nameRegex.test(productName.value.trim());
  var isPriceValid = priceRegex.test(productPrice.value.trim());
  var isDescValid = descriptionRegex.test(productDescription.value.trim());

  // If any field is invalid, do not proceed.
  if (!isNameValid || !isPriceValid || !isDescValid) {
    return;
  }

  var product = {
    productName: productName.value.trim(),
    productPrice: productPrice.value.trim(),
    productDescription: productDescription.value.trim(),
  };

  if (editIndex === -1) {
    products.push(product);
  } else {
    products[editIndex] = product;
    editIndex = -1;
    actionButton.innerText = "Add Product";
  }

  localStorage.setItem("productsList", JSON.stringify(products));
  displayProducts(products);
  clearForm();
}

function displayProducts(products) {
  var result = "";
  for (var i = 0; i < products.length; i++) {
    result += `
      <tr>
        <td>${products[i].productName}</td>
        <td>${products[i].productPrice}</td>
        <td>${products[i].productDescription}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
          <button class="btn btn-warning" onclick="editProduct(${i})">Update</button>
        </td>
      </tr>
    `;
  }
  tableBody.innerHTML = result;
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productDescription.value = "";

  productName.classList.remove("is-invalid", "is-valid");
  productPrice.classList.remove("is-invalid", "is-valid");
  productDescription.classList.remove("is-invalid", "is-valid");

  productNameWarning.innerText = "";
  productPriceWarning.innerText = "";
  productDescriptionWarning.innerText = "";

  editIndex = -1;
  actionButton.innerText = "Add Product";
}


function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("productsList", JSON.stringify(products));
  displayProducts(products);
}


function editProduct(index) {
  editIndex = index;
  productName.value = products[index].productName;
  productPrice.value = products[index].productPrice;
  productDescription.value = products[index].productDescription;

  validateName();
  validatePrice();
  validateDescription();

  actionButton.innerText = "Update Product";
}

function searchProduct(term) {
  var filteredProducts = products.filter(function (product) {
    return product.productName
      .toLowerCase()
      .includes(term.trim().toLowerCase());
  });
  displayProducts(filteredProducts);
}
