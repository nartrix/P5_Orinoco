let teddies = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];

console.log(teddies);

let container = document.getElementById("container");

let prixPanier = 0;

let addIdShop = [];

function priceTotalShop(teddies){
  prixPanier += teddies.quantity * teddies.price / 100;
  //AFFICHE PRIX TOTAL DU PANIER // ENVOI AU LOCALSTORAGE
  let prixTotal = document.getElementById('prixTotal').textContent = prixPanier + " € ";
  localStorage.setItem('prixTotal', JSON.stringify(prixTotal));
};

teddies.forEach((teddies, i) => {
  container.innerHTML += `
    <tr>
        <td class="srcimage"><img src=${teddies.imageUrl} alt="" /></td>
        <td>${teddies.name}</td>
        <td>${teddies.price / 100} €</td>
        <td>${teddies.quantity}</td>
        <td><a href="#" class="deleteCamera" data-id="${i}"> <i class="fas fa-trash-alt"></i></a></td>
        <td >${teddies.quantity * teddies.price / 100} €</td>
    </tr>
  `;
  //APPEL FONCTION
  priceTotalShop(teddies)
 
 // BOUCLE INCREMENT ID PRODUIT
  for (let i = 0; i < teddies.quantity; i++) {
    addIdShop.push(teddies.id);
  }
});