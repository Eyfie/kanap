//* Product Constant
const image = document.querySelector(".item__img");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const title = document.querySelector("#title");
const productColors = document.querySelector("#colors");

//* Form Constant
const quantity = document.querySelector("#quantity");
const submit = document.querySelector('#addToCart');

/*
const myFunction = () => {
    //* function code
}

function myFunction(){
    //* function code
}
*/

// TODO : Gérer le cas ou il l'id produit dans l'URL est pas bonne.
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
                    image.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
                    price.textContent = product.price;
                    description.textContent = product.description;
                    title.textContent = product.name;
                    document.title = product.name;

                    //* Loop through colors and display them in options
                    let colors = product.colors;
                    colors.forEach(color=> {
                        productColors.innerHTML += `<option value="${color}">${color}</option>`;
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

        let itemQuantity = quantity.value;

        if(isNaN(itemQuantity) || itemQuantity < 0 || itemQuantity > 100){    
            quantity.value = 1;

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

    let itemColor = productcolors.value;
    if(!itemColor){
        throw Swal.fire({
            title : `Sélectionnez une couleur`,
            text : `Vous n'avez pas sélectionné de couleur`,
            icon : `warning`});
    }
    return itemColor;
}



//* Handling submit event
submit.addEventListener('click', (e) =>{
    try{
        //* Check if everything is fine
        e.preventDefault;
        const quantity = checkItemQuantity();
        const color = checkItemColor();
        console.log(quantity, color);
    localStorage.getItem('kanapCart')


    localStorage.setItem('kanapCart', {12, 25, Bleu})
    }
    catch(Error){
        console.log(Error);
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

*/