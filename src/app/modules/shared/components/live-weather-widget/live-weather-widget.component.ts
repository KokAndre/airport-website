import { Component, OnInit } from '@angular/core';
import { AboutUsService } from 'src/app/modules/about-us/services/about-us.service';

@Component({
  selector: 'app-live-weather-widget',
  templateUrl: './live-weather-widget.component.html',
  styleUrls: ['./live-weather-widget.component.scss']
})
export class LiveWeatherWidgetComponent implements OnInit {
  public weatherblock = "";
  public camblock = "";

  constructor(public aboutUsService: AboutUsService) { }

  ngOnInit() {
    console.log('LIVE WEATHER WIDGET!!!!!!!!!');
    var DateObj = new Date();
    console.log('CURRENT DATE TIME', DateObj);
    // DateObj.setFullYear(2024,09, 23, 12, 42, 15);
    var secdelay = 10000;
    var sec = Math.floor(DateObj.getSeconds() * 1000) + DateObj.getMilliseconds();
    var secdiff = Math.floor((60000 - sec) + secdelay);
    var interval, timeoutId;
    // timeoutId = setTimeout( () => {
    //   this.getFeed();
    //   interval = setInterval(this.getFeed, 60000);
    //   console.log("Time SYNC to Server");
    // }, secdiff);


    this.getFeed();
    timeoutId = setInterval(() => {
      this.getFeed();
    }, 60000);


    $('#tabs-nav li:first-child').addClass('active');
    $('.tab-content').hide();
    $('.tab-content:first').show();
    $('#tabs-nav li').click(function () {
      $('#tabs-nav li').removeClass('active');
      $(this).addClass('active');
      $('.tab-content').hide();

      var activeTab = $(this).find('a').attr('href');
      if (activeTab) {
        $(activeTab).fadeIn(250);
      }
      return false;
    });
    // this.fetchWidgetData()
    this.clockUpdate();
    setInterval(this.clockUpdate, 1000);
  }

  // public fetchWidgetData() {
  //   this.aboutUsService.fetchWeatherWidgetData().then(results => {
  //     console.log('LIVE WX DATA: ', results);
  //   });
  // }




  public clockUpdate() {
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var DateObj = new Date();
    var day = dayNames[DateObj.getDay()];
    var date = DateObj.getDate();
    var month = monthNames[DateObj.getMonth()];
    var year = DateObj.getFullYear();
    var hour = DateObj.getHours();
    var minute = DateObj.getMinutes();
    var second = DateObj.getSeconds();
    var ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;
    hour = hour < 10 ? 0 + hour : hour;
    minute = minute < 10 ? 0 + minute : minute;
    second = second < 10 ? 0 + second : second;
    $(".dtm01").text(day); // Wed
    $(".dtm02").text(date + ' ' + month + ' ' + year + ' ' + hour + ':' + minute + ':' + second + ' ' + ampm);
  };

