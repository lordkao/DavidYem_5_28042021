let listePanier = document.getElementById("panier")
const id = localStorage.getItem("id")

let retour = document.getElementById("retour")
retour.href = "./produit.html?id="+id

function total(){

    for(let i = 0; i < localStorage.length;i++){
        localStorage.removeItem("id")
        let article = localStorage.key(i)
        let commande = localStorage.getItem(article)
        let js = JSON.parse(commande)
        
        let multi = (js.prix*js.quantite)

        let div = document.createElement("div")
            div.classList.add("detail")
        let produit = document.createElement("p")
            produit.classList.add("detail__produit")
        let imageProduit = document.createElement("img")
            imageProduit.src = js.image
        let prixTotalArticle = document.createElement("div")
            prixTotalArticle.classList.add("detail__prix-total-article")
        let totalArticle = document.createElement("div")
            totalArticle.classList.add("detail__prix-total-article--total-article")
            totalArticle.innerHTML = "Quantité : "+js.quantite
        let prixTotal = document.createElement("div")
            prixTotal.classList.add("detail__prix-total-article--prix-total")
            prixTotal.innerHTML = "Total = "+multi+" €"
        let panier = document.getElementById("panier")

        div.appendChild(produit)
        div.appendChild(imageProduit)
        div.appendChild(prixTotalArticle)
        prixTotalArticle.appendChild(totalArticle)
        prixTotalArticle.appendChild(prixTotal)
        panier.appendChild(div)
        produit.innerHTML = "Nom: "+js.nom+"<br><br>description:<br><br> "+js.description+"<br><br>Prix: "+js.prix

        let totalPanier = document.getElementById("totalPanier")
        totalPanier.innerText = js.prix
     }
    localStorage.setItem("id",id)
}
        


total()
