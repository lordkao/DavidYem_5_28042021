const TeddieUrl = "http://localhost:3000/api/teddies/order"
let listePanier = document.getElementById("panier")
const id = localStorage.getItem("id")
let retour = document.getElementById("retour")
retour.href = "./produit.html?id="+id
let myTotal = 0
let panier = document.getElementById("panier")
let commande = JSON.parse(localStorage.getItem("panier"))
let products = []

function total(){
    if(localStorage.getItem("panier") === null){
        panier.innerText = "Votre panier est vide"
        let formulaire = document.getElementById("form")
        formulaire.style.display = "none"
    }
    else{
        for (let article of commande){/*Boucle dans le tableau "commande" en créant des éléments html qui vont contenir les informations de la commande */

            products.push(article._id)
            
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
console.log(products)
/*Formulaire*/
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let address = document.getElementById("address")
let city = document.getElementById("city")
let email = document.getElementById("email")
let form = document.getElementById("form")
let confirmation = document.getElementById("confirmation")

function send(url,formulaire,id){
    fetch(url,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-type":"application/json"
        },
        body: JSON.stringify({contact:formulaire,products:id})
    })
    .then(function(res){
        if(res.ok){
            return res.json()
        }
    })
    .then(function(response){
        localStorage.setItem("confirmation",JSON.stringify(response))
        console.log(response)
    })
    .catch(function(err){
        alert(err)
    })
}
let contact
form.addEventListener("submit",function(e){
    e.preventDefault()
    /*Création du formulaire contact en enregistrant les informations du client*/
    contact = {
        firstName : firstName.value,
        lastName : lastName.value,
        address : address.value,
        city : city.value,
        email: email.value
    }
    console.log(contact)

    console.log("informations enregistrées")
})
confirmation.addEventListener("click",function(e){
    
    if(contact === undefined && products.length === 0){
        e.preventDefault()
        alert("Veuillez choisir un article avant de passer votre commande.")
    }
    else if(products.length === 0){
        e.preventDefault()
        alert("Vous n'avez pas encore choisis d'articles")
    }
    else if(contact ===undefined){
        e.preventDefault()
        alert("Veillez à bien renseigner le formulaire et le valider,merci.")
    }
    else if(contact !== undefined && products.length !== 0){
    send(TeddieUrl,contact,products)
    }
})
console.log(products)
//firstName, lastName, address, city et email