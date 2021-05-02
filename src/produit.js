const TeddieUrl = "http://localhost:3000/api/teddies/"
const id = localStorage.getItem("id")
let panier = []
getPanier("panier")

let produit /*Ici produit aura pour valeur la réponse à la requête passée dans la fonction getProduit ligne 59. */
let ajouter = document.getElementById("ajouter")
let quantite = document.getElementById("quantite")
class Produit{
    constructor(nom,quantite,prix,image,description){
        this.nom = nom,
        this.quantite = quantite,
        this.prix = prix,
        this.image = image,
        this.description = description   
    }
    changeQuantity(value){
        this.quantite = value
    }
}

console.log(id)

/*Récupération des informations concernant le produit selectionné */
function getPanier(value){

    if(localStorage.getItem(value)!=null){
        panier = JSON.parse(localStorage.getItem("panier"))
        /*console.log('il y déjà un panier!!')
        console.log(panier)*/
    }
    else{
        console.log('il faut créer un panier')
    }
}

function getInfosproduit(produit){
    let photo = document.createElement("img")
    photo.classList.add("produit-photo__image")
    document.getElementById("photo").appendChild(photo)
    photo.src = produit.imageUrl
    let nom = document.getElementById("nom")
    nom.innerText = produit.name
    let description = document.getElementById("description")
    description.innerHTML = `Description du produit:<br> ${produit.description}`
    let prix = document.getElementById("prix")
    prix.innerHTML = `Prix:<br>${produit.price} €`
}
function createSelect(produit){
    let select = document.getElementById("select")
            let selectDefault = document.createElement("option")
            selectDefault.innerText = "couleur"
            select.appendChild(selectDefault)

             /*Création de l'élément de selection de couleur,boucle dans le array colors et ajoute la couleur de l'itération dans un nouvel élément <option> de <select>*/
            for(let color of produit.colors){
                let couleur = document.createElement("option")
                select.appendChild(couleur)
                couleur.innerText = color 
                couleur.value = color
            }
}
function getProduit(url){
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

            /*Création de l'élément de selection de couleur par défaut "couleur"*/
            
            createSelect(response)

            /*let ajouter = document.getElementById("ajouter")
            let quantite = document.getElementById("quantite")
            let nomDuProduit = JSON.parse(localStorage.getItem(response.name))

            console.log(nomDuProduit)*/

            /*Si un objet du produit existe alors on récupère sa quantité enregistré*/

            /*if(localStorage.getItem(response.name) != null){
            quantite.value = nomDuProduit.quantite
            console.log(quantite.value)
            }*/
            
            /*A chaque clique du bouton "Ajouter au panier",création d'un objet dans le localStorage ayant pour clé le nom du produit*/
            /*ajouter.addEventListener("click",(e)=>{
                e.preventDefault()

                if(quantite.value != 0 && quantite.value >=0){

               
                let commande = {
                    nom: response.name,
                    quantite: quantite.value,
                    prix: response.price,
                    image: response.imageUrl,
                    description: response.description
                    }
                panier.push(commande)
                    console.log(panier.length)
                    console.log(panier)
                    localStorage.setItem("panier",JSON.stringify(panier))
                    /*localStorage.setItem(response.name,JSON.stringify(commande))
                }
                else if(quantite.value ==0){
                    localStorage.removeItem("panier")
                }
                else{
                    alert("veuillez renseigner une quantité valide")
                }
            })*/
        })
        .catch(function(err){
            alert(err)
        })
}
/*Appel de la fonction getProduit pour construire le contenu de la page avec les infos du produit selectionné sur la page index */
getProduit(TeddieUrl+id)



ajouter.addEventListener("click",(e)=>{
    e.preventDefault()

    if(/^0/.test(quantite.value)){
        localStorage.removeItem("panier")
        panier = []
        alert("erreur de saisie")
    }
    else if(quantite.value != 0 && quantite.value >= 0){
        let eltTrouve = panier.find(elt => elt.nom == produit.name)
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
        }
    }
    else if(quantite.value <= 0 || quantite.value == 0){
        localStorage.removeItem("panier")
        panier = []
        alert("quantité inférieure ou égale à 0")
    }
    else{
        alert("veuillez renseigner une quantité valide")
    }
})
/*let produitCommande = new Produit(produit.name,quantite.value,produit.price,produit.imageUrl,produit.description)*/
