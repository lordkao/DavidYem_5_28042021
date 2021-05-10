const TeddieUrl = "http://localhost:3000/api/teddies/order"
let listePanier = document.getElementById("panier")
const id = localStorage.getItem("id")
let retour = document.getElementById("retour")
let btnRetour = document.querySelector("div #retour button.boutons__retour")
/*Si aucun id n'est en mémoire sur le localStorage alors le bouton retour est désactivé.*/
if(localStorage.getItem("id") === null){
    btnRetour.style.disabled = "true"
    btnRetour.style.opacity = "0.4"
}
else{
    retour.href = "./produit.html?id="+id
}
let remove = document.getElementById("remove")
remove.addEventListener("click",()=>{
    localStorage.removeItem("panier")
})


let finalTotal = 0
let panier = document.getElementById("panier")
let commande = JSON.parse(localStorage.getItem("panier"))
let products = []

function total(){
    if(localStorage.getItem("panier") === null){
        
        let panierVide = document.createElement("div")
        panierVide.classList.add("panier-vide")
        panier.appendChild(panierVide)
        panierVide.innerText = "Votre panier est vide"
        let formulaire = document.getElementById("form")
        formulaire.style.display = "none"
    }
    else{
        for (let article of commande){/*Boucle dans le tableau "commande" en créant des éléments html qui vont contenir les informations de la commande */
            for(let i=0;i < article.quantite;i++){
                products.push(article._id)
            }
            console.log(products)
            
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
            produit.innerHTML = "Nom: "+article.nom+"<br><br>description:<br><br> "+article.description+"<br><br>Prix: "+article.prix+" €"
    
            finalTotal += multi

            let totalPanier = document.getElementById("totalPanier")
            totalPanier.innerText = finalTotal+" €"
        }
    localStorage.setItem("montant",JSON.stringify(finalTotal))
    }
}
total()/*Appel de la fonction total qui va venir matérialiser le panier.*/
console.log(products)

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

/*Formulaire*/
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let address = document.getElementById("address")
let city = document.getElementById("city")
let email = document.getElementById("email")
let form = document.getElementById("form")
let confirmation = document.getElementById("confirmation")

let contact /*Déclaration de la variable contact vide.*/
let submitBtn = document.getElementById("submit")

/*Création du bouton "Modifier".*/
let modifier = document.createElement("button")
modifier.classList.add("modifier")
modifier.style.display = "none"
form.appendChild(modifier)
modifier.innerText = "Modifier"

/*Création du message de confirmation concernant les informations client. */
let confirmSaveInfos = document.createElement("div")
confirmSaveInfos.classList.add("infos-save")
form.appendChild(confirmSaveInfos)
confirmSaveInfos.innerText = "informations enregistrées"
confirmSaveInfos.style.display = "none"


/*Attente de la soumission du formulaire.*/
form.addEventListener("submit",function(e){
    e.preventDefault()
    if(document.forms["form"]["firstName"].value === ""){
        confirmSaveInfos.style.display = "none"
        alert("Veuillez renseigner votre prénom.")
        return 0
    }
    else if(document.forms["form"]["lastName"].value === ""){
        confirmSaveInfos.style.display = "none"
        alert("Veuillez renseigner votre nom.")
        return 0
    }
    else if(document.forms["form"]["address"].value === ""){
        confirmSaveInfos.style.display = "none"
        alert("Veuillez renseigner votre adresse.")
        return 0
    }
    else if(document.forms["form"]["city"].value === ""){
        confirmSaveInfos.style.display = "none"
        alert("Veuillez renseigner votre ville.")
        return 0
    }
    else if(document.forms["form"]["email"].value === ""){
        confirmSaveInfos.style.display = "none"
        alert("Veuillez renseigner votre email.")
        return 0
    }
    /*Création de l'objet Contact en enregistrant les informations du client dans la variable contact.*/
    else{
        contact = {
        firstName : firstName.value,
        lastName : lastName.value,
        address : address.value,
        city : city.value,
        email: email.value
        }
        firstName.setAttribute("disabled",true)
        lastName.setAttribute("disabled",true)
        address.setAttribute("disabled",true)
        city.setAttribute("disabled",true)
        email.setAttribute("disabled",true)

        confirmSaveInfos.style.display = "block"
        submitBtn.style.display = "none"/*le bouton disparait pour faire place au bouton modifier*/
        modifier.style.display = "block"
        confirmation.disabled = false /*Désactivation du bouton "confirmation" tant que le formulaire n'est pas valider avec le bouton "valider".*/
        modifier.addEventListener("click",(e)=>{
            e.preventDefault()
            confirmation.disabled = true /*Activation du bouton "confirmation" aprés la validation du formulaire.*/
            confirmSaveInfos.style.display = "none"
            firstName.disabled = false
            lastName.disabled = false
            address.disabled = false
            city.disabled = false
            email.disabled = false
            modifier.style.display = "none"
            submitBtn.style.display = "block"
           
            })
    }
    console.log(contact)/*Affiche dans la console les informations enregistrées. */
    console.log("informations enregistrées")/*Confirmation dans la console que les informations sont bien enregistrées. */
})

/*  Conditions pour verification avant envoi requête POST contenant l'objet contact et tableau products:
    Si l'un des 2 objets ou même les 2 ne sont pas renseigner correctement,
    alors une alert sera exécuter.
*/
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
    send(TeddieUrl,contact,products)/*envoir de la requête POST vers l'API*/
    }
})

console.log(products)