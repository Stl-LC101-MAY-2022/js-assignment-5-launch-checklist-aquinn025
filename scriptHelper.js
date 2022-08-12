// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let div = document.getElementById("missionTarget"); 
   div.innerHTML = `
              <h2>Mission Destination</h2>
              <ol>
                 <li>Name: ${name}</li>
                 <li>Diameter: ${diameter}</li>
                 <li>Star: ${star}</li>
                 <li>Distance from Earth: ${distance}</li>
                 <li>Number of Moons: ${moons}</li>
              </ol>
              <img src="${imageUrl}">
              `;
}

function validateInput(testInput) {
    if(testInput === ""){
     return "Empty";
    } else if(isNaN(testInput)){
     return "Not a Number";
    } else if(isNaN(testInput)=== false){
      return "Is a Number";
    }
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
 
    //if statement testing to make sure that all of the fields have been filled out
      if(validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        // alert to notify the user that they have not used filled out all of the required fields
        alert("All fields are required!");
     //if statement testing to make sure that all of the required fields have the proper input type
     } else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number' || validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        //alerting user that the input types are invalid
        alert("Make sure all of your inputs are valid. Please correct input type.")
     } else {
         //updating the innerHTML of to include pilot and copilot's name
         list.style.visibility = 'visible';
         pilotStatus.innerHTML = `${pilot} is ready for launch!`
         copilotStatus.innerHTML = `${copilot} is ready for launch!`
 
         if(fuelLevel< 10000 && cargoLevel > 10000) {
             //updating styles and innerHTML to reflect that the fuel and cargoStatuss are not ready for launch
             fuelStatus.innerHTML = `${fuelLevel} liters is not sufficient for takeoff. 10,000 liters needed.`;
             launchStatus.innerHTML = `Shuttle not ready for launch`;
             launchStatus.style.color = 'red';
             cargoStatus.innerHTML = `${cargoLevel} kg weighs too much for takeoff. Make sure cargo weighs less than 10,000 kg.`
             //if statement testing if the fuelLevel is ready for launch
         } else if (fuelLevel < 10000) {
             //updating styles and innerHTML to reflect that the fuel level is not ready for launch, but cargoValue is. 
             fuelStatus.innerHTML = `${fuelLevel} liters is not sufficient for takeoff. 10,000 liters needed.`;
             launchStatus.innerHTML = `Shuttle not ready for launch`;
             launchStatus.style.color = 'red';
             cargoLevel.innerHTML = `Cargo mass low enough for launch`
             //if statement testing if the cargo value is ready for launch
         } else if (cargoLevel > 10000) {
             //updating styles and innerHTML to reflect that the cargoMass is not ready for launch, but fuel level is. 
             launchStatus.innerHTML = `Shuttle not ready for launch`;
             launchStatus.style.color = 'red';
             cargoStatus.innerHTML = `${cargoLevel} kg weighs too much for takeoff. Make sure cargo weighs less than 10,000 kg.`;
             fuelStatus.innerHTML = `Fuel level high enough for launch`;
             //if both fuel level and cargo mass are at the required level then updating the rest of the styles and innerHTML for the ol in faultyItems
         } else {
             launchStatus.innerHTML = `Shuttle is ready for launch.`;
             launchStatus.style.color = `green`;
             fuelStatus.innerHTML = `Fuel level high enough for launch`;
             cargoStatus.innerHTML = `Cargo mass low enough for launch`
         }     
     }
 }
 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
         return response.json();
         });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let i = Math.floor(Math.random() * planets.length) ;
    return planets[i];

   }
 

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
