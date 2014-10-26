var assert = require("assert");
var reverseiplookup = require('../lib/reverseiplookup.js');

describe('Reverse IP Lookup', function() {
  describe('#ipaddress2dec()', function() {
  
    it('should return 2037380272 for ip address 121.111.244.176', function(){
        var result = reverseiplookup.ipaddress2dec("121.111.244.176");
        assert.equal(2037380272, result);
    })
  })

  describe("#isValidIpAddress()", function() {

    it('should return true for ip address 123.22.11.12', function() {
        var result = reverseiplookup.isValidIpAddress("123.22.11.12");
        assert.equal(true, result);
    })

    it('should return false for ip address 123.312.11.738', function() {
        var result = reverseiplookup.isValidIpAddress("123.312.11.738");
        assert.equal(false, result);
    })
  })
})