###Service for Reverse IP Lookup

This is just a proof of concept for simple service, whichreturn Country name for ip address.

* app - node.js application
* data - datasets and R script for preprocessing
* performance - test plan for jMeter

####Performance stats (MacBook Pro, 2,3GHz i5, 16GB RAM)

* app boot time with data load approx. 20sec
* 5 parallel clients: approx. 1200reg/sec