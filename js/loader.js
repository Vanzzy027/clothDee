// loader.js

/**
 * Asynchronously loads content from a URL and inserts it into a target element ID.
 * Returns a Promise that resolves when the content is loaded.
 */
function loadAsync(id, url) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        // The third parameter 'true' makes the request ASYNCHRONOUS.
        req.open("GET", url, true); 
        
        req.onload = function() {
            if (req.status === 200) {
                const target = document.getElementById(id);
                if (target) {
                    target.innerHTML = req.responseText;
                    resolve(); // Content loaded successfully
                } else {
                    // Log an error if the target div ID is missing in the main HTML
                    console.error(`Error: Target element #${id} not found in the DOM for URL: ${url}`);
                    reject(new Error(`Target element #${id} not found.`));
                }
            } else {
                console.error(`Failed to load ${url}. Status: ${req.status}`);
                reject(new Error(`Load failed with status ${req.status}`));
            }
        };
        
        req.onerror = function() {
            console.error(`Network error while loading ${url}`);
            reject(new Error("Network error"));
        };
        
        req.send();
    });
}

// 💥 THE CRUCIAL FIX: Attach the function to the global window object.
// This makes it available to the subsequent <script type="module"> block.
window.loadAsync = loadAsync;