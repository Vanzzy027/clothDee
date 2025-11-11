// content.js - CORRECTED VERSION

import { updateCartBadge } from './cart-storage.js';

let contentTitle;

// Initialize cart badge when the page loads
updateCartBadge();

// Render product card function remains correct
function dynamicClothingSection(ob) {
    // ... (Your correct product card creation code) ...
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
    h2.textContent = "Ksh/- " + ob.price;

    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(h4);
    detailsDiv.appendChild(h2);

    return boxDiv;
}


let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        // 💥 RESTORED RENDERING LOGIC HERE 💥
        contentTitle = JSON.parse(this.responseText);

        let containerClothing = document.getElementById("containerClothing");
        let containerAccessories = document.getElementById("containerAccessories");

        if (!containerClothing || !containerAccessories) {
            console.error("Error: Product containers not found in the DOM.");
            return;
        }

        for (let i = 0; i < contentTitle.length; i++) {
            const product = contentTitle[i];
            const section = product.isAccessory ? containerAccessories : containerClothing;
            section.appendChild(dynamicClothingSection(product));
        }
        
    } else if (this.readyState === 4 && this.status !== 200) { // Check for non-200 finished status
        // ERROR PATH (HTTP request finished but status was not 200)
        console.error("Product fetch failed. Status:", this.status);
        
        // Reference the main placeholder div (div id="3" in index.html)
        const container = document.getElementById("3"); 
        if (container) {
            container.innerHTML = "<h2>Error loading products. Please check your network connection.</h2>";
        }
    }
};

httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
httpRequest.send();


// // content.js

// // Import functions from the utility file
// import { updateCartBadge } from './cart-storage.js';

// let contentTitle;

// // Initialize cart badge when the page loads
// updateCartBadge();

// // Render product card
// function dynamicClothingSection(ob) {
//     // --- Create Product Card Structure ---
//     let boxDiv = document.createElement("div");
//     boxDiv.id = "box";

//     let boxLink = document.createElement("a");
//     boxLink.href = "contentDetails.html?" + ob.id;

//     let imgTag = document.createElement("img");
//     imgTag.src = ob.preview;

//     let detailsDiv = document.createElement("div");
//     detailsDiv.id = "details";

//     let h3 = document.createElement("h3");
//     h3.textContent = ob.name;

//     let h4 = document.createElement("h4");
//     h4.textContent = ob.brand;

//     let h2 = document.createElement("h2");
//     h2.textContent = "Ksh/- " + ob.price;

//     boxDiv.appendChild(boxLink);
//     boxLink.appendChild(imgTag);
//     boxLink.appendChild(detailsDiv);
//     detailsDiv.appendChild(h3);
//     detailsDiv.appendChild(h4);
//     detailsDiv.appendChild(h2);

//     return boxDiv;
// }

// Fetch products
// let httpRequest = new XMLHttpRequest();
// httpRequest.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       contentTitle = JSON.parse(this.responseText);
        
//         // 🔑 FIX: Reference the elements here, ensuring they exist 
//         // after content.html has been loaded by your synchronous `load` function.
//         let containerClothing = document.getElementById("containerClothing");
//         let containerAccessories = document.getElementById("containerAccessories");

//         // Check if the containers were found
//         if (!containerClothing || !containerAccessories) {
//             console.error("Error: Product containers not found in the DOM.");
//             return;
//         }

//       for (let i = 0; i < contentTitle.length; i++) {
//           const product = contentTitle[i];
//           const section = product.isAccessory ? containerAccessories : containerClothing;
//           section.appendChild(dynamicClothingSection(product));
//       }
//     } else if (this.readyState === 4) {
//       console.log("Product fetch failed");
//     }
// };

// httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
// httpRequest.send();


// let httpRequest = new XMLHttpRequest();
// httpRequest.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//         // SUCCESS PATH (Product rendering code remains here)
//         // ...
//     } else if (this.readyState === 4) {
//         // ERROR PATH (HTTP request finished but status was not 200)
//         console.error("Product fetch failed. Status:", this.status);
        
//         // Add a message to the user:
//         const container = document.getElementById("3"); // Reference the main placeholder div
//         if (container) {
//             container.innerHTML = "<h2>Error loading products. Please check your network connection.</h2>";
//         }
//     }
// };

// httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
// httpRequest.send();



// // Import functions from the utility file
// import { updateCartBadge } from './cart-storage.js';

// let contentTitle;
// let containerClothing = document.getElementById("containerClothing");
// let containerAccessories = document.getElementById("containerAccessories");

