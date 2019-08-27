const deleteProduct = (btn) => {
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    // retrieves the closest ancestor element with the name article
    const productElement = btn.closest('article');

    // Method supported by the browser for sending HTTP requests
    fetch('/admin/product/' + prodId, {
        method: 'DELETE',
        headers: {
            'csrf-token' : csrf
        }
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            console.log(data);
            // productElement.remove(); does not work in Internet Explorer
            productElement.parentNode.removeChild(productElement); // works in every browser
        })
        .catch(err => {
            console.log(err);
        });
};