# diy-frontend-test
Code challenge!

## Getting Up & Running
Running this on your own computer after cloning the repo is easy as 1, 2, 3. Open up your terminal and enter in the following commands:

1. ```npm install```
2. ```bower install```
3. ```grunt serve```

## Thoughts About the Project

### Questions About the API
What was the rationale behind including a head in the reponse when the status code and everything is in the header? The fact that the JSON was structured this way rendered the request npm library's built-in error handlers useless.

Where is the badge information located in the ```GET /makers/{maker_name}/projects/{project_id}```? I couldn't find it so I just didn't render it on my page.

### Questions About the Design
Why is the project detail page the way it is now (on the website)? I think this design (assuming it preceded the current design) is much better. The fact that the project detail image takes up the entire screen and that the rest of the information is below the fold doesn't look asthetically pleasing nor is practical usage of screen space.

My calculations from the PSD might be wrong, but what is the reasoning behind having varying padding? Usually, I stick to multiples of a certain number ([10, 20, 30...] or [20, 40, 60]) but this design utilizes [10, 15, 20, 40]. Maybe it just looks better with those specific values.

### Known Issues
Okay, so when you run ```grunt serve``` it's gonna automatically pull up ```localhost:9000``` and direct you to the home page. I've spent quite a while trying to get the homepage to redirect to a known project detail page or perhaps show a 404 page, but for some reason, the app insists on rendering the ```index.html```, and I'm not sure where that default routing and rendering is coming from.

It was probably not a good idea to jump the gun and use the Yeoman Angular-Fullstack generator because I had assumed it was mostly going to be a client heavy app. So I ended up ignoring and deleting most of the Yeoman setup for the Angular frontend and just made a fat server/thin client.

