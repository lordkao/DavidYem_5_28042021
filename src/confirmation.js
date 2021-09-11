import { getGlobalBasket } from './function.js'

localStorage.removeItem("panier")
getGlobalBasket()

let accueil = document.getElementById("accueil")
accueil.addEventListener("click",()=>{
    document.location.href="/index.html"
})

let idCommande = document.getElementById("numeroDeCommande")
let montantTotal = document.getElementById("montant")
let infosCommandeValide = JSON.parse(localStorage.getItem("confirmation"))
console.log(infosCommandeValide)
idCommande.innerHTML = infosCommandeValide.orderId
montantTotal.innerHTML = localStorage.getItem("montant")
localStorage.removeItem("confirmation")
localStorage.removeItem("montant")