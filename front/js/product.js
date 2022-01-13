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

        //* Get product ID
        const product_id = getProductId();

        //* Fetch product data
        fetch(config.host + "/api/products/" + product_id)
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


//* Get page URL and get the ID in it
function getProductId(){
    
    let urlString = document.URL;
    let currentUrl = new URL(urlString);
    let product_id = currentUrl.searchParams.get("id");
    return product_id;
}


//* Check the item quantity and return its value if it's correct.
function checkItemQuantity(){
    try{

        let itemQuantity = quantityElem.value;

        if(isNaN(itemQuantity) || itemQuantity < 0 || itemQuantity > 100){    
            quantityElem.value = 1;

            throw Swal.fire({
                title : `Nombre invalide`,
                text : `Vous ne pouvez commander qu'entre 1 et 100 articles de ce type !`,
                icon : `warning`});
        }

        return itemQuantity;
    }

    catch(Error){
        console.log(Error);
    }
}



//* Check if item color is selected
function checkItemColor(){

    let itemColor = productColorsElem.value;
    if(!itemColor){
        throw Swal.fire({
            title : `Sélectionnez une couleur`,
            text : `Vous n'avez pas sélectionné de couleur`,
            icon : `warning`});
    }
    return itemColor;
}



//* Handling submit event
submitElem.addEventListener('click', () =>{
    try{
        //*Check if a color has been picked
        const color = productColorsElem.value;
        if(!color){
            throw Swal.fire({
                title : `Sélectionnez une couleur`,
                text : `Vous n'avez pas sélectionné de couleur`,
                icon : `warning`});
        }

        //*Check if there's a similar object in local storage and update it.
        //* Check if everything is fine.
        const quantityInput = quantityElem.value;
        let kanapCart = JSON.parse(localStorage.getItem('kanapCart'));

        //*loop à travers tous les articles du Cart
        kanapCart.map((kanapCartItem) => {

            //*Check si un article de même couleur et type se trouve dans le Cart
            if(item.productId == productId && item.color == color){

                let newQuantity = kanapCartItem.quantity + quantityInput;

                //*Check si la somme totale d'article n'est pas supérieure à 100
                if(newQuantity > 100){
                    let maxQuantity  = 100 - baseQuantity;
                    quantityElem.max = maxQuantity;
                    quantityElem.value = maxQuantity;
                    throw Swal.fire({
                        title : `Nombre invalide`,
                        text : `Vous ne pouvez commander qu'entre 1 et 100 articles de ce type !`,
                        icon : `warning`});
                }
            }

            return kanapCartItem.quantity = newQuantity;
            
        });


        //*Check if quantity is valid
        if(quantityInput == 0 || quantityInput < 0 || quantityInput > 100){
            quantityElem = 1;
            throw Swal.fire({
                title : `Nombre invalide`,
                text : `Vous ne pouvez commander qu'entre 1 et 100 articles de ce type !`,
                icon : `warning`});
        }
        
       
        let kanapCartItem = {productId, quantity, color};
        kanapCart = [...kanapCart,kanapCartItem];
        localStorage.setItem("kanapCart", JSON.stringify(kanapCart));


    }catch(error){
        console.log(error);
    }
});


/*kanapCart = [{R},{A},{B}]


kanapCart[0] = {id, quantity, color}


{12, 5, Bleu} => {12, Bleu} => {12, 25 + 5, Bleu}   (25+5) > 100 


const kanapCart = localStorage.getItem('kanapCart');

[{12,24,"Bleu"}, 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = kanapCart.map((item) =>
  {
  	if(item.id == _id && item.color == color){
    	let baseQuantity = item.quantity;
      	let newQuantity = item.quantity + quantity
      if(newQuantity > 100){
        alert('vous ne pouvez pas acheter plus de 100 articles')
        return baseQuantity
      }
     
      
    }
  
   return newQuantity;
});


localStorage.setItem('kanapCart', result)


console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]



function checkCart(){
    //JSON.parse(localStorage.getItem('kanapCart'));
    //* Parcours de kanapCart dans le localstorage
    const result = kanapCart.map((item) => {
        //*Check si l'item est déjà présent
        if(item.id == getProductId() && item.color == productcolor.value){
            let baseQuantity = item.quantity;
            let newQuantity = item.quantity + quantity;
            //* Check si la quantité d'articles n'est pas supérieur à 100.
            if(newQuantity > 100){
                maxAddQuantity = 100 - baseQuantity;
                quantity.value = maxAddQuantity;
                quantity.max = maxAddQuantity;
                throw Swal.fire(`Vous avez dépassé la limite de 100 articles, vous ne pouvez rajouter que ${maxAddQuantity} articles`);     
            }
        }
        //localStorage.setItem('kanapCart').item.quantity = newQuantity;

    })

}*/