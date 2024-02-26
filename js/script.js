const mon = ["일","월","화","수","목","금","토"];
const enmon = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
const st = ['GOOD','FAIR','MODERATE','POOR','VERY POOR'];
$(function(){
    let city = "";
    weathers("gimpo-si");

    $('.now-date').html(nowdate());

    // input search박스랑 버튼 입력
    $("#searchcity").on("keypress", function(e){
        if(e.which == 13 && !e.shiftkey){
          const cityname = $('#searchcity').val();
          if(cityname){
             weathers(cityname);
          }else{
            alert("도시이름을 입력하세요.");
            return;
          }
            $(this).val('');
        }
      });
    
      $('#searchbtn').on('click', function(e){
         e.preventDefault();
         const cityname = $('#searchcity').val();
         if(cityname){
             weathers(cityname);
             $('#searchcity').val('');
         }else{
            alert("도시이름을 입력하세요.");
            return;
         }
      });
}); //jquery

function nowdate(){
    let now = new Date();
    
    let ntime =  now.getFullYear()+"년 " +(now.getMonth()+1) + "월 "+ now.getDate()+"일 ";
    ntime += "("+mon[now.getDay()]+") ";
    return ntime;
  }


// 날씨정보 넣기
function weathers(city){
    const url = "//api.openweathermap.org/data/2.5/forecast";
    const url2 = "//api.openweathermap.org/data/2.5/air_pollution";
    const wdata = {
        q: city , 
        appid: "d49bd7ef014ee10b5e9db169e24ff246",
        units:"metric",
        lang:"kr"
    }

    $.ajax({
        dataType : "json",
        url : url,
        data: wdata,

        success : function(data){
            console.log(data);
            const lat = data.city.coord.lat;
            const lon = data.city.coord.lon;
            const dt = data.list;
            let wmain ="";
            let airInfo = "";
            let sunsar = "";
            let timeweather = "";
            let dayweather = "";
            for(let i = 0; i<dt.length; i++){
                const weatherDate = new Date(dt[i].dt*1000);
                const cityrise = new Date(data.city.sunrise*1000);
                const cityset = new Date(data.city.sunset*1000);
                let weatherDay2='',weatherDay3='',weatherDay4='',weatherDay5='',weatherDay6='';
                let next1temp = '', next2temp = '', next3temp = '', next4temp = '', next5temp = '';
                
                let icon1 = '', co1 = '';
                let icon2 = '', co2 = '';
                let icon3 = '', co3 = '';
                let icon4 = '', co4 = '';
                let icon5 = '', co5 = '';
                if(i+1 < dt.length){
                const icn1 = getWeatherIcon(dt[i+1].weather[0].icon);
                const weatherDate2 = new Date(dt[i+1].dt*1000);
                weatherDay2 = enmon[weatherDate2.getDay()];
                next1temp = Math.round(dt[i+1].main.temp);
                icon1 = icn1[0];
                co1 = icn1[1];
                }
                if(i+2 < dt.length){
                const icn2 = getWeatherIcon(dt[i+2].weather[0].icon);
                const weatherDate3 = new Date(dt[i+2].dt*1000);
                weatherDay3 = enmon[weatherDate3.getDay()];
                next2temp = Math.round(dt[i+2].main.temp);
                icon2 = icn2[0];
                co2 = icn2[1];
                }
                if(i+3 < dt.length){
                const icn3 = getWeatherIcon(dt[i+3].weather[0].icon);
                const weatherDate4 = new Date(dt[i+3].dt*1000);
                weatherDay4 = enmon[weatherDate4.getDay()];
                next3temp = Math.round(dt[i+3].main.temp);
                icon3 = icn3[0];
                co3 = icn3[1];
                }
                if(i+4 < dt.length){
                    const icn4 = getWeatherIcon(dt[i+4].weather[0].icon);
                    const weatherDate5 = new Date(dt[i+4].dt*1000);
                    weatherDay5 = enmon[weatherDate5.getDay()];
                    next4temp = Math.round(dt[i+4].main.temp);
                    icon4 = icn4[0];
                    co4 = icn4[1];
                }
                if(i+5 < dt.length){
                    const icn5 = getWeatherIcon(dt[i+5].weather[0].icon);
                    const weatherDate6 = new Date(dt[i+5].dt*1000);
                    weatherDay6 = enmon[weatherDate6.getDay()];
                    next5temp = Math.round(dt[i+5].main.temp);
                    icon5 = icn5[0];
                    co5 = icn5[1];
                }
                const weatherYear = weatherDate.getFullYear();
                const weatherMonth = (weatherDate.getMonth()+1);
                const weatherDt = weatherDate.getDate();
                const weatherDay = mon[weatherDate.getDay()]; 
                const weatherHours = weatherDate.getHours();
                const cityrisehours = cityrise.getHours();
                const cityrisemin = cityrise.getMinutes();
                const citysethours = cityset.getHours();
                const citysetmin = cityset.getMinutes();
                // console.log(weatherYear+" "+weatherMonth+" "+weatherDt+" "+weatherDay+" "+weatherHours+"시");
                let icn = getWeatherIcon(dt[i].weather[0].icon);
                let cityicn = getWeatherIcon(dt[0].weather[0].icon);
                switch(i){
                  case 0:
                    wmain += `<div class="city-name" id="city-name">${data.city.name}</div>
                    <div class="now-info">
                        <div class="now-date">
                            <P id="now-date">${weatherYear}년 ${weatherMonth}월 ${weatherDt}일(${weatherDay})</P>
                        </div>
                        <div class="temp-icon row">
                            <div class="temp col-6">
                                <span id="now-temp">${next1temp}ºC</span>
                                <div class="temp-mami"><span id="temp-max">${Math.round(dt[0].main.temp_max)}º</span>/<span id="temp-min">${Math.round(dt[0].main.temp_min)}º</span></div>
                                <div class="temp-feel" id="temp-feel">체감온도 ${Math.round(dt[0].main.feels_like)}º</div>
                            </div>
                            <div class="icon col-6">
                                <img src="img/${icon1}.png" alt="1">
                            </div>
                        </div>     
                    </div>
                    <div class="des-weather">
                        <p id="des-weather">${dt[0].weather[0].description}</p>
                    </div>`;

                    airInfo +=`<div class="col-6 aqi">
                                <span>대기질<h3 id="aqi">좋아혀</h3></span>            
                              </div>
                              <div class="col-6 humi">
                                  <span>습도<h3>${dt[0].main.humidity}%</h3></span>   
                              </div>`;
                    
                    sunsar += `<div class="col-6 rise">
                                <span>해 뜨는 시간<h3>${cityrisehours}시${cityrisemin}분</h3></span>    
                              </div>
                              <div class="col-6 set">
                                <span>해 지는 시간<h3>${citysethours}시${citysetmin}분</h3></span>    
                              </div>`;
                    
                    
                  break;
                }
                timeweather += `
                                    <!-- loop -->
                                    <div class="time-content pt-4">
                                      <p class="time-3hours">${weatherHours}시</p>
                                      <div class="time-icon">
                                        <img src="img/${icn[0]}.png"  alt="1">
                                      </div>
                                      <div class="rain">
                                        <i class="fa-solid fa-wind"></i>
                                        <span>풍향 ${dt[i].wind.deg}</span>
                                      </div>
                                      <div class="wind">풍속 ${dt[i].wind.speed}m/s</div>
                                      <div class="time-temp px-1">
                                      ${Math.round(dt[i].main.temp)}º
                                      </div>
                                      
                                    </div>`;
                
                dayweather += `<div class="day-content">
                                <p>${weatherDay2}</p>
                                <div class="day-icon">
                                  <img src="img/${icon1}.png"  alt="1">
                                </div>
                                <div class="day-rain">
                                    <i class="fa-solid fa-wind"></i>
                                    <span>풍향 ${dt[i].wind.deg}</span>
                                </div>
                                <div class="wind">풍속 ${dt[i].wind.speed}m/s</div>
                                <div class="day-temp px-1">
                                ${next1temp}º
                                </div>
                                
                            </div>
                            <!-- /loop -->
                            <!-- loop -->
                            <div class="day-content">
                                <p>${weatherDay3}</p>
                                <div class="day-icon">
                                  <img src="img/${icon2}.png"  alt="1">
                                </div>
                                <div class="day-rain">
                                    <i class="fa-solid fa-wind"></i>
                                    <span>풍향 ${dt[i].wind.deg}</span>
                                </div>
                                <div class="wind">풍속 ${dt[i].wind.speed}m/s</div>
                                <div class="day-temp px-1">
                                ${next2temp}º
                                </div>
                                
                            </div>
                            <!-- /loop -->
                            <!-- loop -->
                            <div class="day-content">
                                <p>${weatherDay4}</p>
                                <div class="day-icon">
                                  <img src="img/${icon3}.png"  alt="1">
                                </div>
                                <div class="day-rain">
                                    <i class="fa-solid fa-wind"></i>
                                    <span>풍향 ${dt[i].wind.deg}</span>
                                </div>
                                <div class="wind">풍속 ${dt[i].wind.speed}m/s</div>
                                <div class="day-temp px-1">
                                ${next3temp}º
                                </div>
                                
                            </div>
                            <!-- /loop -->
                            <!-- loop -->
                            <div class="day-content">
                                <p>${weatherDay5}</p>
                                <div class="day-icon">
                                  <img src="img/${icon4}.png"  alt="1">
                                </div>
                                <div class="day-rain">
                                    <i class="fa-solid fa-wind"></i>
                                    <span>풍향 ${dt[i].wind.deg}</span>
                                </div>
                                <div class="wind">풍속 ${dt[i].wind.speed}m/s</div>
                                <div class="day-temp px-1">
                                ${next4temp}º
                                </div>
                                
                            </div>
                            <!-- /loop -->
                            <!-- loop -->
                            <div class="day-content">
                                <p>${weatherDay6}</p>
                                <div class="day-icon">
                                  <img src="img/${icon5}.png"  alt="1">
                                </div>
                                <div class="day-rain">
                                    <i class="fa-solid fa-wind"></i>
                                    <span>풍향 ${dt[i].wind.deg}</span>
                                </div>
                                <div class="wind">풍속 ${dt[i].wind.speed}m/s</div>
                                <div class="day-temp px-1">
                                ${next5temp}º
                                </div>
                                
                            </div>
                            <!-- /loop -->`
                
// ${st[parseInt(data.list[0].main.aqi)-1]}
// <span>대기질<h3>${st[parseInt(data.list[0].main.api)-1]}</h3></span>
                            
            }
            
            destoryCarousel();
            $('.main-weather').html(wmain);
            $('.air-info').html(airInfo);
            $('.sun-info').html(sunsar);
            // $('.timebox').html(timeweather);
            $('.weather-slick').html(timeweather);
            $('.weather-slick2').html(dayweather);
            applySlider();

            const adata = {
              lat:lat,
              lon:lon,
              appid: "d49bd7ef014ee10b5e9db169e24ff246"
            }
            const st = ['GOOD','FAIR','MODERATE','POOR','VERY POOR'];
            //대기질 가져오기
            $.ajax({
              dataType :'json',
              url:url2,
              data:adata,
              success: function(data){
                console.log(data);
                const num = parseInt(data.list[0].main.aqi);
                $('#aqi').text(st[num-1]);
              },
              error:function(){
      
              }
            })
        },
        error : function(xhr, status, error){
            console.log(status,error);
            
          }
    });

}

