// http://api.weatherapi.com/v1/current.json?key=5ccdd9b3308d456ba0b160547250503&q=mumbai&aqi=no

let target = 'Mumbai' // let - can change the value later

// returns first element that matches css selector
const temperaturefield = document.querySelector(".temp");
const locationfield = document.querySelector(".time_location p");
const datafield = document.querySelector(".time_location span");
const weatherfield = document.querySelector(".condition p");
const searchfield = document.querySelector(".Search_area");
const searchbutton = document.querySelector(".search_button");
const form = document.querySelector('form');

//Attaches an event listener
form.addEventListener('submit' , searchforlocation)

const fetchResults = async (targetLocation) =>{
    let url = `http://api.weatherapi.com/v1/current.json?key=5ccdd9b3308d456ba0b160547250503&q=${targetLocation}&aqi=no`
    const res = await fetch(url)
    const data =await res.json()
    console.log(data)
    let locationName = data.location.name
    //console.log(locationName)
    let time = data.location.localtime
    let temp = data.current.temp_c
    let condition = data.current.condition.text
    updateDetails(temp , locationName , time , condition)
}

//innerText returns text content of an element
function updateDetails(temp , locationName,time,condition){
    let splitdate = time.split(" ")[0]
    let splittime = time.split(" ")[1]

    let currentDay = getDayName(new Date(splitdate).getDay())
    
    temperaturefield.innerText = temp;
    locationfield.innerText = locationName;
    datafield.innerText = `${splitdate} ${currentDay} ${splittime}`;
    weatherfield.innerText = condition;
}

function searchforlocation(e){
    e.preventDefault()
    target = searchfield.value
    fetchResults(target)
}

fetchResults(target)

function getDayName(number){
    switch(number){
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday'; 
    }
}