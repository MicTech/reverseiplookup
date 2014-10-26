###Service for Reverse IP Lookup

This is just a proof of concept for simple service, whichreturn Country name for ip address.

* app - node.js application
* data - datasets and R script for preprocessing
* performance - test plan for jMeter


###Performance

Probably what have impact on latency is not the algorithm, but infrastructure around that.

####Performance stats (MacBook Pro, 2,3GHz i5, 16GB RAM)

* app boot time with data load approx. 20sec
* approx. 1200reg/sec from local jMeter

####Performance stats (EC2 t2.micro, US N. California)

* approx. 120reg/sec from Czech republic