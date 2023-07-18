const apiKey = "c8ca90b6-dd6a-48a4-b4d0-342b5c0e5eee"
const countryName = "France"
const stateName = "California"
const dropdown = document.getElementById("selectCountry")





function getValue() {
    // Sélectionner l'élément input et récupérer sa valeur
    let stateName = document.getElementById("selectState").value;
    // Afficher la valeur
    document.getElementById("selectState").innerHTML = `${stateName}`
    return stateName
}

document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("selectState");
    fetch ("http://api.airvisual.com/v2/states?country=France&key=2a1e45d1-95a2-46b6-b89c-46b687724e7a")
        .then((response) => response.json())
        .then((data) => {
            // La réponse de l'API contient un objet "data" avec la liste des pays dans la propriété "data"
            const regions = data.data;
            regions.forEach((region) => {
                const newOption = document.createElement("option");
                newOption.text = region.state;
                newOption.value = region.state; // Vous pouvez utiliser une autre propriété unique si nécessaire
                dropdown.add(newOption);
            });
        })
        .catch((error) => console.error("Erreur lors de la récupération des pays :", error));
});


document.getElementById("selectState").addEventListener("change", function (){
    const stateName = document.getElementById("selectState").value
})



document.addEventListener("DOMContentLoaded", function () {
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




async function callApiSearch(){
    const url = `http://api.airvisual.com/v2/city?city=${cityName}&state=${stateName}&country=France&key=${apiKey}`
    const fetcher = await fetch(url);
    const json = await fetcher.json();
    console.log(json)
}





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

