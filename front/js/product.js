


//* Load Config file
loadConfig()
    .then(data => {

        const config = data;

        //* Get product ID
        const product_id = getProductId();

        //* Fetch product data
        fetch(config.host + "/api/products/" + product_id)
            .then(data => data.json())
            .then(product => {

                //* Display product data on page
                document.querySelector(".item__img").innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
                document.querySelector("#price").textContent = product.price;
                document.querySelector("#description").textContent = product.description;
                document.querySelector("#title").textContent = product.name;
                document.title = product.name;

                //* Loop through colors and display them in options
                let colors = product.colors;
                colors.forEach(color=> {
                    document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`;
            });
        });
});


//* Get page URL and get the ID in it
function getProductId(){
    
    let urlString = document.URL;
    let currentUrl = new URL(urlString);
    let product_id = currentUrl.searchParams.get("id");
    return product_id;
}