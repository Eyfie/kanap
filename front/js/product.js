


function getProductId(){
    
    let urlString = document.URL;
    let currentUrl = new URL(urlString);
    let product_id = currentUrl.searchParams.get("id");
    return product_id;
}

loadConfig()
    .then(data => {
       const config = data;
       let product_id = getProductId();

       fetch(config.host+"api/products/"+product_id)
        .then(data => data.json())
        .then(jsonProduct => {
            

        });

});

console.log(getProductId())