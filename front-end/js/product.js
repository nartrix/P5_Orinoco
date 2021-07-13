const API_URL = 'http://localhost:3000/';

//Recovering the URL
const params = (new URL(document.location)).searchParams;

//ID storage
const id = params.get("id");

const container = document.getElementById("product");

const addLocalStorage = panier => {
  localStorage.setItem('panier', JSON.stringify(panier));
};

const renderProduct = teddies => {
  container.innerHTML +=`
    <div class="col">
      <img src=${teddies.imageUrl} alt="photo ${teddies.name} class="img-fluid">
      <div class="info-product">
        <h2 class="name-product">${teddies.name}</h2>
        <p class="description">${teddies.description}</p>
        <select class="options-product" id="option">
          <option>Choix Teddies</option>
        </select>
        <p class="price">Prix Unitaire : <strong>${teddies.price/ 100}€</strong></p>
        <select class="quantity-product" id="quantity">           
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>         
        <a href ="/front-end/pages/shop.html" role="button" type="submit" class="btn" id="panier">ajouter au panier</a>
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
    renderProduct(teddies);

})
.catch(function(err) {
    // error has occurred
});