// contentDetails.js (Updated to use Local Storage module)

// 1. Import the utility functions for cart management
import { addToCart, updateCartBadge } from './cart-storage.js'; 

console.clear();

// Get Product ID from URL
const id = location.search.split('?')[1];
console.log("Product ID:", id);

// 2. Initialize cart badge using the module helper (replaces old cookie logic)
updateCartBadge(); 

const containerProduct = document.getElementById('containerProduct');

// Render product details
function dynamicContentDetails(ob) {
    const mainContainer = document.createElement('div');
    mainContainer.id = 'containerD'; 

    const imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    const imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = ob.preview; // This should be the correct URL from the API
    imageSectionDiv.appendChild(imgTag);

    const productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    const h1 = document.createElement('h1');
    h1.textContent = ob.name;

    const h4 = document.createElement('h4');
    h4.textContent = ob.brand;

    const detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    const h3DetailsDiv = document.createElement('h3');
    h3DetailsDiv.id = 'h3DetailsDiv'; // Added ID for styling
    h3DetailsDiv.textContent = 'Ksh/- ' + ob.price;

    const h3 = document.createElement('h3');
    h3.textContent = 'Description';

    const para = document.createElement('p');
    para.textContent = ob.description;

    const productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    const h3ProductPreviewDiv = document.createElement('h3');
    h3ProductPreviewDiv.textContent = 'Product Preview';
    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    for (let i = 0; i < ob.photos.length; i++) {
        const previewImg = document.createElement('img');
        previewImg.id = 'previewImg';
        previewImg.src = ob.photos[i];
        
        // This logic is crucial for changing the main image
        previewImg.onclick = function () {
            imgTag.src = ob.photos[i];
        };
        productPreviewDiv.appendChild(previewImg);
    }

    const buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    const buttonTag = document.createElement('button');
    buttonTag.textContent = 'Add to Cart';
    
    // 3. Use the centralized utility function to add the item
    buttonTag.onclick = function () {
        const newCount = addToCart(id); 
        document.getElementById("badge").innerHTML = newCount;
        alert(`${ob.name} added to cart`);
    };

    buttonDiv.appendChild(buttonTag);

    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    detailsDiv.appendChild(h3DetailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(para);
    productDetailsDiv.appendChild(detailsDiv);
    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);

    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);
    containerProduct.appendChild(mainContainer);
}

// Fetch product data
const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        const contentDetails = JSON.parse(this.responseText);
        dynamicContentDetails(contentDetails);
    } else if (this.readyState === 4) {
        console.log('Failed to fetch product details');
    }
};
httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + id, true);
httpRequest.send();