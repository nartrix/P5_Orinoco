const API_URL = 'http://localhost:3000/';

// init function
getProducts();

function getProducts() {
    // call api URL
    fetch(`${API_URL}api/teddies`)
    .then(function(res) {
        if (res.ok) {
            return res.json();
          }
    })
    .then(function(data) {
        console.log(data) 
        renderProducts(data)
    })
    .catch(function(err) {
        // error has occurred
    });
}

function renderProducts(data) {
    // HTML template recovery
    const cardTemplate = document.querySelector('#template .col');
    /* console.log(cardTemplate); */
    const listProducts = document.getElementById("card-products");

    // render each data item
    /* console.log(items) */
    data.forEach( item => {
        console.log(item)
        let card = cardTemplate.cloneNode(true);
    
        // add data to element
        card.querySelector('.card-img-top').setAttribute('src', item.imageUrl);
        card.querySelector('.card-img-top').setAttribute('alt', 'photo' + ' ' + item.name);
        card.querySelector('.card-title').textContent = item.name;
        card.querySelector('.card-text').textContent = Math.fround(item.price / 100, 2) + '€';
        card.querySelector('.card-body a').setAttribute('href', 'pages/product.html?id=' + item._id );

        listProducts.appendChild(card);

    });
   
}