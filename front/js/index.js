const items = document.querySelector('#items');


const displayProducts = async() => {
    try{
        const config = await loadConfig();
        const products = await fetchData(config,`/api/products`);

        //*Create products template and display it on page
        let productsTemplate = products.map(productTemplate).join(''); 
        items.insertAdjacentHTML('beforeend', productsTemplate);
    }
    catch(Error){
        console.log(Error);
    }
}

//* Single product UI
const productTemplate = ({_id, imageUrl, altTxt, name, description}) => 
        `
        <a href="./product.html?id=${_id}">
            <article>
            <img src="${imageUrl}" 
                 alt="${altTxt}">
            <h3 class="productName">${name}</h3>
            <p class="productDescription">${description}</p>
            </article>
        </a>
        `;

displayProducts();