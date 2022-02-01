//*DOM Form selector

const firstNameField = document.querySelector('#firstName');
const lastNameField = document.querySelector('#lastName');
const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const emailField = document.querySelector('#email');
const submitButton = document.querySelector('#order');



const orderData = () => {
    
    let products = kanapCart.map((item) => item._id);
     
    const contact = {
        firstName : firstNameField.value.trim(),
        lastName : lastNameField.value.trim(),
        address : addressField.value.trim(),
        city : cityField.value.trim(),
        email : emailField.value.trim()
    }

    return {products, contact};
}



const regex = {
    name : {
        regex : /^[A-Za-zÀ-ÿ-' ]{3,}$/g,
        error : "Ce champ doit contenir 3 lettres au minimum"
    },
    address : {
        regex: /^[0-9A-Za-zÀ-ÿ-', ]{3,}$/g,
        error : "Ce champ doit contenir un minimum de 3 lettres et/ou chiffres"
    },
    email : {
        regex : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        error : "Adresse e-mail invalide"
    }
}



//* Check input of form field and return true or false if the input match or not the regex.
const checkInput = (e, regex) => {

    let input = e.target;
    let inputValue = input.value.trim();
    let isValid = false;

    if(inputValue.match(regex.regex)){
        isValid = true;
    }

    input.valid = isValid;
    displayErrorMessage(isValid, input, regex);
}



//*Function that display error message if the input is not valid
const displayErrorMessage = (isValid, input, regex) => {

    let errorMessage = input.nextSibling;

    if(isValid == false) return errorMessage.textContent = regex.error;
    return errorMessage.textContent ='';
}



const postOrder = async () => {
    try{
        const order = orderData();


        //*Check if there's a product to order
        if(order.products.length < 1) throw Swal.fire('Il vous faut au moins 1 article dans votre panier');

        //* Check if every single form field is completed
        const contact = Object.values(order.contact);
        contact.forEach((value) => {if(value=='') throw Swal.fire('Remplissez entièrement le formulaire de contact');});
    

        const config = await loadConfig();
        const {orderId} = await postData(config,`/api/products/order`, order);

        localStorage.removeItem('kanapCart');
        window.location.replace(`confirmation.html?order=${orderId}`);
        
    }
    catch(Error){
       
    }
}

const handleOrderSubmit = (e) => {
    try{
        e.preventDefault();

        let inputs = Array.from(document.querySelectorAll('input:not([type="submit"], .itemQuantity)'));
        let hasError = inputs.map((input) => input.valid).includes(false);


        if(hasError) throw Error = 'Veuillez remplir les champs du formulaire correctement !';

        postOrder();
    }
    catch(Error){
        Swal.fire(Error);
    }
}



submitButton.addEventListener('click', handleOrderSubmit);
firstNameField.addEventListener('input', (e) => checkInput(e, regex.name));
lastNameField.addEventListener('input', (e) => checkInput(e, regex.name));
addressField.addEventListener('input', (e) => checkInput(e, regex.address));
cityField.addEventListener('input', (e) => checkInput(e, regex.name));
emailField.addEventListener('input', (e) => checkInput(e, regex.email));
