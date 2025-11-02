console.clear();

// Global variables
let counter = 0;
let item = [];
let totalAmount = 0;

// Parse cookie and update cart badge
if (document.cookie.indexOf(',counter=') >= 0) {
  const cookieParts = document.cookie.split(',');
  const cartRaw = cookieParts[0].split('=')[1];
  counter = Number(cookieParts[1].split('=')[1]);
  item = cartRaw.split(" ");
  document.getElementById("badge").innerHTML = counter;
}

// DOM containers
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

// Render cart item
function dynamicCartSection(product, quantity) {
  const boxDiv = document.createElement('div');
  boxDiv.id = 'box';

  const boxImg = document.createElement('img');
  boxImg.src = product.preview;

  const boxh3 = document.createElement('h3');
  boxh3.textContent = `${product.name} × ${quantity}`;

  const boxh4 = document.createElement('h4');
  boxh4.textContent = `Amount: Rs ${product.price}`;

  boxDiv.appendChild(boxImg);
  boxDiv.appendChild(boxh3);
  boxDiv.appendChild(boxh4);
  boxContainerDiv.appendChild(boxDiv);
}

// Update total amount
function amountUpdate(amount) {
  const totalh4 = document.createElement('h4');
  totalh4.textContent = `Amount: Rs ${amount}`;
  totalh4.id = 'toth4';
  totalDiv.appendChild(totalh4);
}

// Load header and footer
function loadInto(id, url) {
  const req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send(null);
  document.getElementById(id).innerHTML = req.responseText;
}

loadInto("1", "header.html");
loadInto("4", "footer.html");

// Fetch product data and render cart
const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const products = JSON.parse(this.responseText);
    document.getElementById("totalItem").textContent = `Total Items: ${counter}`;

    let i = 0;
    while (i < item.length) {
      let quantity = 1;
      for (let j = i + 1; j < item.length; j++) {
        if (item[j] === item[i]) quantity++;
      }
      const product = products[item[i] - 1];
      totalAmount += product.price * quantity;
      dynamicCartSection(product, quantity);
      i += quantity;
    }

    cartContainer.appendChild(boxContainerDiv);
    cartContainer.appendChild(totalContainerDiv);
    amountUpdate(totalAmount);
  }
};

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
httpRequest.send();

// Handle checkout button click
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
