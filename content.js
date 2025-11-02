let contentTitle;
let cartItems = [];
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");

// Load cart from cookie
if (document.cookie.indexOf(",counter=") >= 0) {
  const cookieParts = document.cookie.split(",");
  cartItems = cookieParts[0].split("=")[1].split(" ");
  const counter = cookieParts[1].split("=")[1];
  document.getElementById("badge").innerHTML = counter;
}

// Render product card
function dynamicClothingSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "contentDetails.html?" + ob.id;

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  h3.textContent = ob.name;

  let h4 = document.createElement("h4");
  h4.textContent = ob.brand;

  let h2 = document.createElement("h2");
  h2.textContent = "Rs " + ob.price;

  let addButton = document.createElement("button");
  addButton.textContent = "Add to Cart";
  addButton.className = "add-to-cart";
  addButton.onclick = function () {
    cartItems.push(ob.id);
    document.cookie = "cart=" + cartItems.join(" ") + ",counter=" + cartItems.length;
    document.getElementById("badge").innerHTML = cartItems.length;
    alert(`${ob.name} added to cart`);
  };

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);
  detailsDiv.appendChild(addButton);

  return boxDiv;
}

// Fetch products
let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    contentTitle = JSON.parse(this.responseText);
    for (let i = 0; i < contentTitle.length; i++) {
      const product = contentTitle[i];
      const section = product.isAccessory ? containerAccessories : containerClothing;
      section.appendChild(dynamicClothingSection(product));
    }
  } else if (this.readyState === 4) {
    console.log("Product fetch failed");
  }
};
httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
httpRequest.send();
