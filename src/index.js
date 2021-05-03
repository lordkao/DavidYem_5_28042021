const TeddieUrl = "http://localhost:3000/api/teddies"
let remove = document.getElementById("remove")
remove.addEventListener("click",()=>{
    localStorage.clear()
})
getIndex()

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
            let cadre = document.createElement("div")
            cadre.classList.add("cadre")

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

                    section.appendChild(cadre)
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