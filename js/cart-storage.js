const CART_STORAGE_KEY = 'dee_web_cart_items';

/**
 * Loads the cart array from Local Storage.
 * @returns {string[]} An array of product IDs currently in the cart.
 */
export function loadCart() {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        // If raw data exists, parse it, otherwise return an empty array
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error("Error loading cart from Local Storage:", error);
        return []; // Return an empty array on error
    }
}

/**
 * Saves the given array of product IDs to Local Storage.
 * @param {string[]} items - The array of product IDs to save.
 */
export function saveCart(items) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error("Error saving cart to Local Storage:", error);
    }
}

/**
 * Adds a single product ID to the cart and saves it.
 * @param {string} productId - The ID of the product to add.
 * @returns {number} The new total count of items in the cart.
 */
export function addToCart(productId) {
    const cartItems = loadCart();
    cartItems.push(productId);
    saveCart(cartItems);
    return cartItems.length;
}

/**
 * Updates the visual badge (counter) element with the current cart count.
 */
export function updateCartBadge() {
    const cartItems = loadCart();
    const badgeElement = document.getElementById("badge");
    if (badgeElement) {
        badgeElement.innerHTML = cartItems.length;
    }
}

// export function saveCart(items) {
//     try {
//         const serializedItems = JSON.stringify(items);
//         localStorage.setItem(CART_STORAGE_KEY, serializedItems);
//     } catch (error) {
//         // This is the crucial part: handling the QuotaExceededError
//         if (error.name === 'QuotaExceededError' || error.name === 'SecurityError') {
//             console.error("Local Storage limit reached. Cannot add item to cart.");
//             alert("Sorry, the cart is full! Please proceed to checkout or remove some items.");
//             // OPTIONAL: You might want to remove the last added item from the list
//             // to revert the cart to its last valid state before the error alert.
//         } else {
//             console.error("Error saving cart to Local Storage:", error);
//         }
//     }
// }