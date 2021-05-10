const TeddieUrl = "http://localhost:3000/api/teddies"
let quantiteDuPanier = document.getElementById("quantite-panier")


getIndex()

/*Création des cadres produits en fonctions des produits présent dans les données de l'API */
function getIndex(){
    fetch(TeddieUrl)
        .then(function(res){
            if(res.ok){
                return res.json()
            }
        })
        .then(function(responses){
            console.log(responses)

            for(let response of responses){
                let blocProduits = document.getElementById("bloc-produits")
                let cadre = document.createElement("div")
                cadre.classList.add("bloc-produits__cadre")

                    let lien = document.createElement("a")
                    lien.classList.add("cadre-produit")
                    lien.onclick=(e)=>{
                        localStorage.setItem("id",response._id)
                    }
                    lien.href = "./produit.html?id=" + response._id

                        let photo = document.createElement("div")
                        photo.classList.add("cadre-produit__photo")
                            let image = document.createElement("img")
                            image.classList.add("photo")
                            image.src = response.imageUrl

                        let nom = document.createElement("div")
                        nom.classList.add("cadre-produit__nom")
                        nom.innerText = `Modèle: ${response.name}`
                        
                        let prix = document.createElement("div")
                        prix.classList.add("cadre-produit__prix")
                        prix.innerText = `Prix : ${response.price} €`

                        blocProduits.appendChild(cadre)
                        cadre.appendChild(lien)
                        lien.appendChild(photo)
                        photo.appendChild(image)
                        lien.appendChild(nom)
                        lien.appendChild(prix)
            }
        })
        .catch(function(err){
            alert(err)
        })
        
}