# web-performance-experiments
Project for Udacity's Website Optimization courses

Based on https://github.com/udacity/frontend-nanodegree-mobile-portfolio

## Improving PageSpeed results for Cameron's portfolio page (index.html)

The page is available at: http://web-experiments.skh.io/

### Manual optimizations
- Use current JavaScript snippet to include Google Analytics into the page
- Inlined CSS to use Google Web Fonts
- Created two scaled down versions of ```pizzeria.jpg``` -- one for use
  as preview image on the portfolio page, one for the Cam's Pizzeria page.
- Published the page to a server I am administrating myself, and configured
  Apache's mod_headers to include CacheControl headers in the response.

### Grunt workflow

- created a build directory and copy all files there
- used grunt-contrib-imagemin to optimize images
- used grunt-inline to inline css
- rsync from build directory to production server
 
## 



