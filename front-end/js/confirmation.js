const paramsUrl = new URL(window.location).searchParams;

const orderId = paramsUrl.get("orderId");

const contact = JSON.parse(localStorage.getItem("contact"));

const totalPrice = JSON.parse(localStorage.getItem("prixTotal"));

getOrder();

function getOrder(){
    document.getElementById("confirm").innerHTML += `
        <p>Merci  ${contact.firstName } ${contact.lastName}</p>
        <p>
        Nous avons bien reçu votre commande d'un montant de: ${totalPrice}
        Un email vous sera envoyer à l'adresse : ${contact.email} a l'envoi de votre commande
        </p>
    `
};



