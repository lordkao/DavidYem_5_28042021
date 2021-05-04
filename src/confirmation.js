let idCommande = document.getElementById("numeroDeCommande")
let montantTotal = document.getElementById("montant")
let infosCommandeValide = JSON.parse(localStorage.getItem("confirmation"))
console.log(infosCommandeValide)

idCommande.innerHTML = ` <mark>${infosCommandeValide.orderId}<mark> `
montantTotal.innerHTML = `<mark>${localStorage.getItem("montant")} €<mark>.`