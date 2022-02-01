//* DOM element
const orderElem = document.querySelector('#orderId');

//* ORDER ID
const currentUrl = new URL(window.location.href);
const orderId = currentUrl.searchParams.get('order');


//* Display Order ID to user if there is one
const displayOrderid = () => {
    try{
        if(!orderId) throw message = 'Oups, un problème est survenu lors de votre commande. Veuillez contactez le support !';
        orderElem.textContent = orderId;
        Swal.fire({
            text :`Votre numéro de commande : ${orderId}`
        })
    }
    catch(e){
        Swal.fire(message)
    }
}

displayOrderid();