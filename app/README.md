##App

###Request

    http://<server_url>/api/v1/ip/<ip_address>

    http://localhost:8080/api/v1/ip/123.123.123.123

###Response

    { Country: "<country_name>" }

    { Country: "Czech republic" }

#####How to run the app?

    node --max-old-space-size=4000 server.js 8080

max-old-space-size increase memory limit

#####FAQ

######Why restify?

Because I need something lightweight for rest API. It's like Sinantra in ruby world.

######Is node.js good enough for this?

I chose node.js, because I wanted to try and it's pretty easy to start with it.

######How to do this in scalable way?

I can image this could be used for some sort SaaS application, which will operate accross the globe. That means each region will have its own datacenter or instace. For each region this service could contain only ip addresses for that particular region.

This is just dummy service, nothing more, we could have them many behind load balancer.

######How to improve performance

From my point of view, we can do lot of on preprocess data side. Generate ip addresses for each range before we load them to memory, instead of do that during the loading.

Also precalculate how big array will be in memory, instead of creating dynamically.

Or rewrite to Go.