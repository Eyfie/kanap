
//* Local Storage

let kanapCart = JSON.parse(localStorage.getItem("kanapCart")) || [];


//* Display cart products
const displayCart = async () =>{
    let cart = await getCartItems();
    //cart.forEach((item) => && cartUI(item));
    cartUI(cart);
}


//*Get DB/localstorage products and update them
const getCartItems = async () =>{

    const config = await loadConfig();

    let fullCart = [];

    kanapCart.map(async (item) => {
    
        let product = await fetchData(config,`/api/products/${item.id}`);
    
        let quantity = item.quantity;
        product.colors = item.color;
        item ={...product,quantity};
        
        fullCart.push(item);
    })
    return fullCart;
}

//*Get cart and display its product property in cards
const cartUI = (cart) =>{   
    
    cart.forEach((item) => {

        document.querySelector("#cart__items").insertAdjacentHTML('beforeend', 
        `
        <article class="cart__item" data-id="${item._id}" data-color="${item.colors}">
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
        `);
    });

}


displayCart();



