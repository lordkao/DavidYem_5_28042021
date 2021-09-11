function getGlobalBasket(){
    let panier = JSON.parse(localStorage.getItem('panier'))
    let prixDuPanier = document.getElementById('prixDuPanier')
    let quantitéArticles = document.getElementById('quantitéArticles')
    let totalPriceBasket = 0
    let totalArticles = 0
    console.log(panier)
    for(let article of panier){
        totalArticles += JSON.parse(article.quantite)
        totalPriceBasket += (JSON.parse(article.prix)*article.quantite)
        console.log(totalPriceBasket)
    }
    console.log(totalPriceBasket)
    quantitéArticles.innerText = totalArticles
    prixDuPanier.innerText = totalPriceBasket
}

export {getGlobalBasket}