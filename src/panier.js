import { getGlobalBasket } from "./function.js"

getGlobalBasket()

const TeddieUrl = "http://localhost:3000/api/teddies/order"
const id = localStorage.getItem("id")
let retour = document.getElementById("retour")
let accueil = document.getElementById("accueil")

accueil.addEventListener("click",()=>{
    document.location.href = "/index.html"
})

/*Si aucun id n'est en mémoire sur le localStorage alors le bouton retour est désactivé.*/
function idSave(){
    if(localStorage.getItem("id") === null){
        retour.setAttribute("disabled","true")
    }
    else{
        retour.addEventListener("click",()=>{
            document.location.href= "./produit.html?id="+id
        })
    }
}

idSave()

let finalTotal = 0 /*Variable qui va contenir le prix total de la commande*/
let panier = document.getElementById("panierListe")
let commande = JSON.parse(localStorage.getItem("panier"))
let products = []/*Création du array products vide pour nous permettre d'implémenter par la suite les "id" des produits.*/


function total(){/*Fonction qui va venir boucler dans le panier en créant des blocs reprenants les informations des produits sélectionnés.*/
    if(localStorage.getItem("panier") === null){
        panier.classList.add("panier-vide")
        panier.innerText = "Votre panier est vide"
        let formulaire = document.getElementById("form")
        formulaire.style.display = "none"
    }
    else{
        for (let article of commande){/*Boucle dans le tableau "commande" en créant des éléments html qui vont contenir les informations de la commande */
            for(let i=0;i < article.quantite;i++){
                products.push(article._id)
            }
            
            let multi = ((article.prix)*article.quantite)/*Prix total pour une selection de produit en fonction de la quantité */

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
            produit.innerHTML = "Nom: "+article.nom+"<br><br>description:<br><br> "+article.description+"<br><br>Prix: "+(article.prix)+" €"
    
            finalTotal += multi

            let totalPanier = document.getElementById("totalPanier")
            totalPanier.innerText = finalTotal+" €"
        }
    localStorage.setItem("montant",JSON.stringify(finalTotal))
    }
}

total()/*Appel de la fonction total qui va venir matérialiser le panier.*/
console.log(products)

/*Vide le panier et recharge la page.*/
let remove = document.getElementById("remove")
remove.addEventListener("click",()=>{
    localStorage.removeItem("panier")
    localStorage.removeItem("montant")
    total()
    getGlobalBasket()
})

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


function help(id,nomDuChamp){/*Fonction qui créé un message d'aide pour indiquer à l'utilisateur le champ incomplet.*/
    let help = document.createElement("div")
    help.classList.add("help-message")
    let champ = document.getElementById(id) 
    champ.appendChild(help)
    help.innerText = "Veuillez renseigner votre "+nomDuChamp
    help.style.display = "none"
    return help
}


function invalidInputText(id,message){/*Fonction qui créé un message d'aide pour indiquer à l'utilisateur le champ invalid.*/
    let invalid = document.createElement("div")
    invalid.classList.add("help-message")
    let champ = document.getElementById(id) 
    champ.appendChild(invalid)
    invalid.innerText = message
    invalid.style.display = "none"
    return invalid
}


/*Création des messages d'erreur quand un champ est vide en appelant la fonction help.*/
let helpPrenom = help("prenom","prénom")
let helpNom = help("nom","nom")
let helpAdresse = help("adresse","adresse")
let helpVille = help("ville","ville")
let helpMail = help("mail","e-mail")

/*Création des variables contenants les messages d'erreurs pour une mauvaise saisie.*/
let erreurPrenom = "Veuillez renseigner votre prénom seulement avec des lettres.(ex: David)"
let erreurNom = "Veuillez renseigner votre nom seulement avec des lettres.(ex: Legrand)"
let erreurVille = "Veuillez saisir une ville valide.(ex: Toulouse)"
let erreurAdresse = "Veuillez saisir une adresse valide.(ex: 14 rue de Jean de la Fontaine)"
let erreurMail = "Veuillez saisir une adresse mail valide.(ex:jean-dufrene@outlook.fr)"
let erreurPayment = 'Veuillez choisir un moyen de paiement.'

/*Création des messages d'erreurs lors d'une mauvaise saisie.*/
let invalidPrenom = invalidInputText("prenom",erreurPrenom)
let invalidNom = invalidInputText("nom",erreurNom)   
let invalidAdresse = invalidInputText("adresse",erreurAdresse)
let invalidVille = invalidInputText("ville",erreurVille)
let invalidMail = invalidInputText("mail",erreurMail)
let invalidPayment = invalidInputText("payment",erreurPayment)

/*Fonction qui désactive tous les messages d'erreurs.*/
let displayNone = () =>{
    helpPrenom.style.display = "none"
    helpNom.style.display = "none"
    helpAdresse.style.display = "none"
    helpVille.style.display = "none"
    helpMail.style.display ="none"
    confirmSaveInfos.style.display = "none"
    invalidPrenom.style.display = "none"
    invalidNom.style.display = "none"
    invalidAdresse.style.display = "none"
    invalidVille.style.display = "none"
    invalidMail.style.display = "none"
    invalidPayment.style.display = "none"
}

/*function validation(value,helper,regex,invalid){
    if(value == "")/*Champ prénom{
        displayNone()
        helper.style.display = "block"
        return 0 
    }
    else if((regex.test(firstName.value))){
        displayNone()
        invalid.style.display = "block"
        return 0
    }
}*/

