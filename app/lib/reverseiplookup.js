var csv = require('fast-csv');

var countries = [];
var ipAddressesSegments = [];

function getCountryIndex(country) {
    return (!!~countries.indexOf(country)) ? countries.indexOf(country) : (countries.push(country) - 1);
}

function saveRange(data) {
    var rangeFrom = parseInt(data[0]);
    var rangeTo = parseInt(data[1]);
    var countryName = data[2];
    var countryIndex = getCountryIndex(countryName);

    var segmentId = rangeFrom >> 24;
    var ipFrom = rangeFrom & 0xFFFFFF;
    var ipTo = rangeTo & 0xFFFFFF;
    
    var segment = ipAddressesSegments[segmentId];
    
    if(!segment) {
        segment = new Buffer(0xFFFFFF);
        ipAddressesSegments[segmentId] = segment;
    }

    while(ipFrom <= ipTo) {
        segment[ipFrom] = countryIndex;
        ipFrom++;
    }
}

exports.loadDataSet = function(callback) {
    console.log("Start loading csv")

    csv.fromPath("../data/partial.transformed.csv")
       .on("data", function(row) {
            saveRange(row);
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
    var segment = ipAddressesSegments[ipaddressdec >> 24];
    if (!segment) {
        return "N/A";
    }
    var ip = ipaddressdec & 0xFFFFFF;
    
    var countryId = segment[ip];
    if (!countryId) {
        return "N/A";       
    }

    return countries[countryId];
}