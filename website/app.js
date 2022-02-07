/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=2bdf2cf395efc47972a85897a2781990&units=imperial";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Calling an event listener to the element with the id of generate
document.getElementById('generate').addEventListener('click',getValues);

// Adding a named callback function as the second parameter.
function getValues(){
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(baseURL, zipCode, apiKey)
    .then(function(data){
      // Add data to POST
        postData('/add', {date: newDate, temp: data.main.temp, content: feelings })
        retrieveData();
    })
}

// The callback function to get data from OpenWeatherMap API
const getWeather = async (baseURL, zip, Key)=>{
  const res = await fetch(baseURL + zip + Key);
  try {
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
}
// The function to POST data
const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content
    })       
  });

  try {
      const newData = await response.json();
      return newData;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };

const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }