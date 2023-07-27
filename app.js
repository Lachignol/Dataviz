const apiKey = "6997c4c6-9e88-4611-b814-6ac0a87c9c74"
const countryName ="france";
const dropdown = document.getElementById("selectCountry")
let  tableauCity = ""

function getValue() { //fonction pour retourner un nom de région dans l'élément selectRegion
    let stateName = document.getElementById("selectRegion").value;
    document.getElementById("selectRegion").innerHTML = `${stateName}`
    return stateName
}

document.addEventListener("DOMContentLoaded", function () { //ça veut dire que la fonction s'exécute uniquement quand la page est complétement chargée
    const dropdown = document.getElementById("selectRegion"); //dropdown = l'élément 'selectRegion'
    fetch (`http://api.airvisual.com/v2/states?country=${countryName}&key=${apiKey}`) //requête à l'API airvisual qui va nous donner les données uniquement pour la France
    .then((response) => response.json()) // première réponse de l'API (le then permet de ne pas marquer async)
    .then((data) => {  // deuxième réponse de l'API qui nous renvoie les données relatives à la France
        // La réponse de l'API contient un objet "data" avec la liste des pays dans la propriété "data"
        let regions = data.data; // variable région
        regions.forEach((region) => { // boucle qui dit que pour chaque région, ajouter l'élément dans le selectRegion
            const newOption = document.createElement("option");
            newOption.text = region.state; // texte qui va être affiché dans l'option
            newOption.value = region.state;  // valeur que va prendre l'option
            dropdown.add(newOption); // commande pour ajouter l'élément dans le selectRegion
        });
        
    })
    .catch((error) => console.error("Erreur lors de la récupération des régions :", error));
});

document.getElementById("selectRegion").addEventListener("change", function (){ //fonction qui s'exécute uniquement quand il y a un changement dans 'selectRegion'
    (document.getElementById("selectCity")).innerHTML = '<option value="">--Sélectionner votre ville --</option>'; // ajoute l'élement dans selectCity
    const stateName = document.getElementById("selectRegion").value; //state name est = à la valeur rentrée dans le selectRegion
    fetch (`http://api.airvisual.com/v2/cities?state=${stateName}&country=France&key=${apiKey}`) // la valeur de la région choisi s'intègre dans l'url de l'API
        .then((response) => response.json())
        .then((data) => {
            // La réponse de l'API contient un objet "data" avec la liste des pays dans la propriété "data"
            const cities = data.data; // les villes sont sorties de l'API
            cities.forEach((city) => { // pour chaque ville, cette boucle l'intègre au selectCity
                const newOption = document.createElement("option");
                newOption.text = city.city;
                newOption.value = city.city; // Vous pouvez utiliser une autre propriété unique si nécessaire
                (document.getElementById("selectCity")).add(newOption);
            });
        })

       .catch((error) => console.error("Erreur lors de la récupération des villes :", error));
})

async function callApiSearch(){ // fonction asynchrone qui va nous renvoyer les données de l'API pour la ville choisie
    const cityName = document.getElementById("selectCity").value
    const stateName = document.getElementById("selectRegion").value
    const url = `http://api.airvisual.com/v2/city?city=${cityName}&state=${stateName}&country=France&key=${apiKey}`
    const fetcher = await fetch(url);
    const json = await fetcher.json();
    tableauCity = json.data
    let qualitéAir = tableauCity.current.pollution.aqius           
    let indiceDePollution = tableauCity.current.pollution.aqicn
    let temperature = tableauCity.current.weather.tp
    map.getView().setCenter(ol.proj.fromLonLat([tableauCity.location.coordinates[0],tableauCity.location.coordinates[1]]))
    map.getView().setZoom(10)   
    document.getElementById("affichageResult").innerHTML = `<ul><li>Indice de qualité de l'air: ${qualitéAir}</li> <li>Concentration de particules fines (PM2.5):${indiceDePollution}µg/m3</li> <li>temperature : ${temperature} °c</li></ul> `;
    if (qualitéAir>0 && qualitéAir<50){
        popupVerte()}
    if(qualitéAir>=50 && qualitéAir<89){
        popupOrange()}
    if(qualitéAir>90){
        popupRouge()}
}
    
async function callApiIp(){
    
    const url = `http://api.airvisual.com/v2/nearest_city?key=${apiKey}`
    const fetcher = await fetch(url);
    const json = await fetcher.json();
    tableauCity = json.data
    let countryName = tableauCity.country
    let qualitéAir = tableauCity.current.pollution.aqicn
    let indiceDePollution = tableauCity.current.pollution.aqius
    let temperature = tableauCity.current.weather.tp
    console.log(tableauCity)
    map.getView().setCenter(ol.proj.fromLonLat([tableauCity.location.coordinates[0],tableauCity.location.coordinates[1]]))
    map.getView().setZoom(10)   
    document.getElementById("affichageResult").innerHTML = `<ul><li>Indice de qualité de l'air: ${qualitéAir}</li> <li>Concentration de particules fines (PM2.5):${indiceDePollution}µg/m3</li> <li>temperature : ${temperature} °c</li></ul> `;
    if (qualitéAir>0 && qualitéAir<50){
        popupVerte()}
    if(qualitéAir>=50 && qualitéAir<89){
        popupOrange()}
    if(qualitéAir>90){
        popupRouge()}
}
    
