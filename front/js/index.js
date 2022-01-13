

//* Load Config file

loadConfig()
    .then(data => {

        let config = data;

        //* Get JSON list of product from API
        fetch(config.host + "/api/products")
            .then(data => data.json())
            .then(jsonListProduct =>  {

                //* Loop through every product and display them
               jsonListProduct.forEach(product => {

                    let displayProduct = new Product(product);
                    document.querySelector("#items").innerHTML +=
                    `
                    <a href="./product.html?id=${displayProduct._id}">
                        <article>
                        <img src="${displayProduct.imageUrl}" 
                             alt="${displayProduct.altTxt}">
                        <h3 class="productName">${displayProduct.name}</h3>
                        <p class="productDescription">${displayProduct.description}</p>
                        </article>
                    </a>
                    `
               });
            })



    });