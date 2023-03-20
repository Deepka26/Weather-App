// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// 2f71edf5307fc0b24a48ea0546cdfd91
const weatherApi={
    key:"2f71edf5307fc0b24a48ea0546cdfd91",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather?"

}
const inputBox=document.getElementById("input-box");
inputBox.addEventListener("keypress",(e)=>{
   if(e.key=="Enter"){
    console.log(inputBox.value);
    getWeatherReport(inputBox.value);
   }
        
    
})
function getWeatherReport(city)
{
    fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((response)=>{
        console.log(response)
        return response.json();
}).then(showWeatherReport)
}
function showWeatherReport(response){
        console.log(response);
        let city=document.getElementById("city");
        city.innerText=`${response.name}, ${response.sys.country}`;
        let temp=document.getElementById("temp");
        temp.innerHTML=`${Math.round(response.main.temp)}&deg;C`;
        let minMaxTemp=document.getElementById("min-max");
        minMaxTemp.innerHTML=`${Math.floor(response.main.temp_min)}&deg;C (min)&nbsp;&nbsp;${Math.ceil(response.main.temp_max)}&deg;C (max)`
        let weather=document.getElementById("weather")
        weather.innerText=`${response.weather[0].main}`
        let date=document.getElementById("date")
        let todayDate=new Date();
        date.innerText=dateManage(todayDate);
        if(weather.textContent=="Clear"){
            document.body.style.backgroundImage="url('/images/sky-83132_960_720.jpg')";
        }
        else if(weather.textContent=="Haze"){
            document.body.style.backgroundImage="url('/images/haze.jpg')";
        }
        else if(weather.textContent=="Sunny"){
            document.body.style.backgroundImage="url('/images/sunny.jpg')";
        }
        else if(weather.textContent=="Clouds"){
           document.body.style.backgroundImage="url('/images/cloudy.jpg')";
        }

}
function dateManage(arg){
    let dayArray=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let monthArray=["January","February","March","April","May","June","July","August","September","October","November","December"]
    let date=arg.getDate();
    let month=monthArray[arg.getMonth()];
    let day=dayArray[arg.getDay()];
    let year =arg.getFullYear();
    return `${date} ${month} ${day}, ${year}`
}