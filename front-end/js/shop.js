const teddies = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];

const container = document.getElementById("shop-container");

let prixPanier = 0;

const addIdShop = [];

function priceTotalShop(teddies){
  prixPanier += teddies.quantity * teddies.price / 100;
  let prixTotal = document.getElementById('total-price').textContent = prixPanier + " € ";
  localStorage.setItem('prixTotal', JSON.stringify(prixTotal));
};

//Display item in shop
teddies.forEach((teddies, i) => {
  container.innerHTML += `
    <tr>
        <td class="img-shop align-top"><img src=${teddies.imageUrl} alt="photo ${teddies.name}"></td>
        <td>${teddies.name}</td>
        <td>${teddies.price / 100} €</td>
        <td>${teddies.quantity}</td>
        <td><a href="#" class="delete-teddies"><i class="fas fa-trash-alt"></i></a></td>
        <td >${teddies.quantity * teddies.price / 100} €</td>
    </tr>
  `;

  priceTotalShop(teddies)

  for (let i = 0; i < teddies.quantity; i++) {
    addIdShop.push(teddies.id);
  }
});



const cleanShop = document.getElementById('viderPanier')
cleanShop.addEventListener('click',  deleteShop);

//Delete all shop
function deleteShop() {
  if (teddies == null) {
  } else {
    container.remove();
    localStorage.clear();
    window.location.reload();
  }
};

function sendOrder() {
  const form = document.getElementById("form");

  //Check if the forms are valid and id exist
  if (form.reportValidity() == true && addIdShop.length>0) {
    let contact = {
      'firstName': document.getElementById("first-name").value,
      'lastName': document.getElementById("last-name").value,
      'address': document.getElementById("address").value,
      'city': document.getElementById("city").value,
      'email': document.getElementById("email").value
    };

    let products = addIdShop;

    let formClient = JSON.stringify({ 
      contact, 
      products,
    });

    //Call api order
    fetch('http://localhost:3000/api/teddies/order', {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      mode: "cors",
      body: formClient
      })
      .then(function (response) {
        return response.json()
      })
      .then(function (res) {
        localStorage.setItem("contact", JSON.stringify(res.contact));
        window.location.assign("confirmation.html?orderId=" + res.orderId);
      })
      .catch(function (err) {
        //error
      });
  }
  else{
    alert("ajouter des articles et remplir le formulaire demander")
  };
}

const sendForm = document.getElementById("send-form");

//Submit
sendForm.addEventListener('click', function (event) {
  event.preventDefault();
  sendOrder();
});