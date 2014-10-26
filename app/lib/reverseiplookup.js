var csv = require('fast-csv');

var countries = [];
var ipaddresses = [];

function getCountryIndex(country) {
    return (!!~countries.indexOf(country)) ? countries.indexOf(country) : (countries.push(country) - 1);
}

function saveRange(data) {
    var start = data[0];
    var end = data[1];
    var country = data[2];
    var countryIndex = getCountryIndex(country);

    while(start <= end) {
        var index = start++;

        var firstPart = (index + '').substring(0, 2);            
        var secondPart = (index + '').substring(2);

        if(ipaddresses[firstPart] == undefined) {
            ipaddresses[firstPart] = [];
        }

        ipaddresses[firstPart][secondPart] = countryIndex;
    }    
}

exports.loadDataSet = function(callback) {
    console.log("Start loading csv")

    csv.fromPath("../data/partial.transformed.csv")
       .on("data", function(data) {
            saveRange(data);
        })
       .on("end", function() {
            console.log("Load of csv is done!");
            callback();
        });
}

exports.ipaddress2dec = function(ipaddress) {
    var ip = ipaddress.split('.');
    return ((((((+ip[0])*256)+(+ip[1]))*256)+(+ip[2]))*256)+(+ip[3]);
}

exports.isValidIpAddress = function(ipaddress) {
    return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/).test(ipaddress);
}

exports.getCountry = function(ipaddressdec) {
    var firstPart = (ipaddressdec + '').substring(0, 2);
    var secondPart = (ipaddressdec + '').substring(2);

    if(typeof ipaddresses[firstPart] != 'undefined') {
        if(typeof ipaddresses[firstPart][secondPart] != 'undefined') {
            var countryIndex = ipaddresses[firstPart][secondPart];
            return countries[countryIndex];
        }
    } 

    return "N/A";
}