  public updateFeed(data) {
    let wd_block = data.weatherdata.block;
    let wd_station = data.weatherdata.station;
    let wd_gfx = data.weatherdata.gfx;
    let wd_date = data.weatherdata.date;
    let cd_block = data.camdata.block;
    let cd_camwest = data.camdata.camwest;
    let cd_cameast = data.camdata.cameast;
    let cd_date = data.camdata.date;
    $(".camwest").attr("src", "https://www.slingaircraft.com/live-cam/images/west/" + cd_camwest);
    $(".cameast").attr("src", "https://www.slingaircraft.com/live-cam/images/east/" + cd_cameast);
    let wds_array = wd_station.split(',')
    let wdgfx_array = wd_gfx.split(',')

    console.log('WDS ARRAY: ', wds_array);


    $(".var01").text(wds_array[0]);
    $(".var02").text("Last Updated: " + wds_array[1]);
    $(".var03").text(Math.round(wds_array[7]) + "°C");
    $(".var04").text(wds_array[2] + " at " + wds_array[3] + "°");
    var kph_to_knots = 0.539957;
    $(".var05").text(Math.round(wds_array[4] * kph_to_knots) + "|" + Math.round(wds_array[6] * kph_to_knots) + "|" + Math.round(wds_array[5] * kph_to_knots) + " Kts");
    $(".var06").text(wds_array[8] + "°C");
    $(".var07").text(wds_array[9] + " mb");
    $(".var08").text(wds_array[10] + "%");
    $(".var09").text(wds_array[11] + " ft");
    $(".var10").text(wds_array[12] + " ft");
    $(".var11").text(wds_array[13] + "%");
    $(".var12").text(wds_array[15] + " mm");
    $(".var13").text(wds_array[16] + "Wm2");
    $(".var14").text(wds_array[17] + "");


    switch (wdgfx_array[1]) {
      case "Clear":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sunny.svg");
        break;
      case "Snow":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-snow.svg");
        break;
      case "Thunderstorm":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-thunderstorm.svg");
        break;
      case "Drizzle":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
        break;
      case "Mist":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
        break;
      case "Smoke":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
        break;
      case "Haze":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
        break;
      case "Dust":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
        break;
      case "Fog":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
        break;
      case "Sand":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
        break;
      case "Dust":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
        break;
      case "Ash":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
        break;
      case "Squall":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
        break;
      case "Tornado":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
        break;
      case "Clouds":
        if (wdgfx_array[2] === "few clouds") {
          $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sunny-overcast.svg");
        } else {
          $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-cloudy.svg");
        }
        break;
      case "Rain":
        $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-sprinkle.svg");
        break;
    }
    $(".weather-desc").text(wdgfx_array[2]);
    $(".fade").fadeIn(50);
  }

  public getFeed() {
    // $.ajax({
    //   type: "GET",
    //   url: "https://www.slingaircraft.com/live-cam/data.php",
    //   cache: false,
    //   dataType: "json",
    //   success: function (data) {
    //     console.log(data);
    //     $(".fade").fadeOut(50, function () {
    //       this.updateFeed(data);
    //     });
    //   }
    // });

    console.log('GET FEED!!!!');

    this.aboutUsService.fetchWeatherWidgetData().then(results => {
      console.log('LIVE WX DATA: ', results);
      this.updateFeed(results);
    });
  }











  // jQuery(document).ready(($) => {

  // var weatherblock = "";
  // var camblock = "";

  // function clockUpdate() {
  //   var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //   var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //   var DateObj = new Date();
  //   var day = dayNames[DateObj.getDay()];
  //   var date = DateObj.getDate();
  //   var month = monthNames[DateObj.getMonth()];
  //   var year = DateObj.getFullYear();
  //   var hour = DateObj.getHours();
  //   var minute = DateObj.getMinutes();
  //   var second = DateObj.getSeconds();
  //   var ampm = hour >= 12 ? 'pm' : 'am';
  //   hour = hour % 12;
  //   hour = hour ? hour : '12';
  //   hour = hour < 10 ? '0' + hour : hour;
  //   minute = minute < 10 ? '0' + minute : minute;
  //   second = second < 10 ? '0' + second : second;
  //   $(".dtm01").text(day); // Wed
  //   $(".dtm02").text(date + ' ' + month + ' ' + year + ' ' + hour + ':' + minute + ':' + second + ' ' + ampm);
  // };

  // clockUpdate();
  // setInterval(clockUpdate, 1000);

  // function updateFeed(data) {
  //   wd_block = data.weatherdata.block;
  //   wd_station = data.weatherdata.station;
  //   wd_gfx = data.weatherdata.gfx;
  //   wd_date = data.weatherdata.date;
  //   cd_block = data.camdata.block;
  //   cd_camwest = data.camdata.camwest;
  //   cd_cameast = data.camdata.cameast;
  //   cd_date = data.camdata.date;
  //   $(".camwest").attr("src", "https://www.slingaircraft.com/live-cam/images/west/" + cd_camwest);
  //   $(".cameast").attr("src", "https://www.slingaircraft.com/live-cam/images/east/" + cd_cameast);
  //   wds_array = wd_station.split(',')
  //   wdgfx_array = wd_gfx.split(',')


