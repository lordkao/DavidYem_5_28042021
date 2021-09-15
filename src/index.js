import {getGlobalBasket} from "./function.js"

const TeddieUrl = "http://localhost:3000/api/teddies"
const search = document.getElementById('search')
const searchSubmit = document.getElementById('search-submit')
let blocProduits = document.getElementById("bloc-produits")

let noArticleFrame = document.createElement('div')/*Création du message indiquant aucun résultats pour la recherche*/
    noArticleFrame.setAttribute('id','noArticleFrame')
    noArticleFrame.classList.add('no-articles')
let quote = document.createElement('p')
    quote.classList.add('no-articles__quote')
    quote.innerText = 'Aucun article(s) ne correspond à votre recherche !'
noArticleFrame.appendChild(quote)

/*Création des cadres produits en fonctions des produits présent dans les données de l'API */
function getIndex(){
    fetch(TeddieUrl)
        .then(function(res){
            if(res.ok){
                return res.json()
            }
        })
        .then(function(responses){/*Création de tous les articles*/
            for(let response of responses){
                let cadre = document.createElement("div")
                cadre.classList.add("bloc-produits__cadre")
                cadre.setAttribute('id',response.name.split(' ')[0])

                    let lien = document.createElement("a")
                    lien.classList.add("cadre-produit")
                    lien.addEventListener("click",()=>{
                        localStorage.setItem("id",response._id)
                    })
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
                        prix.innerText = `Prix : ${(response.price/100)} €`

                        blocProduits.appendChild(cadre)
                        cadre.appendChild(lien)
                        lien.appendChild(photo)
                        photo.appendChild(image)
                        lien.appendChild(nom)
                        lien.appendChild(prix)
            }
            return responses
        })
        .then(function(results){/*Search-bar*/
            let allArticles = results
            console.log(allArticles)
            searchSubmit.addEventListener('click',function(e){/*Évènement sur la barre de recherche*/
                e.preventDefault()
                let upperFirstLetter = search.value.slice(0,1).toUpperCase()
                let endOfWord = search.value.slice(1).toLowerCase()
                let stringToCompare = `${upperFirstLetter}${endOfWord}`
                let articleToHide = allArticles.filter( article => !article.name.includes(stringToCompare) && !article.name.includes(search.value))/*Création d'un nouveau tableau dont le nom comprend ce qui a été saisie par l'utilisateur dans la barre de recherche*/
                allArticles.map(article => {/*Remise à zéro des display par défaut à flex pour afficher tous les produits*/
                    let newName = article.name.split(' ')[0]
                    let test = document.getElementById(`${newName}`)
                    test.style.display = 'flex'
                })
                articleToHide.map(article => {/*Affiche seulement les résultats de la recherche utilisateur*/
                    let newName = article.name.split(' ')[0]
                    let test = document.getElementById(`${newName}`)
                    test.style.display = 'none'
                    console.log(newName)
                })
                if(articleToHide.length === allArticles.length){/*Affiche un message s'il n'y a aucun résultats pour la recherche saisie*/
                    console.log('Aucun article(s) ne correspond à votre recherche !')
                    blocProduits.appendChild(noArticleFrame)
                }
                else if(blocProduits.appendChild(noArticleFrame)){
                    blocProduits.removeChild(noArticleFrame)
                }
                console.log(`articleToHide = contient ${articleToHide.length} élément(s)`)
                console.log(`Voici les éléments cachés : ${articleToHide.map(elt => elt.name)}`)
            })
        })
        .catch(function(err){
            alert(err)
        })
}
getIndex()
getGlobalBasket()