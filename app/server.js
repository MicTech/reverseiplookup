var restify = require('restify');
var reverseIpLookup = require('./lib/reverseiplookup');

var server = restify.createServer({
  name: 'Reveres IP Lookup',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/api/v1/ip/:ipaddress', function (req, res, next) {
    var ipaddress = req.params.ipaddress;
    var isValidIpAddress = reverseIpLookup.isValidIpAddress(ipaddress);

    if(isValidIpAddress) {
        var decIpAddress = reverseIpLookup.ipaddress2dec(ipaddress);
        var country = reverseIpLookup.getCountry(decIpAddress);
  
        if (country != "N/A") {
            res.contentType = 'json';
            res.cache(86400);
            res.send(200, {Country: country});
        } else {
            res.send(400, "IP address is not in the list!");
        }  
    } else {
        res.send(400, "IP address is not valid!")
    }

    return next();
});

reverseIpLookup.loadDataSet(function() {
    var port = parseInt(process.argv.slice(2));
    server.listen(port, function () {
        console.log('%s listening at %s', server.name, server.url);
    });  
});