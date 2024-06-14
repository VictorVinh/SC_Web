const products = [
    {
        id: "Syltherin", 
        name: "Syltherin",
        image: "",
        discount: 30,
        tag: "-30%",
        short_desc: "Stylish cafe chair",
        unit_price: "Rp",
        price: 2500000,
        old_price: 3500000,
    },
    {
        id: "Leviosa",
        name: "Leviosa",
        image: "",
        discount: 30,
        tag: "-30%",
        short_desc: "Stylish cafe chair",
        unit_price: "Rp",
        price: 2500000,
    },
    {
        id: "Lolito",
        name: "Loilito",
        image: "",
        discount: 50,
        tag: "-50%",
        short_desc: "Luxury big sofa",
        unit_price: "Rp",
        price: 7000000,
    },
    {
        id: "Respira",
        name: "Respira",
        image: "",
        discount: 0,
        tag: "New",
        short_desc: "Outdoor bar table and stool",
        unit_price: "Rp",
        price: 500000,
    },
  ];
  
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
window.onload = function () {
    if (window.location.pathname === '/index.html') {
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
    if (window.location.pathname === '/shop.html') {
        const productContainer = document.getElementById("column-2");
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