// // Initialize cart badge when the page loads
// updateCartBadge();

// // Render product card
// function dynamicClothingSection(ob) {
//   let boxDiv = document.createElement("div");
//   boxDiv.id = "box";

//   // The link now wraps the entire box, allowing users to click anywhere to see details
//   let boxLink = document.createElement("a");
//   boxLink.href = "contentDetails.html?" + ob.id; // Link remains to the details page

//   let imgTag = document.createElement("img");
//   imgTag.src = ob.preview;

//   let detailsDiv = document.createElement("div");
//   detailsDiv.id = "details";

//   let h3 = document.createElement("h3");
//   h3.textContent = ob.name;

//   let h4 = document.createElement("h4");
//   h4.textContent = ob.brand;

//   let h2 = document.createElement("h2");
//   h2.textContent = "Ksh/- " + ob.price;

//     /* * ❌ REMOVED:
//      * We no longer create the 'Add to Cart' button here. 
//      * The product card is now purely for display and linking.
//      */

//   boxDiv.appendChild(boxLink);
//   boxLink.appendChild(imgTag);
//   boxLink.appendChild(detailsDiv);
//   detailsDiv.appendChild(h3);
//   detailsDiv.appendChild(h4);
//   detailsDiv.appendChild(h2);
//   
//   // Removed: detailsDiv.appendChild(addButton);

//   return boxDiv;
// }

// // Fetch products
// let httpRequest = new XMLHttpRequest();
// httpRequest.onreadystatechange = function () {
//   if (this.readyState === 4 && this.status === 200) {
//     contentTitle = JSON.parse(this.responseText);
//     for (let i = 0; i < contentTitle.length; i++) {
//       const product = contentTitle[i];
//       const section = product.isAccessory ? containerAccessories : containerClothing;
//       section.appendChild(dynamicClothingSection(product));
//     }
//   } else if (this.readyState === 4) {
//     console.log("Product fetch failed");
//   }
// };
// httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
// httpRequest.send();





// // Import functions from the utility file
// import { loadCart, addToCart, updateCartBadge } from './cart-storage.js';

// let contentTitle;
// // cartItems is no longer needed as a global variable, 
// // but we'll use loadCart to initialize the badge
// let containerClothing = document.getElementById("containerClothing");
// let containerAccessories = document.getElementById("containerAccessories");

// // Initialize cart badge when the page loads
// updateCartBadge();

// // Render product card
// function dynamicClothingSection(ob) {
//   let boxDiv = document.createElement("div");
//   boxDiv.id = "box";

//   let boxLink = document.createElement("a");
//   boxLink.href = "contentDetails.html?" + ob.id;

//   let imgTag = document.createElement("img");
//   imgTag.src = ob.preview;

//   let detailsDiv = document.createElement("div");
//   detailsDiv.id = "details";

//   let h3 = document.createElement("h3");
//   h3.textContent = ob.name;

//   let h4 = document.createElement("h4");
//   h4.textContent = ob.brand;

//   let h2 = document.createElement("h2");
//   h2.textContent = "Ksh/- " + ob.price;

//   let addButton = document.createElement("button");
//   addButton.textContent = "Add to Cart";
//   addButton.className = "add-to-cart";
//   
//   addButton.onclick = function () {
//     // Use the centralized utility function to add the item and get the new count
//     const newCount = addToCart(ob.id);
//     document.getElementById("badge").innerHTML = newCount;
//     alert(`${ob.name} added to cart`);
//   };

//   boxDiv.appendChild(boxLink);
//   boxLink.appendChild(imgTag);
//   boxLink.appendChild(detailsDiv);
//   detailsDiv.appendChild(h3);
//   detailsDiv.appendChild(h4);
//   detailsDiv.appendChild(h2);
//   detailsDiv.appendChild(addButton);

//   return boxDiv;
// }

// // Fetch products
// let httpRequest = new XMLHttpRequest();
// httpRequest.onreadystatechange = function () {
//   if (this.readyState === 4 && this.status === 200) {
//     contentTitle = JSON.parse(this.responseText);
//     for (let i = 0; i < contentTitle.length; i++) {
//       const product = contentTitle[i];
//       const section = product.isAccessory ? containerAccessories : containerClothing;
//       section.appendChild(dynamicClothingSection(product));
//     }
//   } else if (this.readyState === 4) {
//     console.log("Product fetch failed");
//   }
// };
// httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
// httpRequest.send();



