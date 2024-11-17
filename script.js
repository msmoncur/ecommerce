let products = []; 
let originalProducts = [];

let http = new XMLHttpRequest();

http.open('get', 'products.json', true); 
http.send(); 

http.onload = function() {
    if(this.readyState == 4 && this.status == 200){
        products = JSON.parse(this.responseText); 
        originalProducts = [...products];  // Store a copy of the original products for reset
        displayProducts(products); 
    }
}

// Function to display products
function displayProducts(productsToDisplay) {
    let output = ""; 
    for (let item of productsToDisplay) {
        output += `
           <div class="products">
              <img src="${item.image}" alt="${item.image}">
              <p class="title">${item.title}</p>
              <p class="description">${item.description}</p>
              <p class="price">${item.price}</p>
           </div>
        `;
    }
    document.querySelector(".product-list").innerHTML = output;
}

// Function that will sort products by price
function sortByPrice(order) {
    const productsCopy = [...products];  // Create a copy to avoid mutating the original array
    return productsCopy.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));  // grab number from price string
        const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      
        if (order === 'asc') {
            return priceA - priceB; 
        } else if (order === 'desc') {
            return priceB - priceA;
        }
    });
}

// Event listener for sorting by price or resetting to default view
document.getElementById('sort-price').addEventListener('change', function() {
    const selectedPriceSort = this.value;

    if (selectedPriceSort === 'default') {
        displayProducts([...originalProducts]);
    } else if (selectedPriceSort) {
        const sortedProducts = sortByPrice(selectedPriceSort);
        displayProducts(sortedProducts);
    }
});

