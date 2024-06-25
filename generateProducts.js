let fetched = false;
let products = null;
const addToCartButtons = document.querySelectorAll('#add_to_cart');
let cart=[];
let count=0;
let count_product=0;

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
    const heartButtonId = 'heart_button_' + product.name;
    const a_lot_products = `<div class="product" id="${product.name}">
        <img src="${product.image}" alt="${product.name}">
        <p>${product.discount? `${product.discount}%`: "" }</p>
        <p>${product.tag? `${product.tag}` :""}</p>
        
        <h3>${product.name}</h3>
        <p>${product.short_desc}</p>
        <h4>${product.unit_price} ${product.price}</h4>
        <p><del>${product.old_price? `${product.unit_price} ${product.old_price}` :""}</del></p>
        <div id="Hover_stuffs">
            <button id="add_to_cart">Add to cart</button>
            <a href=""><span class="material-icons">share</span>Share</a>
            <a href=""><span class="material-icons">sync_alt</span>Compare</a>
            <span class="material-icons heart_button" id="${heartButtonId}">favorite</span> Like
        </div>
    </div>`
    return a_lot_products;
}
async function printProduct() {
    await getProduct();
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith("/")) {
        const productContainer = document.getElementById("column-1");
        const product= await getProduct();
            for (const product of products) {
                const productElement = generate_product(product);
                productContainer.insertAdjacentHTML("beforeend", productElement);
            }
        addHeartButton();
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
        addHeartButton();
    }
    let button=document.getElementById("show-more-button");
    button.addEventListener("click", show_more_function);
}

async function show_more_function(){
    await getProduct();
    const products= await getProduct();
    const productContainer= document.getElementById("column-1");
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
    var heart_buttons = document.querySelectorAll(".heart_button");
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