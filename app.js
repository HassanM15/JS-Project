var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDescription");
var actionButton = document.getElementById("actionButton");
var tableBody = document.getElementById("result");
var products;
var editIndex = -1; 

// Initialize products array from localStorage or as an empty array
if (localStorage.getItem("productsList")) {
  products = JSON.parse(localStorage.getItem("productsList"));
  displayProducts(products);
} else {
  products = [];
}

// Add or Update a product
function addOrUpdateProduct() {
  var product = {
    productName: productName.value,
    productPrice: productPrice.value,
    productDescription: productDescription.value,
  };

  if (editIndex === -1) {
    // Add a new product if not in edit mode
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

// Display products in the table
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

// Clear form inputs
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productDescription.value = "";
  editIndex = -1; 
  actionButton.innerText = "Add Product"; 
}

// Search products by name
function searchProduct(term) {
  var filteredProducts = products.filter(function (product) {
    return product.productName
      .toLowerCase()
      .includes(term.trim().toLowerCase());
  });
  displayProducts(filteredProducts);
}

// Delete a product
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("productsList", JSON.stringify(products));
  displayProducts(products);
}

// Edit a product
function editProduct(index) {
  editIndex = index; 

  // Populate form fields with existing product data
  productName.value = products[index].productName;
  productPrice.value = products[index].productPrice;
  productDescription.value = products[index].productDescription;
  actionButton.innerText = "Update Product";
}
