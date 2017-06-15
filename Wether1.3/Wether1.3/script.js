
$(function () {
    $('#err1').hide();
    $('#err2').hide();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, { enableHighAccuracy: true });
    }
    else {
        showError("Your browser does not support Geolocation!");
    }

    var weatherDiv = $('#weather'),
		scroller = $('#scroller'),
		location = $('p.location');


    function locationError(error) {
        switch (error.code) {
            case error.TIMEOUT:
                showError("A timeout occured! Please try again!");
                break;
            case error.POSITION_UNAVAILABLE:
                showError('We can\'t detect your location. Sorry!');
                break;
            case error.PERMISSION_DENIED:
                showError('Please allow geolocation access for this to work.');
                break;
            case error.UNKNOWN_ERROR:
                showError('An unknown error occured!');
                break;
        }

    }

    function locationSuccess(position) {
        searchByCoordinates(position.coords.latitude, position.coords.longitude);
    }

    function searchByCoordinates(latitude, longitude) {
        try {
            var weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&callback=?'
            $.getJSON(weatherAPI, function (response) {
                getData(response);
            });      
        }
        catch (e) {
            showError("We can't find information about your city!");
            window.console && console.error(e);
        }
    }

    function searchByName(city) {
        try {
            var weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast/weather?q=' + city + '&callback=?'
            $.getJSON(weatherAPI, function (response) {
                getData(response);
            });
        }
        catch (e) {
            showError("We can't find information about your city!");
            window.console && console.error(e);
        }
    }

    function getData(data) {
        var d = new Date();
        var offset = d.getTimezoneOffset() * 60 * 1000;
        var city = data.city.name;
        var country = data.city.country;
        $.each(data.list, function () {
            var localTime = new Date(this.dt * 1000 - offset);
         addWeather(
                    this.weather[0].icon,
                    moment(localTime).calendar(),
                    this.weather[0].main + '<br/>' + ' <b>' + 'Temp: ' + convertTemperature(this.main.temp_min) + '°' + 'C' + ' / '
                    + convertTemperature(this.main.temp_max) + '°' + 'C' + '<br/>' + "Humidity: " + this.main.humidity + ' %' + '<br/>' + 'Pressure: '
                    + convertPressure(this.main.pressure) + ' mm. Hg' + '<br/>' + 'Wind speed: ' + this.wind.speed + ' m/s' + '</b>'
                );
        });      
        location.html(city + ', <b>' + country + '</b>');
        weatherDiv.addClass('loaded');
        showSlide(0);
    }

    function addWeather(icon, day, condition) {
         markup = '<li>' + '<img src="img/icons/' + icon + '.png" />' +
              ' <p class="day">' + day + '<br/>' + '<br/>' + '</p><p class="cond">' + condition + '</p></li>';
         scroller.append(markup);
    }

    $('#btnCoordin').click(function () {
       
        var coordinates = $('#log').val();
        var reg = /(\d{2}\.\d*)\s(\d{2}\.\d*)/;
        if (coordinates.match(reg)) {
            var coord = coordinates.split(" ");
            var latitude = parseInt(coord[0]);
            var longitude = parseInt(coord[1]);
            scroller.html("");
            searchByCoordinates(latitude, longitude);
        }
        else {
            $('#err2').html("<h2>You enter the wrong city coordinates!</h2>");
            $('#err2').fadeIn().delay(1150).fadeOut();
        }
    });


    $('#btnCity').click(function () {
        var reg = /^[A-Za-z\-]+$/;
        var city = $('#cityname').val();
        if (city) {
            if (city.match(reg)) {
                scroller.html("");
                searchByName(city);
            }
        }
        else {
            $('#err1').html("<h2>You enter the wrong city name!</h2>");/* !!!*/
            $('#err1').fadeIn().delay(1150).fadeOut();
        }
    });


   var  currentSlide = 0;
    $('a.previous').click(function (e) {
        e.preventDefault();
        showSlide(currentSlide - 1);
    });

    $('a.next').click(function (e) {
        e.preventDefault();
        showSlide(currentSlide + 1);
    });


    $(document).keydown(function (e) {
        switch (e.keyCode) {
            case 37:
                weatherDiv.find('a.previous').click();
                break;
            case 39:
                weatherDiv.find('a.next').click();
                break;
        }
    });

    function showSlide(i) {
        var items = scroller.find('li');
        if (i >= items.length || i < 0 || scroller.is(':animated')) {
            return false;
        }
        weatherDiv.removeClass('first last');

        if (i == 0) {
            weatherDiv.addClass('first');
        }
        else if (i == items.length - 1) {
            weatherDiv.addClass('last');
        }
        scroller.animate({ left: (-i * 100) + '%' }, function () {
            currentSlide = i;
        });
    }

    function convertTemperature(kelvin) {
        return Math.round(kelvin - 273.15);
    }

    function convertPressure(paskal) {
        return Math.round(paskal * 0.7500637);
    }

    function showError(msg) {
        weatherDiv.addClass('error').html(msg);
    }


    $('.button').mouseenter(function () {
        $(this).fadeTo('fast', 1);
        $(this).css('font-weight', 'bold');

    });

    $('.button').mouseleave(function () {
        $(this).fadeTo('fast', 1);
        $(this).css('font-weight', 'normal');
    });

    
    $('#add').click(function () {
        var Comment = $('#comment').val();
        if (Comment == '') {
            $('#alert').html("<h2><strong>Warning!</strong> You you enter an empty string!</h2>");/* !!!*/
            $('#alert').fadeIn().delay(1150).fadeOut();
            return false;
        }
        else {
            $('#item').prepend("<h2><li>" + Comment + "</li></h2>");
            var item = $('#item').html();
            localStorage.setItem('item', item);
            return false;
        }
    });

    if (localStorage.getItem('item')) {
        $('#item').html(localStorage.getItem('item'));
    }

    $('#clear').click(function () {
        window.localStorage.clear();
        document.location.reload();
        return false;
    });
    
});







