// cart.js

// Import functions from the utility file
import { loadCart, updateCartBadge } from './cart-storage.js';

console.clear();

// Global variables
let item = loadCart(); // Load cart using the utility function
let totalAmount = 0;
let counter = item.length; // Count is simply the length of the item array

// Initialize cart badge
updateCartBadge();

// --- DOM containers ---
const cartContainer = document.getElementById('cartContainer');
const boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

const totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

const totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

const totalh2 = document.createElement('h2');
totalh2.textContent = 'Total Amount';
totalDiv.appendChild(totalh2);

const buttonDiv = document.createElement('div');
buttonDiv.id = 'button';
totalDiv.appendChild(buttonDiv);

const buttonTag = document.createElement('button');
buttonTag.textContent = 'Place Order';
buttonDiv.appendChild(buttonTag);

// --- Render each cart item ---
function dynamicCartSection(product, quantity) {
  const boxDiv = document.createElement('div');
  boxDiv.id = 'box';

  const boxImg = document.createElement('img');
  boxImg.src = product.preview;

  const boxh3 = document.createElement('h3');
  boxh3.textContent = `${product.name} × ${quantity}`;

  const boxh4 = document.createElement('h4');
  boxh4.textContent = `Amount: Ksh/- ${product.price * quantity}`;

  boxDiv.appendChild(boxImg);
  boxDiv.appendChild(boxh3);
  boxDiv.appendChild(boxh4);
  boxContainerDiv.appendChild(boxDiv);
}

// --- Update total amount display ---
function amountUpdate(amount) {
  const totalh4 = document.createElement('h4');
  totalh4.textContent = `Total: Ksh/- ${amount}`;
  totalh4.id = 'toth4';
  totalDiv.appendChild(totalh4);
}

// --- Load header and footer ---
function loadInto(id, url) {
  const req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
  document.getElementById(id).innerHTML = req.responseText;
}

loadInto("1", "header.html");
loadInto("4", "footer.html");

// --- Fetch product data and render cart ---
const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const products = JSON.parse(this.responseText);

    if (!item.length) {
      cartContainer.innerHTML = "<h3>Your cart is empty 🛒</h3>";
      return;
    }

    document.getElementById("totalItem").textContent = `Total Items: ${counter}`;

    // Loop through unique product IDs and count duplicates
    let itemCounts = {};
    item.forEach(id => {
        itemCounts[id] = (itemCounts[id] || 0) + 1;
    });

    for (const id in itemCounts) {
        const quantity = itemCounts[id];
        const product = products.find(p => p.id == id);
        
        if (product) {
            totalAmount += product.price * quantity;
            dynamicCartSection(product, quantity);
        }
    }
    
    cartContainer.appendChild(boxContainerDiv);
    cartContainer.appendChild(totalContainerDiv);
    amountUpdate(totalAmount);
  }
};

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
httpRequest.send();

// --- Checkout button handler ---
buttonTag.onclick = function () {
  const username = localStorage.getItem("username");
  if (!username) {
    alert("Please log in first");
    window.location.href = "account.html";
    return;
  }

  localStorage.setItem("totalAmount", totalAmount);
  window.location.href = "checkout.html";
};



// console.clear();

// // Global variables
// let counter = 0;
// let item = [];
// let totalAmount = 0;

// // --- Load cart from cookies ---
// {
//   const cookies = Object.fromEntries(
//     document.cookie.split(';').map(c => c.trim().split('='))
//   );

//   if (cookies['cart']) {
//     item = cookies['cart'].split(' ').filter(Boolean);
//     counter = Number(cookies['counter'] || 0);
//     document.getElementById('badge').innerHTML = counter;
//   }
// }

// // --- DOM containers ---
// const cartContainer = document.getElementById('cartContainer');
// const boxContainerDiv = document.createElement('div');
// boxContainerDiv.id = 'boxContainer';

// const totalContainerDiv = document.createElement('div');
// totalContainerDiv.id = 'totalContainer';

// const totalDiv = document.createElement('div');
// totalDiv.id = 'total';
// totalContainerDiv.appendChild(totalDiv);

// const totalh2 = document.createElement('h2');
// totalh2.textContent = 'Total Amount';
// totalDiv.appendChild(totalh2);

// const buttonDiv = document.createElement('div');
// buttonDiv.id = 'button';
// totalDiv.appendChild(buttonDiv);

// const buttonTag = document.createElement('button');
// buttonTag.textContent = 'Place Order';
// buttonDiv.appendChild(buttonTag);

// // --- Render each cart item ---
// function dynamicCartSection(product, quantity) {
//   const boxDiv = document.createElement('div');
//   boxDiv.id = 'box';

//   const boxImg = document.createElement('img');
//   boxImg.src = product.preview;

//   const boxh3 = document.createElement('h3');
//   boxh3.textContent = `${product.name} × ${quantity}`;

//   const boxh4 = document.createElement('h4');
//   boxh4.textContent = `Amount: Ksh/- ${product.price * quantity}`;

//   boxDiv.appendChild(boxImg);
//   boxDiv.appendChild(boxh3);
//   boxDiv.appendChild(boxh4);
//   boxContainerDiv.appendChild(boxDiv);
// }

// // --- Update total amount display ---
// function amountUpdate(amount) {
//   const totalh4 = document.createElement('h4');
//   totalh4.textContent = `Total: Ksh/- ${amount}`;
//   totalh4.id = 'toth4';
//   totalDiv.appendChild(totalh4);
// }

// // --- Load header and footer ---
// function loadInto(id, url) {
//   const req = new XMLHttpRequest();
//   req.open("GET", url, false);
//   req.send(null);
//   document.getElementById(id).innerHTML = req.responseText;
// }

// loadInto("1", "header.html");
// loadInto("4", "footer.html");

// // --- Fetch product data and render cart ---
// const httpRequest = new XMLHttpRequest();
// httpRequest.onreadystatechange = function () {
//   if (this.readyState === 4 && this.status === 200) {
//     const products = JSON.parse(this.responseText);

//     if (!item.length) {
//       cartContainer.innerHTML = "<h3>Your cart is empty 🛒</h3>";
//       return;
//     }

//     document.getElementById("totalItem").textContent = `Total Items: ${counter}`;

//     // Loop through unique product IDs and count duplicates
//     let visited = new Set();
//     item.forEach(id => {
//       if (visited.has(id)) return;
//       const quantity = item.filter(i => i === id).length;
//       visited.add(id);

//       const product = products.find(p => p.id == id);
//       if (product) {
//         totalAmount += product.price * quantity;
//         dynamicCartSection(product, quantity);
//       }
//     });

//     cartContainer.appendChild(boxContainerDiv);
//     cartContainer.appendChild(totalContainerDiv);
//     amountUpdate(totalAmount);
//   }
// };

// httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
// httpRequest.send();

// // --- Checkout button handler ---
// buttonTag.onclick = function () {
//   const username = localStorage.getItem("username");
//   if (!username) {
//     alert("Please log in first");
//     window.location.href = "account.html";
//     return;
//   }

//   localStorage.setItem("totalAmount", totalAmount);
//   window.location.href = "checkout.html";
// };


