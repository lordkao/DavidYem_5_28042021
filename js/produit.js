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
            console.log(response)
            let photo = document.createElement("img")
            photo.classList.add("produit-photo__image")
            document.getElementById("photo").appendChild(photo)
            photo.src = response.imageUrl
            let description = document.getElementById("description")
            description.innerHTML = `Description du produit:<br> ${response.description}`
            let prix = document.getElementById("prix")
            prix.innerHTML = `Prix:<br>${response.price} €`

            for(let color of response.colors){
                let select = document.getElementById("select")
                let couleur = document.createElement("option")
                select.appendChild(couleur)
                couleur.innerText = color 
                couleur.value = color
            }

            let ajouter = document.getElementById("ajouter")
            let quantite = document.getElementById("quantite")

            ajouter.onclick = (e) =>{
                e.preventDefault()
                if(quantite.value != 0 || quantite.value >=0){

                let commande = {
                    nom: response.name,
                    quantite: quantite.value,
                    prix: response.price,
                    image: response.imageUrl,
                    description: response.description
                    }
                    localStorage.setItem(response.name,JSON.stringify(commande))
                }
                else{
                    alert("erreur")
                }
            }
        })
        .catch(function(err){
            alert(err)
        })
}