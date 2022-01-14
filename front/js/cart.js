





//* Récupérer le local storage

const kanapCart = JSON.parse(localStorage.getItem("kanapCart")) || [];


//* loop a travers le local storage pour recup Id des éléments
//* Fetch les données nécessaires des produits present dans le local storage dans la DB
//* Boucler pour créer un la carte remplie avec les données cherché au préalable  

//*Gérer la suppression d'articles
//*Gérer la modification de quantité
//*Gérer le prix affiché 


//* Vérifier les champs de formulaire.


//*Vérifier quantité avant envoi de la requete post
//*Requête POST
//*Afficher l'ID de la commande



            `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>Nom du produit</h2>
                        <p>Vert</p>
                        <p>42,00 €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                        </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`