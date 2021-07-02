const API_URL = 'http://localhost:3000/';

//Recuperation de l'URL
let params = (new URL(document.location)).searchParams;

//Stockage de l'ID 
const id = params.get("id");

let container = document.getElementById("product");

const addLocalStorage = panier => {
  localStorage.setItem('panier', JSON.stringify(panier));
};

/* renderProduct(); */
const display = teddies => {
  container.innerHTML +=`
    <div class="col" id="cardsProduct">
      <img src=${teddies.imageUrl} alt="photo ${teddies.name}">
      <div class="description">
        <p class="nom">${teddies.name}</p>
        <span class="appareil-description">
          ${teddies.description}
        </span>
        <select class="options" id ="option">
          <option>Choix options</option>
        </select>
        <p class="prix"> Prix Unitaire: ${teddies.price/ 100}€</p>
        <select class="quantite" id="quantity">           
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>         
        <a href ="/frontend/pages/shop.html"><button type ="submit" id="panier" value="submit"> Ajouter au panier</button></a>
      </div>
    </div>
  `;
  for (let lenses in teddies.lenses){
    document.getElementById('option').innerHTML+=
    `<option>${lenses}</option>`
    console.log(lenses);
  }
  document.getElementById('panier').addEventListener('click', function () {
    addProductShop(teddies);
  });
};

const addProductShop = teddies => {
  teddies.quantity = parseInt(document.getElementById('quantity').value);

  let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

  let teddiesExistIndex = false;
  for (let i = 0; i < panier.length; i++) {
    let product = panier[i];
    if (product.id === teddies.id) {
      teddiesExistIndex = i;
    }
  };
  if (false !== teddiesExistIndex) {
    panier[teddiesExistIndex].quantity = parseInt(panier[teddiesExistIndex].quantity) + teddies.quantity;
  } else {
    panier.push(teddies);
  };
  addLocalStorage(panier)
};

// call api URL
fetch(`${API_URL}api/teddies/` + id)
.then(function(res) {
    if (res.ok) {
        return res.json();
      }
})
.then(function(data) {
    let teddies = new Teddies(data)
    display(teddies);

})
.catch(function(err) {
    // error has occurred
});

/* function renderProduct(data) {
    const cardTemplate = document.querySelector('#template .col');
    const listProduct = document.getElementById("product"); 
    console.log(data);

    let card = cardTemplate.cloneNode(true);

    card.querySelector('.product-img').setAttribute('src', this.imageUrl);
    card.querySelector('.product-img').setAttribute('alt', 'photo' + ' ' + this.name);
    card.querySelector('.product-title').textContent = this.name;
    card.querySelector('.product-description').textContent = Math.fround(this.price / 100, 2) + '€';

    listProduct.appendChild(card); 
    
}



 const addProductBasket = item => {
    item.quantity = parseInt(document.getElementById('quantity').value);
  
    //RECUPERE PANIER//memo : let variable=(condition)? "valeursi vrai": "valeur si faux"
    let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];
  
    //BOUCLE FOR PARCOUR LIGNE PANIER
    let itemExistIndex = false;
    for (let i = 0; i < panier.length; i++) {
      let product = panier[i];
      //CONDITION CI PRODUIT EXISTE
      if (product.id === camera.id) {
        itemExistIndex = i;
      }
    };
    // Caméra existe dans le panier
    if (false !== cameraExistIndex) {
      panier[itemExistIndex].quantity = parseInt(panier[itemExistIndex].quantity) + item.quantity;
    } else {
      panier.push(item);
    };
    addLocalStorage(panier);
  }; */ 