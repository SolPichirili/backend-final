const purchaseForm = document.querySelector('#purchaseForm');

purchaseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#prodName');
    const price = document.querySelector('#prodPrice');
    const quantity = document.queryCommandValue('#quantity').option.value;

    const cart = document.querySelector('#cart');

    let cartHtml = `<p>${name}:</p>
                    <p>${price}</p>
                    <p>${quantity}</p>`

    cart.innerHTML = cartHtml;
});


