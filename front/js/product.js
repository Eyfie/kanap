//* Product Constant
const imageElem = document.querySelector(".item__img");
const priceElem = document.querySelector("#price");
const descriptionElem = document.querySelector("#description");
const titleElem = document.querySelector("#title");
const productColorsElem = document.querySelector("#colors");

//* Form Constant
const quantityElem = document.querySelector("#quantity");
const submitElem = document.querySelector('#addToCart');


//*URL

const urlString = document.URL;
const currentUrl = new URL(urlString);
const productId = currentUrl.searchParams.get("id");


// TODO : Gérer le cas ou l'id produit dans l'URL est pas bonne.
//* Load Config file
loadConfig()
    .then(data => {
        
        const config = data;

        //* Fetch product data
        fetch(config.host + "/api/products/" + productId)
            .then(data => data.json())
            .then(product => {

                if(Object.keys(product).length === 0){
                    throw Swal.fire({
                        title : `ID invalide`,
                        text : `Ce produit n'existe pas !`,
                        icon : `warning`
                    })
                }
                    //* Display product data on page
                    imageElem.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
                    priceElem.textContent = product.price;
                    descriptionElem.textContent = product.description;
                    titleElem.textContent = product.name;
                    document.title = product.name;

                    //* Loop through colors and display them in options
                    let colors = product.colors;
                    colors.forEach(color=> {
                        productColorsElem.innerHTML += `<option value="${color}">${color}</option>`;
                    });

            }) 

            .catch((error) => {
                console.log(error)
            });  
    });



const updateCart = ({id, color, quantity}) => {

    let kanapCart = JSON.parse(localStorage.getItem('kanapCart')) || [];
    const productIndex = kanapCart.findIndex((i) => i.id == id && i.color == color);
   
    if(productIndex !== -1){
        
        let newQuantity = kanapCart[productIndex].quantity + quantity;

        if(newQuantity > 100){

            //* Calcul la quantité maximum avant d'atteindre 100 articles
            const maxQuantity = 100 - kanapCart[productIndex].quantity;
    
            //* Notify user of  the number of products he can order before reaching the limit of 100
            
            throw Swal.fire({
                title : `Nombre invalide`,
                text : `Vous ne pouvez commander que ${maxQuantity} articles avant d'atteindre le seuil des 100 articles !`,
                icon : `warning`
            });
        }

        //* Change quantity value of the selected object
        kanapCart[productIndex].quantity = newQuantity;
    }
    else{
        //* Push l'objet dans le tableau car il n'existe pas encore
        kanapCart.push({id : productId, color, quantity});
    }

    localStorage.setItem('kanapCart', JSON.stringify(kanapCart));
};




const handleSubmitButton = () => {
    try{
            let quantity = parseInt(quantityElem.value);
            const color = productColorsElem.value;


            //*Check if a color has been selected
            if(!color){
                return Swal.fire({
                    title : `Sélectionnez une couleur`,
                    text : `Vous n'avez pas sélectionné de couleur`,
                    icon : `warning`});
            }

            //*Check if the quantity input is valid and if not reset the value to 1
            if(quantity == 0 || quantity < 0 || quantity > 100){
                quantity = 1;
                return Swal.fire({
                    title : `Nombre invalide`,
                    text : `Vous ne pouvez commander qu'entre 1 et 100 articles de ce type !`,
                    icon : `warning`});
            }

            //* Update the cart
            updateCart({id : productId, color, quantity});

            //* Notify user that his cart is updated
            return Swal.fire({
                title : `Vos articles ont été ajoutés à votre panier.`,
                timer : 1500,
                showConfirmButton : false,
                icon : `success`});
    }
    catch(e){
        console.log(e);
    }
};

//* Event Listeners

submitElem.addEventListener("click", handleSubmitButton);


