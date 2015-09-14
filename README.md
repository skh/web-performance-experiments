# web-performance-experiments
Project for Udacity's Website Optimization courses

Based on https://github.com/udacity/frontend-nanodegree-mobile-portfolio

The page is available at: http://web-experiments.skh.io/

The following ```grunt``` tasks are available:
- ```build```: perform all automated optimizations and copy results to ```build``` directory
- ```clean```: delete ```build``` directory
- ```rsync```: deploy to production server (needs to be configured in ```Gruntfile.js``` first)
- ```check-speed```: rebuild, deploy to production server, run google page speed insights and
  show results (needs to be configured in ```Gruntfile.js``` first)

## Improving PageSpeed results for Cameron's portfolio page (index.html)

### Manual optimizations
- Used up-to-date JavaScript snippet from
  https://developers.google.com/analytics/devguides/collection/analyticsjs/
  to include Google Analytics on the page
- Inlined CSS for Google Web Fonts
- Created two scaled down versions of ```pizzeria.jpg``` -- one for use
  as preview image on the portfolio page, one for the Cam's Pizzeria page.
- Published the page to a server I am administrating myself, and configured
  Apache's mod_headers to include CacheControl headers in the response.

### Grunt workflow

- created a build directory and copy all files there
- used ```grunt-contrib-imagemin``` to optimize images
- used ```grunt-inline``` to minify and inline css
- used ```grunt-rsync``` for deployment from build directory to production server
 
## Improving JavaScript performance and frame rates on Cam's Pizzeria page

The page is available at: http://web-experiments.skh.io/views/pizza.html

### Shorten time to resize pizzas (```main.js```)
- ```changePizzaSizes()```: don't calculate new size, just use fixed percentages
- ```changePizzaSizes()```: move all DOM accesses out of the main resize loop for less DOM accesses and no forced synchronized layouts

### Improving scrolling animation frame rate (```main.js```, ```style.css```)
- ```createPizzas()```: only create as many rows of floating pizzas as necessary to fill the background
- use ```requestAnimationFrame()``` instead of calling ```updatePositions()``` directly on 
  ```scroll``` events
- add ```will-change: left``` to ```mover``` class to put floating pizzas on separate layers
  so that no paint operations are necessary in the scroll animation loop




