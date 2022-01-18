//* Create UI for each product
const productUI = (products) =>{
    products.forEach((product) => {

        document.querySelector('#items').innerHTML +=
        `
        <a href="./product.html?id=${product._id}">
            <article>
            <img src="${product.imageUrl}" 
                 alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            </article>
        </a>
        `
    })
}

//*Display products on index page
const displayProducts = async () =>{
    const config = await loadConfig();
    const products = await fetchData(config, `/api/products`);
    productUI(products);
}


displayProducts();