var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var populateList = function(countries) {
  var ul = document.querySelector('#country-list');

  countries.forEach(function(country) {
    // console.log(country);
    var li = document.createElement('li');
    var h5 = document.createElement('h5');
    var p = document.createElement('p');
    var p2 = document.createElement('p');
    var img = document.createElement('img');
    img.src = country.flag;
    img.width = 200;
    h5.innerText = country.name;
    p.innerText = country.population.toLocaleString('en-GB');
    p2.innerText = country.capital;
    li.appendChild(h5);
    li.appendChild(img);
    li.appendChild(p2);
    li.appendChild(p);
    ul.appendChild(li);
  });
  var mapCountry = countries[0];
  var coords = {lat: mapCountry.latlng[0], lng: mapCountry.latlng[1]};
  var mapDiv = document.getElementById('main-map');
  var mainMap = new MapWrapper(mapDiv, coords, 5);
  console.log(mainMap);
}

var save = function(string) {
  if(string === '') return;
  localStorage.setItem('searchQuery', JSON.stringify(string));
}

var deleteChildren = function(element) {
  element.innerHTML = '';
}

var requestComplete = function() {
  // console.log('Request Complete');
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateList(countries);
}



var app = function(){
  var inputCountry = document.querySelector('#country-input');


  var url = 'https://restcountries.eu/rest/v2';

  inputCountry.addEventListener("keyup", function() {
    var ul = document.querySelector('#country-list');
    var value = inputCountry.value;
    save(value);
    deleteChildren(ul);
    value = value.replace(' ', '%20');
    extension = "/name/" + value;
    newURL = url + extension
    // console.log(newURL);
    makeRequest(newURL, requestComplete);

  })


};

window.addEventListener('load', app);
