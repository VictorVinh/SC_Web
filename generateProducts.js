let fetched = false;
let products = null;
async function getProduct(){
    if (fetched){
        var product_json = JSON.parse(localStorage.getItem("products"));
        return product_json;
    }
    let response;
    if (window.location.pathname.includes('shop.html')) {
        response = await fetch("https://dummyapi-0uzr.onrender.com/products?limit=4");
    } else {
        response = await fetch("https://dummyapi-0uzr.onrender.com/products");
    }
    let fetchedProducts = await response.json();
    fetchedProducts=fetchedProducts.product_list;
    console.log(fetchedProducts);
    localStorage.setItem("products", JSON.stringify(fetchedProducts));
    products = fetchedProducts;
    fetched=true;
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
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith("/")) {
        const productContainer = document.getElementById("column-1");
        const product= await getProduct();
            for (const product of products) {
                const productElement = generate_product(product);
                productContainer.insertAdjacentHTML("beforeend", productElement);
            }
        } 
    if (window.location.pathname.endsWith('shop.html')) {
        const productContainer = document.getElementById("column-2");
        for (let i = 0; i <= 3; i++) { 
            const moreProducts = await getProduct();
            for (const product of moreProducts) {
                const productElement = generate_product(product);
                productContainer.insertAdjacentHTML("beforeend", productElement);
            }
        }
    }
    const button=document.getElementById("show-more-button");
    button.addEventListener("click", show_more_function);
}

let count=0;
let count_product=0;
async function show_more_function(){
    await getProduct();
    const products= await getProduct();
    const productContainer = document.getElementById("column-1");
    if (count%2==0){
        for (const product of products.slice(0,4)) {
            const productElement = generate_product(product);
            productContainer.insertAdjacentHTML("beforeend", productElement);
        }
    }
    else {
        for (const product of products.slice(4,products.length)) {
            const productElement = generate_product(product);
            productContainer.insertAdjacentHTML("beforeend", productElement);
        }
    }
    count+=1;
    count_product+=4;
    if (count_product>=products.length){
        button.disabled=true;
    }
}

