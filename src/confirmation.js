let accueil = document.getElementById("accueil")
accueil.addEventListener("click",()=>{
    localStorage.removeItem("panier")
    localStorage.removeItem("confirmation")
    localStorage.removeItem("montant")
})

let idCommande = document.getElementById("numeroDeCommande")
let montantTotal = document.getElementById("montant")
let infosCommandeValide = JSON.parse(localStorage.getItem("confirmation"))
console.log(infosCommandeValide)
idCommande.innerHTML = infosCommandeValide.orderId
montantTotal.innerHTML = localStorage.getItem("montant")