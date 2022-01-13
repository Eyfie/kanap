//* Product Constant
const imageElem = document.querySelector(".item__img");
const priceElem = document.querySelector("#price");
const descriptionElem = document.querySelector("#description");
const titleElem = document.querySelector("#title");
const productColorsElem = document.querySelector("#colors");

//* Form Constant
let quantityElem = document.querySelector("#quantity");
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
         //*Check if quantity is valid
         let quantityInput = quantityElem.value;
         console.log(quantityInput);
         if(quantityInput == 0 || quantityInput < 0 || quantityInput > 100){
            quantityInput = 1;
            throw Swal.fire({
                title : `Nombre invalide`,
                text : `Vous ne pouvez commander qu'entre 1 et 100 articles de ce type !`,
                icon : `warning`});
        }

        //*Check if there's a similar object in local storage and update it.
        let kanapCart = JSON.parse(localStorage.getItem('kanapCart')) || [];

        //*loop à travers tous les articles du Cart
        kanapCart.map((item => {

            //*Check si un article de même couleur et type se trouve dans le Cart
            if(item.productId == productId && item.color == color){

                let newQuantity = item.quantityInput + quantityInput;
                console.log(newQuantity)
                //*Check si la somme totale d'article n'est pas supérieure à 100
                if(newQuantity > 100){
                    let maxQuantity  = 100 - item.quantityInput;
                    quantityElem.max = maxQuantity;
                    quantityElem.value = maxQuantity;
                    throw Swal.fire({
                        title : `Nombre invalide`,
                        text : `Vous ne pouvez commander que ${maxQuantity} avant d'atteindre le seuil de 100 articles !`,
                        icon : `warning`});
                }

                item.quantityInput = parseFloat(item.quantityInput) + parseFloat(quantityInput);
            }

            
            
        }));

        let kanapCartItem = {productId, quantityInput, color};
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






//* Check si item est déjà dans storage
//* Si item dans storage update quantité
//* Si quantity > 100 retour sur le max possible a commander
//* Mettre article dans storage
