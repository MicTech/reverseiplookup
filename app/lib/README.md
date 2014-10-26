##App

###request

http://<server_url>/api/v1/ip/<ip_address>

http://localhost:8080/api/v1/ip/123.123.123.123

###response

{Country: "<country_name>"}

{Country: "Czech republic"}

#####How to run

node --max-old-space-size=4000 server.js 8080

#####FAQ

######Why restify?

Because I need something lightweight, just like Sinantra in ruby world.

######Is node.js good for it?

I choose node.js because it easy start and implement. For production I will rewrite it in Go.

######How to do this scalable?

I can image this could be used for service, which will operate accross the globe. That means each region will have its own datacenter or instace. For each region this service could contain only ip addresses for that particular region.

This is just dummy service, nothing more, we could have them many behing load balancer.

######How to improve performance

From my point of view, we can do lot of on preprocess data site. Generate ip addresses for each range before we load them to memory, instead of do that during the loading.

Also precalculate how big shoul array in memory, instead of creating dynamicaly.