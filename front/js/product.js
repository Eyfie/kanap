


//* Load Config file
loadConfig()
    .then(data => {

        let config = data;

       //* Get product ID
       let product_id = getProductId();

        //* Fetch product data
       fetch(config.host + "api/products/" + product_id)
        .then(data => data.json())
        .then(jsonProduct => {

            //* Display product data on page
            document.title = jsonProduct.name + '- Kanap';
            document.querySelector(".item__img").innerHTML += `<img src="${jsonProduct.imageUrl}" alt="${jsonProduct.altTxt}">`
            document.querySelector("#description").textContent = jsonProduct.description

            //jsonProduct.colors.forEach(color => {
              //  document.querySelector('')
            //});

        });

});


//* Get page URL and get the ID in it
function getProductId(){
    
    let urlString = document.URL;
    let currentUrl = new URL(urlString);
    let product_id = currentUrl.searchParams.get("id");
    return product_id;
}



console.log(getProductId())