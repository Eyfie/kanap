//* DOM cart selector

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



//* Display cart total price
const updateCartTotal = () => {
    
    let totalPrice = 0;
    let totalItems = 0;

    //*loop through cart and add all prices and quantities together
    kanapCart.forEach((item) => {
        totalPrice += item.price*item.quantity;
        totalItems += parseInt(item.quantity);
    })

    //*Display cart price and number of items
    cartQuantity.textContent = `${totalItems} ${totalItems == 1 ? 'article' : 'articles'}`;
    cartPrice.textContent = totalPrice;
}


//* Handle the quantity change of an item in local storage cart
const changeCartItemQuantity = ({id, color, quantity}) => {

    const itemIndex = kanapCart.findIndex((index) => index._id === id && index.color === color);
    kanapCart[itemIndex].quantity = quantity;

    const newCart = kanapCart.map((item) => ({id : item._id, color : item.color, quantity : item.quantity}));
    localStorage.setItem('kanapCart', JSON.stringify(newCart));

}


//* Handle quantity change of an item input 
const handleQuantityInput = (e) =>{

    const selectedItem = e.target.closest('[data-id]');
    const {id, color} = selectedItem.dataset;
    const quantity = e.target.value;

    if( isNaN(quantity) || quantity <= 0 || quantity > 100){
        
        return Swal.fire({
            title : `Nombre invalide`,
            text : `Vous ne pouvez commander qu'entre 1 et 100 articles de ce type !`,
            icon : `warning`});
    }

    e.target.previousElementSibling.textContent = `Qté : ${quantity}`;
   
    changeCartItemQuantity({id, color, quantity});
    updateCartTotal();

}



//* Delete selected item from the storage cart
const deleteCartItem = ({id, color}) => {

    //* Remove item from local storage cart.
    const itemIndex = kanapCart.findIndex((index) => index._id === id && index.color === color);
    kanapCart.splice(itemIndex, 1);

    //* Push new Cart without the item in local storage
    const newCart = kanapCart.map((item) => ({id : item._id, color : item.color, quantity : item.quantity}));
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
    updateCartTotal();

    //* Notify user
    return Swal.fire({
        title: `Votre article a bien été supprimé`,
        timer: 2000,
        showConfirmButton: false,
        icon: `success`
    });
}



//* Display cart element on page
const displayCart = async() => {
    try{

        //* Generate cart item elements and display them
        kanapCart = await Promise.all(kanapCart.map(async (item) => createItem(item)));
        cartElem.innerHTML = kanapCart.map(cartItemTemplate).join('');

        //* Add delete Button event listeners for each cart item
        const deleteButtons = document.querySelectorAll('.deleteItem');
        deleteButtons.forEach((button) => button.addEventListener('click', handleDeleteButton));

        //* Add event listener for each cart item quantity input
        const quantityInputs = document.querySelectorAll('.itemQuantity');
        quantityInputs.forEach((input) => input.addEventListener('change', handleQuantityInput));

        
        updateCartTotal();
        

    }
    catch(Error){
        console.log(Error);
    }
}


//* Function calls
displayCart();




