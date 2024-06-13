


const apiKey = '42f8760ffd5e47ec877202925241106';
const searchInput = document.getElementById('search');

async function getWeatherForecast(location = 'giza') {
    var api = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;
    try {
        var response = await fetch(api);
        var weatherData = await response.json();
        // var country = weatherData.location.country
        // return weatherData;
        } catch (e) {
            console.error(e);
            }
        weatherData && buildWeatherCardsHtml(weatherData)
}

getWeatherForecast();

// pass by reference (event is sent already)
searchInput.addEventListener('click', searchByCity)

// searchInput.addEventListener('click', function(event) {
//     searchByCity(event)
// })

function searchByCity(event) {
    loc = event.target.previousElementSibling.value;
    const data = getWeatherForecast(loc);
    event.target.previousElementSibling.value = ""
}

/* TODO: create function to build html from api data to display in cards.
    city name
    condition image and text
    3 days forecasting (3 cards)
    date for each day, weather temprature and conditions

*/
function getDayNameFromDate(date) {
    return new Date(date).toLocaleDateString("en", { weekday: 'long'   });
     
}
function getMonthNameFromDate(date) {
    return new Date(date).toLocaleDateString("en", { month: 'long',day: 'numeric',});
        
}

function buildWeatherCardsHtml(weather) {
    
    const html = `
        <div class="col-lg-4">
            <div class="body-car-1">
                <div class="date">
                    <h3 class="day">${getDayNameFromDate(weather.current.last_updated)}</h3>
                  
                    <h3 class="month">${getMonthNameFromDate(weather.current.last_updated)}</h3>
                </div>
                <div class="temp-data">
                    <div class="country">
                        <h3>${weather.location.name}</h3>
                    </div>
                    <div class="temprature">
                        <h1>${weather.current.temp_c}°C</h1>
                    <img src=" ${weather.current.condition.icon}">
                    </div>
                    <div class="status">
                        <span>${weather.current.condition.text}</span>
                            
                         
                    </div>
                    <div class="details d-flex justify-content-start align-items-center">
                        <div class="humedity p-2">
                            <span><i class="fa-solid fa-umbrella"></i></span>
                            <span>${weather.current.humidity}%</span>
                        </div>
                        <div class="wind p-2">
                            <span><i class="fa-solid fa-wind"></i></span>
                            <span>${weather.current.wind_kph}km/h</span>
                        </div>
                        <div class="location p-2">
                            <span><i class="fa-regular fa-compass"></i></span>
                            <span>${weather.current.wind_dir}</span>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="body-car-2">
                <div class="date-2 ">
                    <h3 class="day">${getDayNameFromDate(weather.forecast.forecastday[1].date)}</h3>
                    
                </div>
                <div class="temp-data-2">
                    <div class="country-status">
                        <img src="${weather.forecast.forecastday[1].day.condition.icon}">
                    </div>
                    <div class="temprature-2">
                        <h1>${weather.forecast.forecastday[1].day.maxtemp_c}°</h1>
                        <h3>${weather.forecast.forecastday[1].day.mintemp_c}°</h3>
                    </div>
                    <div class="status-2">
                        <span>${weather.forecast.forecastday[1].day.condition.text}</span>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="body-car-2">
                <div class="date-3 ">
                    <h3 class="day">${getDayNameFromDate(weather.forecast.forecastday[2].date)}</h3>
                    
                </div>
                <div class="temp-data-3">
                    <div class="country-status">
                        <img src="${weather.forecast.forecastday[1].day.condition.icon}">
                    </div>
                    <div class="temprature-2">
                        <h1>${weather.forecast.forecastday[2].day.maxtemp_c}°</h1>
                        <h3>${weather.forecast.forecastday[2].day.mintemp_c}°</h3>
                    </div>
                    <div class="status-2">
                        <span>${weather.forecast.forecastday[2].day.condition.text}</span>
                    </div>
                    
                </div>
            </div>
        </div>
    `
    document.getElementById('weather-cards').innerHTML = html;
}
