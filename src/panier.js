const TeddieUrl = "http://localhost:3000/api/teddies/order"
let listePanier = document.getElementById("panier")
const id = localStorage.getItem("id")
let retour = document.getElementById("retour")
retour.href = "./produit.html?id="+id
let myTotal = 0
let panier = document.getElementById("panier")
let commande = JSON.parse(localStorage.getItem("panier"))
let tableProduits = localStorage.getItem("panier")

function total(){
    if(localStorage.getItem("panier") === null){
        panier.innerText = "Votre panier est vide"
        let formulaire = document.getElementById("form")
        formulaire.style.display = "none"
    }
    else{
        for (let article of commande){/*Boucle dans le tableau "commande" en créant des éléments html qui vont contenir les informations de la commande */

            let multi = (article.prix*article.quantite)/*Prix total pour une selection de produit en fonction de la quantité */

            let div = document.createElement("div")
                div.classList.add("detail")
            let produit = document.createElement("p")
                produit.classList.add("detail__produit")
            let imageProduit = document.createElement("img")
                imageProduit.src = article.image
            let prixTotalArticle = document.createElement("div")
                prixTotalArticle.classList.add("detail__prix-total-article")
            let totalArticle = document.createElement("div")
                totalArticle.classList.add("detail__prix-total-article--total-article")
                totalArticle.innerHTML = "Quantité : "+article.quantite
            let prixTotal = document.createElement("div")
                prixTotal.classList.add("detail__prix-total-article--prix-total")
                prixTotal.innerHTML = "Total = "+multi+" €"
    
            div.appendChild(produit)
            div.appendChild(imageProduit)
            div.appendChild(prixTotalArticle)
            prixTotalArticle.appendChild(totalArticle)
            prixTotalArticle.appendChild(prixTotal)
            panier.appendChild(div)
            produit.innerHTML = "Nom: "+article.nom+"<br><br>description:<br><br> "+article.description+"<br><br>Prix: "+article.prix
    
            let finalTotal = myTotal += multi
    
            let totalPanier = document.getElementById("totalPanier")
            totalPanier.innerText = finalTotal+" €"
        }
    }
}
total()


/*Formulaire*/
let firstName = document.getElementById("firstName")
firstName.addEventListener("input",(e)=>{
    firstName.value = e.target.value
    console.log(firstName.value)
})
let lastName = document.getElementById("lastName")
lastName.addEventListener("input",(e)=>{
    lastName.value = e.target.value
    console.log(lastName.value)
})
let address = document.getElementById("address")
address.addEventListener("input",(e)=>{
    address.value = e.target.value
    console.log(address.value)
})
let city = document.getElementById("city")
city.addEventListener("input",(e)=>{
    city.value = e.target.value
    console.log(city.value)
})
let email = document.getElementById("email")
email.addEventListener("input",(e)=>{
email.value = e.target.value
console.log(email.value)
})


let submit = document.getElementById("submit")
let form = document.getElementById("form")

let contact = {
    firstName: "david",
    lastName: "yem",
    address: "11 rue jean",
    city: "arles",
    email: "david@hotmail.fr"
}
let objetContact = {
    contact:contact,
    tableau:commande
}
console.log(objetContact)
submit.addEventListener("click",(e)=>{
    e.preventDefault()
    fetch(TeddieUrl,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-type":"application/json"
        },
        body: JSON.stringify(commande)
    })
    .then(function(res){
        if(res.ok){
            return res.json()
        }
    })
    .then(function(response){
        console.log(response)
    })
    .catch(function(err){
        alert(err)
    })
    
})
console.log(commande)
//firstName, lastName, address, city et email