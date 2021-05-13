const TeddieUrl = "http://localhost:3000/api/teddies/"
const id = localStorage.getItem("id")
let panier = []
let produit /*Ici produit aura pour valeur la réponse à la requête passée dans la fonction getProduit ligne 62. */
let ajouter = document.getElementById("ajouter")
let quantite = document.getElementById("quantite")
let articlesPanier = 0 /*Variable qui va contenir le total d'article.*/



getProduit(TeddieUrl+id)
getPanier("panier")

console.log(id)

/*Récupération des informations concernant le produit selectionné */
function getPanier(value){

    if(localStorage.getItem(value)!=null){
        panier = JSON.parse(localStorage.getItem("panier"))
        console.log('il y déjà un panier!!')
        console.log(panier)
    }
    else{
        console.log('il faut créer un panier')
    }
}
function getInfosproduit(article){
    let photo = document.createElement("img")
    photo.classList.add("produit-photo__image")
    document.getElementById("photo").appendChild(photo)
    photo.src = article.imageUrl
    let nom = document.getElementById("nomDuProduit")
    nom.innerText = article.name
    let description = document.getElementById("description")
    description.innerHTML = `Description du produit:<br> ${article.description}`
    let prix = document.getElementById("prix")
    prix.innerHTML = `Prix:<br>${article.price} €`
}
function createSelect(responseRequest){
    let select = document.getElementById("select")
    let selectDefault = document.createElement("option")
    selectDefault.innerText = "couleur"
    select.appendChild(selectDefault)

    /*Création de l'élément de selection de couleur,boucle dans le array colors et ajoute la couleur de l'itération dans un nouvel élément <option> de <select>*/
    for(let color of responseRequest.colors){
        let couleur = document.createElement("option")
        select.appendChild(couleur)
        couleur.innerText = color 
        couleur.value = color
    }
}
function getQuantityPanier(responseRequest){
    let notreProduit = panier.find(elt => elt.nom === responseRequest.name)
        if(notreProduit){
            quantite.value = notreProduit.quantite  
            console.log(notreProduit)
            console.log(quantite.value)
        }
}
async function getProduit(url){
    fetch(url)
        .then(function(res){
            if(res.ok){
                return res.json()
            }
        })
        .then(function(response){
            produit = response

            console.log(response)/*affiche dans la console les informations contenues dans un objet*/
            
            getInfosproduit(response)/*Récupération des informations concernant le produit selectionné */

            createSelect(response)/*Création de l'élément de selection de couleur par défaut "couleur"*/

            getQuantityPanier(response)/*Obtenir la quantité déjà déclaré si elle existe et l'affichée */
        })
        .catch(function(err){
            alert(err)
        })
}
/*Appel de la fonction getProduit pour construire le contenu de la page avec les infos du produit selectionné sur la page index */
class Produit{
    constructor(nom,quantite,prix,image,description,_id){
        this.nom = nom,
        this.quantite = quantite,
        this.prix = prix,
        this.image = image,
        this.description = description,
        this._id = _id  
    }
    changeQuantity(value){
        return this.quantite = value
    }
}
ajouter.addEventListener("click",(e)=>{
    e.preventDefault()
    let eltTrouve = panier.find(elt => elt._id === produit._id)/*Recherche dans le panier si l'élément existe */
    let index = panier.indexOf(eltTrouve)
    if(/^0/.test(quantite.value)){
        if(eltTrouve){
            panier.splice(index,1)/*Suppression de eltTrouve dans le tableau panier.*/
            localStorage.setItem("panier",JSON.stringify(panier))
        }
        alert("erreur de saisie")
    }
    else if(quantite.value > 100){
        alert("La quantité saisie est trop élevée.")
    }
    else if(quantite.value != 0 && quantite.value >= 0){
        if(eltTrouve){
            eltTrouve.quantite = quantite.value
            localStorage.setItem("panier",JSON.stringify(panier))/*Mise à jour du panier avec la nouvelle quantité renseignée.*/
            console.log(eltTrouve)
            console.log(panier)
            console.log("Le tableau contient cet élément")
        }
        else{/*Création d'un nouvel objet dans le panier.*/
            let produitCommande = new Produit(produit.name,quantite.value,produit.price,produit.imageUrl,produit.description,produit._id)
            panier.push(produitCommande)
            localStorage.setItem("panier",JSON.stringify(panier))
            console.log(panier)
            console.log(quantite.value)
        }
    }
    else if(quantite.value <= 0 || quantite.value == 0){
        if(eltTrouve){
            panier.splice(index,1)
            localStorage.setItem("panier",JSON.stringify(panier))
            console.log(panier)
        }
        alert("quantité inférieure ou égale à 0")
    }
    else{
        alert("veuillez renseigner une quantité valide")
    }
})

/*let produitCommande = new Produit(produit.name,quantite.value,produit.price,produit.imageUrl,produit.description)*/

/*let eltTrouve = panier.find(elt => elt.nom == produit.name)
        if(eltTrouve){
            eltTrouve.quantite = quantite.value
            localStorage.setItem("panier",JSON.stringify(panier))

            console.log(eltTrouve)
            console.log(panier)
            console.log("Le tableau contient cet élément")
        }
        else{
            let produitCommande = new Produit(produit.name,quantite.value,produit.price,produit.imageUrl,produit.description)
            panier.push(produitCommande)
            localStorage.setItem("panier",JSON.stringify(panier))
            console.log(panier)
        }*/