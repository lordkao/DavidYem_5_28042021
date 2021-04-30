const TeddieUrl = "http://localhost:3000/api/teddies/"
const id = localStorage.getItem("id")
console.log(id)

getProduit(TeddieUrl+id)

function getProduit(url){
    fetch(url)
        .then(function(res){
            if(res.ok){
                return res.json()
            }
        })
        .then(function(response){
            console.log(response)/*affiche dans la console les informations contenues dans un objet*/

            /*Récupération des informations concernant le produit selectionné */
            let photo = document.createElement("img")
            photo.classList.add("produit-photo__image")
            document.getElementById("photo").appendChild(photo)
            photo.src = response.imageUrl
            let nom = document.getElementById("nom")
            nom.innerText = response.name
            let description = document.getElementById("description")
            description.innerHTML = `Description du produit:<br> ${response.description}`
            let prix = document.getElementById("prix")
            prix.innerHTML = `Prix:<br>${response.price} €`

            /*Création de l'élément de selection de couleur,boucle dans le array colors et ajoute la couleur de l'itération dans un nouvel élément <option> de <select>*/
            for(let color of response.colors){
                let select = document.getElementById("select")
                let couleur = document.createElement("option")
                select.appendChild(couleur)
                couleur.innerText = color 
                couleur.value = color
            }

            let ajouter = document.getElementById("ajouter")
            let quantite = document.getElementById("quantite")
            let number = JSON.parse(localStorage.getItem(response.name))
            console.log(number)

            /*Si un objet du produit existe alors on récupère sa quantité enregistré*/
            if(localStorage.getItem(response.name) != null){
            quantite.value = number.quantite
            console.log(quantite.value)
            }

            /*A chaque clique du bouton "Ajouter au panier",création d'un objet dans le localStorage ayant pour clé le nom du produit*/
            ajouter.addEventListener("click",(e)=>{
                e.preventDefault()

                if(quantite.value != 0 && quantite.value >=0){
                let commande = {
                    nom: response.name,
                    quantite: quantite.value,
                    prix: response.price,
                    image: response.imageUrl,
                    description: response.description
                    }
                    localStorage.setItem(response.name,JSON.stringify(commande))
                }
                else if(quantite.value ==0){
                    localStorage.removeItem(response.name)
                }
                else{
                    alert("veuillez renseigner une quantité valide")
                }
            })
        })
        .catch(function(err){
            alert(err)
        })
}