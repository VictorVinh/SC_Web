let fetched = false;
let products = null;
async function getProduct(){
    if (fetched==true){
        var product_json = JSON.parse(localStorage.getItem("products"));
        return product_json;
    }
    const response = await fetch("https://dummyapi-0uzr.onrender.com/products");
    const fetchedProducts = await response.json();
    console.log(fetchedProducts);
    localStorage.setItem("products", JSON.stringify(fetchedProducts));
    products = fetchedProducts;
    return products;
}

function generate_product(product) {
    if (product.image) {
        product.image = "data:image/png;base64," +product.image;
        
    }
    const a_lot_products = `<div id="${product.name}">
        <img src="${product.image}" alt="${product.name}">
        <p>${product.discount? `${product.discount}%`: "" }</p>
        <p>${product.tag? `${product.tag}` :""}</p>
        
        <h3>${product.name}</h3>
        <p>${product.short_desc}</p>
        <h4>${product.unit_price} ${product.price}</h4>
        <p><del>${product.old_price? `${product.unit_price} ${product.old_price}` :""}</del></p>
        <div>
            <button>Add to cart</button>
            <a href=""><span class="material-icons">share</span>Share</a>
            <a href=""><span class="material-icons">sync_alt</span>Compare</a>
            <a href=""><span class="material-icons">favorite</span>Like</a>
        </div>
    </div>`
    return a_lot_products;
}
window.onload = async function printProduct() {
    await getProduct();
    
    if (window.location.pathname.includes('index.html')) {
        const productContainer = document.getElementById("column-1");
            for (const product of products) {
                const productElement = generate_product(product);
                productContainer.insertAdjacentHTML("beforeend", productElement);
            }
            for (const product of products) {
                const productElement = generate_product(product);
                productContainer.insertAdjacentHTML("beforeend", productElement);
            }
        } 
    if (window.location.pathname.includes('shop.html')) {
        const productContainer = document.getElementById("column-2");
            for (const product of products) {
                const productElement = generate_product(product);
                productContainer.insertAdjacentHTML("beforeend", productElement);
            }
            for (const product of products) {
                const productElement = generate_product(product);
                productContainer.insertAdjacentHTML("beforeend", productElement);
            }
            for (const product of products) {
                const productElement = generate_product(product);
                productContainer.insertAdjacentHTML("beforeend", productElement);
            }
            for (const product of products) {
                const productElement = generate_product(product);
                productContainer.insertAdjacentHTML("beforeend", productElement);
            }
        }
}
