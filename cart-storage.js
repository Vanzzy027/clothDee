const CART_STORAGE_KEY = 'dee_web_cart_items';
const BADGE_ELEMENT_ID = "badge";

/**
 * Loads the cart array from Local Storage.
 * @returns {string[]} An array of product IDs currently in the cart.
 */
export function loadCart() {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.error("Error loading cart from Local Storage:", error);
        return [];
    }
}

/**
 * Internal function to save cart to Local Storage.
 * @param {string[]} items
 * @returns {boolean} True if save was successful.
 */
function saveCart(items) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError' || error.name === 'SecurityError') {
            console.error("Local Storage limit reached. Cannot add item to cart.");
            alert("Sorry, the cart is full! Please proceed to checkout or remove some items.");
        } else {
            console.error("Error saving cart to Local Storage:", error);
        }
        return false;
    }
}

/**
 * Adds a product ID to the cart.
 * @param {string} productId
 * @returns {number} New total count in cart
 */
export function addToCart(productId) {
    const cartItems = loadCart();
    cartItems.push(productId);

    if (saveCart(cartItems)) {
        updateCartBadge(cartItems.length);
        return cartItems.length;
    }
    return cartItems.length - 1;
}

/**
 * Updates the cart badge element.
 * @param {number|null} count
 */
export function updateCartBadge(count = null) {
    const finalCount = (count !== null) ? count : loadCart().length;
    const badgeElement = document.getElementById(BADGE_ELEMENT_ID);
    if (badgeElement) {
        badgeElement.innerHTML = finalCount > 0 ? finalCount : '';
    }
}


