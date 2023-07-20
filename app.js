const apiKey = "c8ca90b6-dd6a-48a4-b4d0-342b5c0e5eee"



const dropdown = document.getElementById("selectCountry")
let  tableauCity = ""




function getValue() { //fonction pour retourner un nom de région dans l'élément selectRegion
    let stateName = document.getElementById("selectRegion").value;
    document.getElementById("selectRegion").innerHTML = `${stateName}`
    return stateName
}

document.addEventListener("DOMContentLoaded", function () { //ça veut dire que la fonction s'exécute uniquement quand la page est complétement chargée
    const dropdown = document.getElementById("selectRegion"); //dropdown = l'élément 'selectRegion'
    fetch ("http://api.airvisual.com/v2/states?country=France&key=2a1e45d1-95a2-46b6-b89c-46b687724e7a") //requête à l'API airvisual qui va nous donner les données uniquement pour la France
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
    fetch (`http://api.airvisual.com/v2/cities?state=${stateName}&country=France&key=2a1e45d1-95a2-46b6-b89c-46b687724e7a`) // la valeur de la région choisi s'intègre dans l'url de l'API
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
    console.table(tableauCity)
    console.log(tableauCity.location.coordinates)
    console.log(tableauCity.location.coordinates[0])
    console.log(tableauCity.location.coordinates[1]);

    map.getView().setCenter(ol.proj.fromLonLat([tableauCity.location.coordinates[0],tableauCity.location.coordinates[1]]))
    map.getView().setZoom(10)   
}
/*document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("selectCity");
    fetch (`http://api.airvisual.com/v2/cities?state=${stateName}&country=France&key=2a1e45d1-95a2-46b6-b89c-46b687724e7a`)
        .then((response) => response.json())
        .then((data) => {
            // La réponse de l'API contient un objet "data" avec la liste des pays dans la propriété "data"
            const cities = data.data;
            cities.forEach((city) => {
                const newOption = document.createElement("option");
                newOption.text = city.city;
                newOption.value = city.city; // Vous pouvez utiliser une autre propriété unique si nécessaire
                dropdown.add(newOption);
            });
        })
        .catch((error) => console.error("Erreur lors de la récupération des pays :", error));
});


*/


async function callApiCity(){
    
    const url = `http://api.airvisual.com/v2/cities?state=Guyane&country=France&key=${apiKey}`
    const fetcher = await fetch(url);
    const json = await fetcher.json();
    const tableauCity = json.data;
    
    console.log(tableauCity)
   
    

}





async function callApiIp(){
    
    const url = `http://api.airvisual.com/v2/nearest_city?key=${apiKey}`
    const fetcher = await fetch(url);
    const json = await fetcher.json();
    console.log(json);
    console.log(json.data.location.coordinates)

}





async function callApiMap(){
    
    const url = `http://api.airvisual.com/v2/nearest_station?lat=16.62&lon=49.21&key=${apiKey}`
    const fetcher = await fetch(url);
    const json = await fetcher.json();
    console.log(json)
}

