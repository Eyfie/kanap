//* DOM selector
const cartElem = document.querySelector('#cart__items');
const cartPrice = document.querySelector('#totalPrice');
const cartQuantity = document.querySelector('#totalQuantity');


//* Local Storage

let kanapCart = JSON.parse(localStorage.getItem("kanapCart")) || [];


//*Template for 1 item
cartItemTemplate = ({_id, color, quantity, name, price, imageUrl, altTxt}) => 
`
<article class="cart__item" data-id="${_id}" data-color="${color}">
    <div class="cart__item__img">
    <img src="${imageUrl}" alt="${altTxt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${name}</h2>
            <p>${color}</p>
            <p>${price} €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : ${quantity}</p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article>
`;

//* Get cart item and product data into an object
const createItem = async ({id, color, quantity}) => {
    const config = await loadConfig();
    const product = await fetchData(config,`/api/products/${id}`);
    return {...product,color,quantity};
}



//* Delete selected item from the storage cart
const deleteCartItem = ({id, color}) => {

    //* Remove item from local storage cart.
    const itemIndex = kanapCart.findIndex((index) => index._id === id && index.color === color);
    kanapCart.splice(itemIndex, 1);

    //* Push new Cart without the item in local storage
    const newCart = kanapCart.map((item) => ({id : item._id, color : item.color, qunatity : item.quantity}));
    localStorage.setItem('kanapCart', JSON.stringify(newCart));
}

//* Handle click on delete button 
const handleDeleteButton = (e) => {

    //* Get id & color of clicked item
    const selectedItem = e.target.closest('[data-id]');
    const { id, color } = selectedItem.dataset;

    //* Remove DOM element
    selectedItem.remove();

    //*Remove clicked item from the storage cart
    deleteCartItem({ id, color });

    //* Notify user
    return Swal.fire({
        title: `Votre article a bien été supprimé`,
        timer: 1500,
        showConfirmButton: false,
        icon: `success`
    });
}




const displayCart = async() => {
    try{

        kanapCart = await Promise.all(kanapCart.map(async (item) => createItem(item)));
        cartElem.innerHTML = kanapCart.map(cartItemTemplate).join('');


        const deleteButtons = document.querySelectorAll('.deleteItem');
        deleteButtons.forEach((button) => button.addEventListener('click', handleDeleteButton));

    }
    catch(e){
        console.log(e);
    }
}


//* Function calls
displayCart();