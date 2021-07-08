const API_URL = 'http://localhost:3000/';

//Recovering the URL
const params = (new URL(document.location)).searchParams;

//ID storage
const id = params.get("id");

const container = document.getElementById("product");

const addLocalStorage = panier => {
  localStorage.setItem('panier', JSON.stringify(panier));
};

const display = teddies => {
  container.innerHTML +=`
    <div class="container" id="cardProduct">
      <img src=${teddies.imageUrl} alt="photo ${teddies.name} class="img-fluid">
      <div class="info-product">
        <p class="nom">${teddies.name}</p>
        <span class="description">
          ${teddies.description}
        </span>
        <select class="options" id="option">
          <option>Choix Teddies</option>
        </select>
        <p class="prix">Prix Unitaire: ${teddies.price/ 100}€</p>
        <select class="quantite" id="quantity">           
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>         
        <a href ="/front-end/pages/shop.html" role="button" type="submit" class="btn btn-primary" id="panier">ajouter au panier</a>
      </div>
    </div>
  `;
  for (let colors of teddies.colors){
    document.getElementById('option').innerHTML+=
    `<option>${colors}</option>`
  }
  document.getElementById('panier').addEventListener('click', function () {
    addProductShop(teddies);
  });
};

//Add product shop
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

//Call api URL
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