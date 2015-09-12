# web-performance-experiments
Project for Udacity's Website Optimization courses

Based on https://github.com/udacity/frontend-nanodegree-mobile-portfolio

Step 1:

Setup a grunt workflow:
- JSHint (as a first test grunt target)

Step 2:
- create a build directory (TODO: and copy all files there)

Step 3:
- rsync (TODO: from build directory) to production server
- no staging server defined
- I need to publish the site in order to be able to use Google PageSpeed
- 
Step 4: Page Speed, manual changes

- use google analytics javascript from google
- manually inline google web font css
- manually resize pizzeria.jpg to make it smaller (for views/index.html)
- manually resize pizzeria-optimized.jpg for use as preview
- all images still double-sized in case of high resolution screens
- check style.css if every style is used

Step 5: Automated optimizations:

- grunt-contrib-imagemin