//slick
function destoryCarousel(){
    if($('.weather-slick').hasClass('slick-initialized')){
      $('.weather-slick').slick('unslick');
    }
    if($('.weather-slick2').hasClass('slick-initialized')){
      $('.weather-slick2').slick('unslick');
    }
     
  }
  
  function applySlider(){
    $('.weather-slick').slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows : false,
          dots: false,
          autoplay: true,
          autoplaySpeed: 5000
        });
    $('.weather-slick2').slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows : false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 5000
    });
  }


//   날씨 아이콘
  function getWeatherIcon(iconName){
    let bgcolor, icon;
    switch(iconName){
      case '01d':
        bgcolor = "#FFFAAC";
        icon = "day-sunny";
      break;
      case '02d':
        bgcolor = "#B9F2FF";
        icon = "day-cloudy";
      break;
      case '03d':
        bgcolor = "#D8F8FF";
        icon = "cloud";
      break;
      case '04d':
        bgcolor = "#D8F8FF";
        icon = "cloud";
      break;
      case '09d':
        bgcolor = "#D8F3FF";
        icon = "day-rain";
      break;
      case '10d':
        bgcolor = "#D8F3FF";
        icon = "day-rain-wind";
      break;
      case '11d':
        bgcolor = "#CEDCDF";
        icon = "day-thunderstorm";
      break;
      case '13d':
        bgcolor = "#F3FCFF";
        icon = "day-snow";
      break;
      case '50d':
        bgcolor = "#E8E8E8";
        icon = "fog";
      break;
      case '01n':
        bgcolor = "#E8F4FF";
        icon = "night-clear";
      break;
      case '02n':
        bgcolor = "#DFEEF3";
        icon = "night-cloudy";
      break;
      case '03n':
        bgcolor = "#D8F8FF";
        icon = "cloud";
      break;
      case '04n':
        bgcolor = "#D8F8FF";
        icon = "cloud";
      break;
      case '09n':
        bgcolor = "#D8E2E5";
        icon = "night-rain";
      break;
      case '10n':
        bgcolor = "#D6E1E2";
        icon = "night-rain-wind";
      break;
      case '11n':
        bgcolor = "#E5E5E5";
        icon = "night-thunderstorm";
      break;
      case '13n':
        bgcolor = "#D0EEFF";
        icon = "night-snow";
      break;
      case '50n':
        bgcolor = "#E6E6E6";
        icon = "night-fog";
      break;
  
    }
    return [icon, bgcolor];
  }