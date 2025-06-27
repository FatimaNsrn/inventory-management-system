
const API_URL = 'http://localhost:5000/products';

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById('mainMenu').style.display = 'none';
  document.getElementById(id).style.display = 'block';

  if (id === 'viewProducts') loadProducts();
}

function goBack() {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById('mainMenu').style.display = 'block';
}

document.getElementById('addProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const description = document.getElementById('description');
  const price = document.getElementById('price');
  const stock = document.getElementById('stock');

  const product = {
    name: name.value,
    description: description.value,
    price: parseFloat(price.value),
    stock: parseInt(stock.value)
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  e.target.reset();
  alert("Product added!");
});

// View Products
async function loadProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();
  const tbody = document.getElementById('productsTableBody');
  tbody.innerHTML = '';
  products.forEach(p => {
    const row = `<tr>
      <td>${p.id}</td><td>${p.name}</td><td>${p.description}</td><td>${p.price}</td><td>${p.stock}</td>
    </tr>`;

    tbody.innerHTML += row;
  });
}

// Get Product by ID
async function fetchProductById() {
  const id = document.getElementById('getProductId').value;
  const res = await fetch(`${API_URL}/${id}`);
  const p = await res.json();
  const info = document.getElementById('productInfo');
  info.innerHTML = p.name
    ? `<p>Name: ${p.name}<br>Description: ${p.description}<br>Price: ${p.price}<br>Stock: ${p.stock}</p>`
    : `<p style="color:red">Product not found</p>`;
}

// Update Product
document.getElementById('updateForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const updateIdInput = document.getElementById('updateId');
  const updateNameInput = document.getElementById('updateName');
  const updateDescriptionInput = document.getElementById('updateDescription');
  const updatePriceInput = document.getElementById('updatePrice');
  const updateStockInput = document.getElementById('updateStock');

  const id = updateIdInput.value.trim();
  if (!id) {
    alert("Please enter the Product ID to update.");
    return;
  }

  // Build the updated object only with fields that have values (optional)
  const updated = {};
  if (updateNameInput.value.trim()) updated.name = updateNameInput.value.trim();
  if (updateDescriptionInput.value.trim()) updated.description = updateDescriptionInput.value.trim();
  if (updatePriceInput.value) updated.price = parseFloat(updatePriceInput.value);
  if (updateStockInput.value) updated.stock = parseInt(updateStockInput.value);

  if (Object.keys(updated).length === 0) {
    alert("Please enter at least one field to update.");
    return;
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated)
  });

  if (response.ok) {
    alert("Product updated!");
    e.target.reset();
  } else {
    alert("Failed to update product. Check the ID or try again.");
  }
});


async function deleteProductById() {
  const deleteIdInput = document.getElementById('deleteId');  // Get the input element
  const id = deleteIdInput.value;
  
  if (!id) {
    alert("Please enter a Product ID to delete.");
    return;
  }
  
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

  if (response.ok) {
    alert("Product deleted!");
    deleteIdInput.value = '';  // Clear the input after successful deletion
  } else {
    alert("Failed to delete product. Maybe the ID does not exist.");
  }
}


function goBack() {
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });

  // Show menu again
  document.getElementById('mainMenu').style.display = 'block';
}