  //   $(".var01").text(wds_array[0]);
  //   $(".var02").text("Last Updated: " + wds_array[1]);
  //   $(".var03").text(Math.round(wds_array[7]) + "°C");
  //   $(".var04").text(wds_array[2] + " at " + wds_array[3] + "°");
  //   var kph_to_knots = 0.539957;
  //   $(".var05").text(Math.round(wds_array[4] * kph_to_knots) + "|" + Math.round(wds_array[6] * kph_to_knots) + "|" + Math.round(wds_array[5] * kph_to_knots) + " Kts");
  //   $(".var06").text(wds_array[8] + "°C");
  //   $(".var07").text(wds_array[9] + " mb");
  //   $(".var08").text(wds_array[10] + "%");
  //   $(".var09").text(wds_array[11] + " ft");
  //   $(".var10").text(wds_array[12] + " ft");
  //   $(".var11").text(wds_array[13] + "%");
  //   $(".var12").text(wds_array[15] + " mm");
  //   $(".var13").text(wds_array[16] + "Wm2");
  //   $(".var14").text(wds_array[17] + "");


  //   switch (wdgfx_array[1]) {
  //     case "Clear":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sunny.svg");
  //       break;
  //     case "Snow":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-snow.svg");
  //       break;
  //     case "Thunderstorm":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-thunderstorm.svg");
  //       break;
  //     case "Drizzle":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
  //       break;
  //     case "Mist":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
  //       break;
  //     case "Smoke":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
  //       break;
  //     case "Haze":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
  //       break;
  //     case "Dust":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
  //       break;
  //     case "Fog":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
  //       break;
  //     case "Sand":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
  //       break;
  //     case "Dust":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
  //       break;
  //     case "Ash":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
  //       break;
  //     case "Squall":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
  //       break;
  //     case "Tornado":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sprinkle.svg");
  //       break;
  //     case "Clouds":
  //       if (wdgfx_array[2] === "few clouds") {
  //         $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-day-sunny-overcast.svg");
  //       } else {
  //         $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-cloudy.svg");
  //       }
  //       break;
  //     case "Rain":
  //       $(".weather-icon").attr("src", "https://www.slingaircraft.com/live-cam/icons/wi-sprinkle.svg");
  //       break;
  //   }
  //   $(".weather-desc").text(wdgfx_array[2]);
  //   $(".fade").fadeIn(50);
  // }

  // function getFeed() {
  //   $.ajax({
  //     type: "GET",
  //     url: "https://www.slingaircraft.com/live-cam/data.php",
  //     cache: false,
  //     dataType: "json",
  //     success: function (data) {
  //       console.log(data);
  //       $(".fade").fadeOut(50, function () {
  //         updateFeed(data);
  //       });
  //     }
  //   });
  // }

  // var DateObj = new Date();
  // DateObj.setFullYear(2024,09, 23, 12, 42, 15);
  // var secdelay = 10000;
  // var sec = Math.floor(DateObj.getSeconds() * 1000) + DateObj.getMilliseconds();
  // var secdiff = Math.floor((60000 - sec) + secdelay);
  // var interval, timeoutId;
  // timeoutId = setTimeout(function () {
  //   getFeed();
  //   interval = setInterval(getFeed, 60000);
  //   console.log("Time SYNC to Server");
  // }, secdiff);

  // $('#tabs-nav li:first-child').addClass('active');
  // $('.tab-content').hide();
  // $('.tab-content:first').show();
  // $('#tabs-nav li').click(function () {
  //   $('#tabs-nav li').removeClass('active');
  //   $(this).addClass('active');
  //   $('.tab-content').hide();

  //   var activeTab = $(this).find('a').attr('href');
  //   $(activeTab).fadeIn(250);
  //   return false;
  // });

  // });

}
