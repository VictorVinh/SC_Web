let fetched = false;
let products = null;
const addToCartButtons = document.querySelectorAll('#add_to_cart');
let cart=[];
var count=0;
var count_product=0;

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
    let heartButtonId = 'heart_button_' + product.name;
    let a_lot_products = `<div class="product" id="${product.name}">
        <img src="${product.image}" alt="${product.name}">
        <p ${product.tag ? (product.discount ? 'class="discount_circle"' : 'class="tag_circle"') : product.discount? 'class="discount_circle"' :''}>
            ${product.discount ? `-${product.discount}%` : (product.tag ? `${product.tag}` : "")}
        </p>
        
        <h3>${product.name}</h3>
        <p class="desc">${product.short_desc}</p>
        <h4>${product.unit_price} ${product.price}</h4>
        <p class="desc"><del>${product.old_price? `${product.unit_price} ${product.old_price}` :""}</del></p>
        <div class="Hover_stuffs">
            <button class="add_to_cart button">Add to cart</button>
            <a href=""><span class="material-icons">share</span>Share</a>
            <a href=""><span class="material-icons">sync_alt</span>Compare</a>
            <span class="material-icons heart_button list" id="${heartButtonId}" ${localStorage.getItem(heartButtonId) === 'active'? 'class="active"' : ''}>favorite</span> Like
        </div>
    </div>`
    return a_lot_products;
}

async function printProduct() {
    await getProduct();
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith("/")) {
        const productContainer = document.getElementById("row1");
        const product= await getProduct();
            for (const product of products) {
                const productElement = generate_product(product);
                productContainer.insertAdjacentHTML("beforeend", productElement);
            }
        let button=document.getElementById("show-more-button");
        button.addEventListener("click", show_more_function);
        addHeartButton();
    } 
    if (window.location.pathname.endsWith('shop.html')) {
        const productContainer = document.getElementById("row2");
        for (let i = 0; i <= 3; i++) { 
            const moreProducts = await getProduct();
            for (const product of moreProducts) {
                const productElement = generate_product(product);
                productContainer.insertAdjacentHTML("beforeend", productElement);
            }
        addHeartButton();
    }
    }
}

async function show_more_function(){
    await getProduct();
    const products= await getProduct();
    const productContainer= document.getElementById("row1");
    let start= count_product;
    let end= count_product + 4;
    if (end > 40) {
        end = 40;
    }
    for (const product of products.slice(start, end)) {
        const productElement = generate_product(product);
        productContainer.insertAdjacentHTML("beforeend", productElement);
    }
    count += 1;
    count_product += 4;
    if (count_product >= 40) {
        button.disabled = true;
    }
    addHeartButton();
}

function addHeartButton(){
    const heart_buttons = document.querySelectorAll(".heart_button");
    heart_buttons.forEach(function(button) {
        var buttonId = button.id;
        if (localStorage.getItem(buttonId) === 'active') {
            button.classList.add('active');
        }
        button.addEventListener('click', function(event) {
            this.classList.toggle('active');
            var buttonState = this.classList.contains('active');
            if (buttonState) {
                localStorage.setItem(buttonId, 'active');
            } else {
                localStorage.removeItem(buttonId);
            }
        });
    });
}

printProduct();