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
        let div = document.createElement("div")
        div.classList.add("detail")
        let produit = document.createElement("p")
        produit.classList.add("detail__produit")
        let imageProduit = document.createElement("img")
        imageProduit.src = js.image
        let panier = document.getElementById("panier")
        div.appendChild(produit)
        div.appendChild(imageProduit)
        panier.appendChild(div)
        produit.innerHTML = "Nom: "+js.nom+"<br><br>description:<br><br> "+js.description+"<br><br>Prix: "+js.prix+" €<br>Quantité: "+js.quantite
     }
    localStorage.setItem("id",id)
}
        


total()
