function getGlobalBasket(){
    const prixDuPanier = document.getElementById('prixDuPanier')
    const quantiteArticles = document.getElementById('quantitéArticles')
    const numberOfArticles = document.getElementById('basketNumber')
    let totalPriceBasket = 0
    let totalArticles = 0

    if(localStorage.getItem('panier')){
        let panier = JSON.parse(localStorage.getItem('panier'))
        
        for(let article of panier){
            totalArticles += JSON.parse(article.quantite)
            totalPriceBasket += (JSON.parse(article.prix)*article.quantite)
            console.log(totalPriceBasket)
        }

        if(totalArticles > 0){
            numberOfArticles.innerText = totalArticles
            numberOfArticles.style.display = 'flex'
            quantiteArticles.innerText = totalArticles
            prixDuPanier.innerText = totalPriceBasket
        }
    }
    else{
        numberOfArticles.innerText = totalArticles
        numberOfArticles.style.display = 'none'
        quantiteArticles.innerText = totalArticles
        prixDuPanier.innerText = totalPriceBasket
    }
}

export {getGlobalBasket}