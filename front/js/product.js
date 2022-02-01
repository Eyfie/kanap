//* Product Constant
const imageElem = document.querySelector(".item__img");
const priceElem = document.querySelector("#price");
const descriptionElem = document.querySelector("#description");
const titleElem = document.querySelector("#title");
const productColorsElem = document.querySelector("#colors");

//* Form Constant
const quantityElem = document.querySelector("#quantity");
const submitElem = document.querySelector('#addToCart');


//*URL Id
const currentUrl = new URL(window.location.href);
const productId = currentUrl.searchParams.get("id");

//*Get and display product on page
const displayProduct = async () => {
    const config = await loadConfig();
    const product = await fetchData(config, `/api/products/${productId}`);
    productUI(product);
}


//*UI component of the product
const productUI = (product) => {   
     
    //* Display product data on page
    imageElem.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    priceElem.textContent = product.price;
    descriptionElem.textContent = product.description;
    titleElem.textContent = product.name;
    document.title = product.name;

    //* Loop through colors and display them in options
    let colors = product.colors;
    let colorDisplay = colors.map((color) => `<option value="${color}">${color}</option>`);
    productColorsElem.insertAdjacentHTML('beforeend', colorDisplay);
};


displayProduct();


//*Update cart product and product quantity
const updateCart = ({id, color, quantity}) => {

    let kanapCart = JSON.parse(localStorage.getItem('kanapCart')) || [];
    const productIndex = kanapCart.findIndex((i) => i.id == id && i.color == color);
    
    //*Checking if there's a similar product in the cart
    if(productIndex !== -1){
        
        let newQuantity = kanapCart[productIndex].quantity + quantity;

        if(newQuantity > 100){

            //* Check quantity left before the 100 limit
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
        //* Push product in the cart because there's not a similar one in it
        kanapCart.push({id : productId, color, quantity});
    }

    localStorage.setItem('kanapCart', JSON.stringify(kanapCart));
};



//* Handling the submit Event 
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
            if(isNaN(quantity) || quantity == 0 || quantity < 0 || quantity > 100){
                quantityElem.value = 1;
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


