//* Constant


//* Récupérer le local storage

let kanapCart = JSON.parse(localStorage.getItem("kanapCart")) || [];

//* loop a travers le local storage pour recup Id des éléments
//* Fetch les données nécessaires des produits present dans le local storage dans la DB


//* Display cart products
const displayCart = async () => {
    let cart = await getCartItems();
    cart.forEach((item) => cartUI(item));
}


//*Get DB/localstorage products and update them
const getCartItems = async () => {
    const config = await loadConfig();

    let cart= [];
    kanapCart.map(async (item) => {
    
        let product = await fetchData(config,`/api/products/${item.id}`);
      
        let quantity = item.quantity;
        product.colors = item.color;
        item ={...product,quantity};
        
        cart.push(item);
    })
    return cart;
}


displayCart();



//*Get cart and display its product property in cards
const cartUI = (item) => {    
        //cart.forEach((item) => {
        document.querySelector("#cart__items").innerHTML += 
        `
        <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
            <img src="${item.imageUrl}" alt="${item.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${item.name}</h2>
                    <p>${item.colors}</p>
                    <p>${item.price*item.quantity} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${item.quantity}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        `
    }//)




/*loadConfig()
    .then(data => {
        const config = data;
        let kanapCart = JSON.parse(localStorage.getItem("kanapCart")) || [];
        let cart=[];
        
        kanapCart.map((item) => {

            fetch(config.host +'/api/products/'+ item.id)
                .then(data => data.json())
                .then(product => {
                   
                    let quantity = item.quantity;
                    product.colors = item.color;
                    item = {...product,quantity};
                    

                    cart.push(item);
                })

        });
        console.log(cart);
    })

    .then((cart) =>{
        console.log(cart);
        cart.forEach((item) => {

        
        document.querySelector("#cart__items").innerHTML += 
        `
        <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
        <img src="${item.imageUrl}" alt="${item.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${item.colors}</p>
            <p>${item.price} €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : ${item.quantity}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
        </article>
        `
    })
    .catch((e) =>{
        console.log(e);
    });
    
*/


//* Boucler pour créer un la carte remplie avec les données cherché au préalable  

//*Gérer la suppression d'articles
//*Gérer la modification de quantité
//*Gérer le prix affiché 


//* Vérifier les champs de formulaire.


//*Vérifier quantité avant envoi de la requete post
//*Requête POST
//*Afficher l'ID de la commande

function quantityChange(){

    const quantityInput = document.querySelectorAll(".itemQuantity");
    quantityInput.forEach(input =>{
       input.previousElementSibling.textContent = input.value;
    });
}