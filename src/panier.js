const TeddieUrl = "http://localhost:3000/api/teddies/"

let listePanier = document.getElementById("panier")
const id = localStorage.getItem("id")

let retour = document.getElementById("retour")
retour.href = "./produit.html?id="+id

function total(){

    let myTotal = 0
    let panier = document.getElementById("panier")
    localStorage.removeItem("id")

    if(localStorage.length == 0 || localStorage.length == null){
        panier.innerText = "Votre panier est vide"
        localStorage.setItem("id",id)
        let formulaire = document.getElementById("form")
        formulaire.style.display = "none"
    }
    else{
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
    
            div.appendChild(produit)
            div.appendChild(imageProduit)
            div.appendChild(prixTotalArticle)
            prixTotalArticle.appendChild(totalArticle)
            prixTotalArticle.appendChild(prixTotal)
            panier.appendChild(div)
            produit.innerHTML = "Nom: "+js.nom+"<br><br>description:<br><br> "+js.description+"<br><br>Prix: "+js.prix
    
            let finalTotal = myTotal += multi
    
            let totalPanier = document.getElementById("totalPanier")
            totalPanier.innerText = finalTotal+" €"
         }
        localStorage.setItem("id",id)

    }
}
        
total()



let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let adress = document.getElementById("adress")
let city = document.getElementById("city")
let email = document.getElementById("email")


let confirm = document.getElementById("confirm")
let submit = document.getElementById("submit")






//firstName, lastName, address, city et email