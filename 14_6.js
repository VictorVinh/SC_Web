// this.fetched=false
async function getProduct(){
    let product= await fetch("https://dummyjson.com/products");
    let product_json= await product.json();
    product_json=product_json.products;
    console.log(product_json);
    sessionStorage.setItem("1",JSON.stringify(product_json));
    return product_json;
}
getProduct();