/*Attente de la soumission du formulaire.*/
form.addEventListener("submit",function(e){
    e.preventDefault()
    if(document.forms["form"]["firstName"].value === "")/*Champ prénom*/{
        displayNone()
        helpPrenom.style.display = "block"
        return 0 
    }
    else if((/[a-zA-Zéèçà][-]{1,}$/.test(firstName.value))||(/[^a-zA-Zéèçà-]/.test(firstName.value))){
        displayNone()
        invalidPrenom.style.display = "block"
        return 0
    }


    else if(document.forms["form"]["lastName"].value === "")/*Champ nom*/{
        displayNone()
        helpNom.style.display = "block"
        return 0
    }
    else if((/[a-zA-Zéèçà][-]{1,}$/.test(lastName.value))||(/[^a-zA-Zéèçà-]/.test(lastName.value))){
        displayNone()
        invalidNom.style.display = "block"
        return 0
    }


    else if(document.forms["form"]["address"].value === "")/*Champ adresse*/{
        displayNone()
        helpAdresse.style.display = "block"
        return 0
    }
    else if(/^[0-9]{1,}$/.test(address.value)){
        displayNone()
        invalidAdresse.style.display = "block"
        return 0
    }


    else if(document.forms["form"]["city"].value === "")/*Champ ville*/{
        displayNone()
        helpVille.style.display = "block"
        return 0
    }
    else if((/[a-zA-Zéèçà][-]{1,}$/.test(city.value))||(/[^a-zA-Zéèçà-]/.test(city.value))){
        displayNone()
        invalidVille.style.display = "block"
        return 0
    }


    else if(document.forms["form"]["email"].value === "")/*Champ email*/{
        displayNone()
        helpMail.style.display = "block"
        return 0
    }
    else if((/^([\w.-]+)[@]{1}([\w]+)[.]{1}([a-z]){2,5}$/.test(email.value))===false){
        displayNone()
        invalidMail.style.display = "block"
        return 0
    }

    else if(!checkboxPaypal.checked && !checkboxVisa.checked && !checkboxMasterCard.checked){
        displayNone()
        invalidPayment.style.display = "block"
    }
    
    /*Création de l'objet Contact en enregistrant les informations du client dans la variable contact.*/
    else{

            displayNone()

            contact = {
            firstName : firstName.value,
            lastName : lastName.value,
            address : address.value,
            city : city.value,
            email: email.value
            }
            /*helpPrenom.style.display = "none"
            helpNom.style.display = "none"
            helpAdresse.style.display = "none"*/

            firstName.setAttribute("disabled",true)
            lastName.setAttribute("disabled",true)
            address.setAttribute("disabled",true)
            city.setAttribute("disabled",true)
            email.setAttribute("disabled",true)

            disabledCheck()
            setIndex('-1')
            confirmSaveInfos.style.display = "block"
            submitBtn.style.display = "none"/*le bouton disparait pour faire place au bouton modifier*/
            modifier.style.display = "block"
            confirmation.disabled = false /*Activation du bouton "confirmation" aprés la validation du formulaire.*/
            confirmation.style.cursor = 'pointer'
            confirmation.addEventListener('mouseover',function(){/*Ajout de la classe confirmation-hover afin de changer le background au survol de l'élément*/
                confirmation.classList.add('confirmation-hover')
            })
            confirmation.addEventListener('mouseleave',function(){/*Suppression de la classe confirmation-hover*/
                confirmation.classList.remove('confirmation-hover')
            })

            modifier.addEventListener("click",function (e){
                e.preventDefault()
                enabledCheck()
                setIndex('1')
                confirmation.disabled = true /*Désactivation du bouton "confirmation" tant que le formulaire n'est pas valider avec le bouton "valider".*/
                confirmation.style.cursor = 'default'
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

let checkboxArray = ['checkboxPaypal','checkboxVisa','checkboxMasterCard']
let labelArray = ['labelPaypal','labelVisa','labelMasterCard']

checkboxArray.map( check =>{
    check = document.getElementById(check)

})
labelArray.map( label => label = document.getElementById(label))
console.log(checkboxPaypal)
console.log(labelVisa)

function removeCheck(){/*Supprime les attributs checked des inputs checkbox.*/
    checkboxArray.map( check => {
        check = document.getElementById(check)
        check.removeAttribute('checked')
    })
}
function enabledCheck(){
    checkboxArray.map( check => {
        check = document.getElementById(check)
        check.removeAttribute('disabled')
    })
}
function disabledCheck(){
    checkboxArray.map( check => {
        check = document.getElementById(check)
        check.setAttribute('disabled','')
    })
}
function listen(checkbox){
    if(checkbox.checked){
        removeCheck()
    }
    else{
        removeCheck()
        checkbox.setAttribute('checked','')
        console.log(`${checkbox} : ajouté`)
    }
}
function setIndex(value){
    labelArray.map( label => {
        label = document.getElementById(label)
        label.style.zIndex = value
    })
}

labelPaypal.addEventListener('click', function(e){
    e.preventDefault()
    listen(checkboxPaypal)
})
labelMasterCard.addEventListener('click',function(e){
    e.preventDefault()
    listen(checkboxMasterCard)
})
labelVisa.addEventListener('click',function(e){
    e.preventDefault()
    listen(checkboxVisa)
})

/*  Conditions pour verification avant envoi requête POST contenant l'objet contact et tableau products:
    Si l'un des 2 objets ou même les 2 ne sont pas renseigner correctement,
    alors une alert sera exécuter.
*/

function send(url,formulaire,id){/*Envoi de la requête POST avec l'objet contact et products.*/
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

confirmation.addEventListener("click",function(e){/*Confirmation de la commande et envoi de la requête.*/
    
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
    send(TeddieUrl,contact,products)/*envoi de la requête POST vers l'API*/
    document.location.href="/confirmation.html"
    }
})
