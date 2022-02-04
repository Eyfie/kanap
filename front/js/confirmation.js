//* DOM element
const orderElem = document.querySelector('#orderId');


//* Display Order ID to user if there is one
const displayOrderid = () => {
    try{

        const currentUrl = new URL(window.location.href);
        const orderId = currentUrl.searchParams.get('order');

        if(!orderId) throw {text : 'Oups, un problème est survenu lors de votre commande. Veuillez contactez le support !'};
        orderElem.textContent = orderId;
        Swal.fire({
            text :`Votre numéro de commande : ${orderId}`
        })
    }
    catch(Error){
        Swal.fire(Error)
    }
}

displayOrderid();