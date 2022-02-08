//*DOM Form selector

const firstNameField = document.querySelector('#firstName');
const lastNameField = document.querySelector('#lastName');
const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const emailField = document.querySelector('#email');
const submitButton = document.querySelector('#order');


//* Get all the data necessary for the order
const orderData = () => {
    
    let products = kanapCart.flatMap((item) => item._id);
    
    const contact = {
        firstName : firstNameField.value.trim(),
        lastName : lastNameField.value.trim(),
        address : addressField.value.trim(),
        city : cityField.value.trim(),
        email : emailField.value.trim()
    }

    return {products, contact};
}


//* Regex and error message associated for each instance that need to be checked
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


//*Function that display error message if the form input is not valid
const displayErrorMessage = (isValid, input, regexKey) => {

    let errorMessage = input.nextSibling;

    if(isValid == false) return errorMessage.textContent = regexKey.error;
    return errorMessage.textContent ='';
}


//* Check input of form field and return true or false if the input match or not the regex.
const checkInput = (e, regexKey) => {

    let input = e.target;
    let inputValue = input.value.trim();
    let isValid = false;

    if(inputValue.match(regexKey.regex)){
        isValid = true;
    }

    input.valid = isValid;
    displayErrorMessage(isValid, input, regexKey);
}


//* Check if the order is correctly set up
const checkOrder = (order) => {
        //*Check if there's a product to order
        if(order.products.length < 1) throw {text : 'Il vous faut au moins 1 article dans votre panier', icon : 'warning'};

        //* Check if every single form field is completed
        const contact = Object.values(order.contact);
        contact.forEach((value) => {
            if(value=='') throw {text : 'Remplissez entièrement le formulaire de contact', icon : 'warning'};
        });
}



//* Handle the order post 
const postOrder = async () => {
    try{
        const order = orderData();
        checkOrder(order);

        const config = await loadConfig();
        const {orderId} = await postData(config,`/api/products/order`, order);

        localStorage.removeItem('kanapCart');
        window.location.replace(`confirmation.html?order=${orderId}`);
        
    }
    catch(Error){
      Swal.fire(Error);
    }
}




//* Handle Submit event
const handleOrderSubmit = (event) => {
    try{
        event.preventDefault();

        //const inputs = Array.from(document.querySelectorAll('input:not([type="submit"], .itemQuantity)'));
        const inputs = [...document.querySelectorAll('input:not([type="submit"], .itemQuantity)')];
        const hasError = inputs.map((input) => input.valid).includes(false);


        if(hasError) throw {text :'Veuillez remplir les champs du formulaire correctement !', icon :'warning'};

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
