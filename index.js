const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

//initially vairables need????

let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    // e.preventDefault();////
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    // e.preventDefault();
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        //HW

    }

}

function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;


}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");
console.log(searchInput)
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        //hW
    }
}

// console.log('Hello Jee Ajay');
// const userTab=document.querySelector("[data-usreWeather]");
// const searchTab=document.querySelector("[data-searchWeather]");
// const userContainer=document.querySelector(".weather-container");

// const grantAccessContainer=document.querySelector(".grant-location-container");
// const searchForm=document.querySelector("[data-searchForm]");
// const loadingScreen=document.querySelector(".loading-container");
// const userInfoContainer=document.querySelector(".user-info-container");

// //initially need variable-->

// let currentTab=userTab;
// constAPI_KEY="d1845658f92b31c64bd94f06f7188c9c";
// currentTab.classList.add("current-tab");

// //ek or kaam baki hai-->

// function switchTab(clickedTab){
//    if(clickedTab!=currentTab){
//     currentTab.classList.remove("current-tab");
//     currentTab=clickedTab;
//     currentTab.classList.add("current-tab");

//     if(!searchForm.classList.contains("active")){
//     //kya search form wala container is invisible, if yes then make it visible--
//     userInfoContainer.classList.remove("active");
//     searchAccessContainer.classList.remove("active");
//     searchForm.classList.add("active");
//     }
//     else{
//         //main pahle search wale tab par tha,ab your weather tab visible karna hai

//         searchForm.classList.remove("active");
//         userInfoContainer.classList.remove("active");
//         // ab main your weather tab me aagya hu,toh weather bhi display karna pdega,so lets check local storage
//         // for coordinates , if we haved saved them there
//         getfromSessionStorage();
//     }
//    } 
// }
// userTab.addEventListener("click",()=>{
//     // pass clicked tab as input parameter
//     switchTab(userTab);
// });
// searchTab.addEventListener("click",()=>{
//     // pass clicked tab as input parameter
//     switchTab(searchTab);
// });

// //check clicked tab as input parameter
// function getfromSessionStorage(){
//    const localCoordinates=sessionStorage.getItem("user-coordinates");
//    if(!localCoordinates){
//     //agar local coordinates nahi mile 
//     grantAccessContainer.classList.add("active");
//    } 
//    else{
//     const coordinates=JSON.parse(localCoordinates);
//     fetchUserWeatherInfo(coordinates);
//    }
// }

// function fetchUserWeatherInfo(coordinates){
//     const{lat,lon}=coordinates;
//     //make grantcontainer invisible
//     grantAccessContainer.classList.remove("active");
//     //make loader visible
//     loadingScreen.classList.add("active");

//     //API call
//     try{
//         const response= await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
//         ); 
//         const data= await response.json();

//         loadingScreen.classList.remove("active");
//         userInfoContainer.classList.add.apply("active");
//         renderWeatherInfo(data);
//     }
//     catch(err){
//       loadingScreen.classList.rfemove("active");
//       //HW
//     }

// }

// function renderWeatherInfo(weatherInfo){
//   //finally, we have to fetch the elements
  
//   const cityName=document.querySelector("[data-active]");
//   const countryIcon=document.querySelector("data-countryIcon]");
//   const desc=document.querySelector("[data-weatherDesc]");
//   const weatherIcon=document.querySelector("[data-weatherIcon]");
//   const temp=document.querySelector("[data-temp]");
//   const windspeed=document.querySelector("[data-windspeed]");
//   const humidity=document.querySelector("[data-humidity]");
//   const cloudness=document.querySelector("[data-cloudiness]");

//   //fetch values from weatherInfo object and put it UI elements
//   cityName.innerText=weatherInfo?.name;
//   countryIcon.src=`https://flagcdn.com/144*108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
//   desc.innerText=weatherInfo?.weather?.[0]?.description;
//   weatherIcon.src=`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
//   temp.innerText=weatherInfo?.main?.temp;
//   windspeed.innertext=weatherInfo?.wind?.speed;
//   humidity.innertext=weatherInfo?.main?.humidity;
//   cloudiness.innertext=weatherInfo?.clouds?.all;;

// }

// functiongetLocation()
// {
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         //HW- show an alert for no geolocation support available

//     }
// }

// function showPosition(position){

//     const userCoordinates={
//         lat:position.coords.latitude,
//         lon:position.coords.longitude,
//     }
//     sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
//     fetchUserWeatherInfo(userCoordinates);

// }

// const grantAccessButton=document.querySelector("[data-grantAccess]");
// grantAccessButton.addEventListener("click",getLocation);

// const searchInput=document.querySelector("[data-searchInput]");

// searchForm.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     let cityName=searchInput.value;

//     if(cityName=="")
//         return;
//     else
//         fetchUserWeatherInfo(cityName);
// })

// async function fetchUserWeatherInfo(city){
//     loadingScreen.classList.add("active");

//     userInfoContainer.classList.remove("active");
//     grantAccessContainer.classList.remove("active");

//     try{
//         const response=await fetch(

//         );
//         const data=await response.json();
//         loadingScreen.classList.remove("active");
//         userInfoContainer.classList.add("active");
//         renderWeatherInfo(data);
//     }
//     catch(err){
//         //hw
//     }
// }














// const API_KEY= "d6f962bef06eee70b68fb1c73b5acd9ab";

// function renderWeatherInfo(data){
//       let newPara = document.createElement('p');
//       newPara.textContent = `${data?.main?.temp.toFixed(2)} ℃`

//       document.body.appendChild(newPara);
// }

// async function fetchWeatherDetails(){
//     try{
//         let city= "goa";
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_kEY}&units=metric`);
    
//         const data= await response.json();
//         console.log("Weather data:->" ,data);
    
//        renderWeatherInfo(data);
//     }
//     catch(err){
//        //handle the error here--

//     }
//     //https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_kEY}&units=metric
    
// }

// async function getCustomWeatherDetails(){

//     try{
//         let lattitude=15.6333;
//         let longitude=18.3333;
//         let result= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${API_kEY}&units=metric`);
//         let data=await result.json();
    
//         console.log(data);
//     }
//     catch(err){
//       console.log("Error Found" ,err);  
//     }

// }

// function switchTab(clickTab){

//     apiErrorContainer.classList.remove("active");

//     if(clickedTab !== currentTab){
//         currentTab.classList.remove("current-tab");
//         currentTab = clickedTab;
//         currentTab.classList.add("current-tab");

//         if(!searchForm.classList.contains("active")){
//             userInfoContainer.classList.remove("active");
//             grantAccessContainer.classList.remove("active");
//             searchForm.classList.add("active");
//         }
//         else{
//             searchForm.classList.remove("active");
//             userInfoContainer.classList.remove("active");
//             getFromSessionStorage();
//         }
//        // console.log("Current Tab",currentTab);
//     }
// } 

// function getLocation(){
//     if(navigator.geolocation)
// {
//     navigator.geolocation.getCurrentPosition(showposition);
// }
// else{
//     console.log("No Geolocation Support");
// }
// }

// function showposition(position){
//     let lat=position.coords.latitude;
//     let longi=position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }
