/* Gruntfile.js
 * 
 * I have left the project structure untouched. The result of the automated
 * build will end up in build/, the rsync task picks it up from there.
 *
 */

module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      files: {
        src: ['Gruntfile.js', 'js/*', 'views/js/main.js'],
        options: {
          jshintrc: true
        }
      }
    },
    build: {
      options: {
        destDir: 'build'
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true, 
            src: ['./*.html', 'js/*', 'css/*', 
                  'views/*.html', 'views/js/*', 'views/css/*'], 
            dest: 'build/'
          }
        ]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '.',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/'
        }]
      }
    },
    rsync: {
      options: {
        args: ["--verbose"],
        exclude: ["node_modules"],
        recursive: true
      },
      prod: {
        options: {
          src: ["build/*"],
          dest: "/var/www/web-experiments.skh.io",
          host: "skh@rcane.de"
        }
      }
    },
    pagespeed: {
      options: {
        nokey: true,
        url: "http://web-experiments.skh.io"
      },
      desktop: {
        options: {
          paths: ['/index.html'],
          locale: "en_US",
          strategy: "desktop",
          threshold: "91"
        }
      },
      mobile: {
          options: {
          paths: ['/index.html'],
          locale: "en_US",
          strategy: "mobile",
          threshold: "91"
        }
      }
    },
    inline: {
        dist: {
            options:{
                cssmin: true,
                tag: ''
            },
            src: 'build/*.html'
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-rsync");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.loadNpmTasks('grunt-inline');
  
  grunt.registerTask('lint', 'Run lint tools over all code files', 
                    ['jshint','uncss']);

  grunt.registerTask('createDestDir', 
                     'Create destination folder for build results',
                     function () {
    grunt.config.requires('build.options.destDir');
    grunt.log.writeln("Creating destDir: " + 
                      grunt.config.get("build.options.destDir"));
    grunt.file.mkdir(grunt.config.get('build.options.destDir')); 
  });

  grunt.registerTask('deleteDestDir',
                     'Delete destination folder for build results',
                     function () {
    grunt.config.requires('build.options.destDir');
    grunt.log.writeln("Deleting destDir: " +
                      grunt.config.get("build.options.destDir"));
    grunt.file.delete(grunt.config.get('build.options.destDir'));
  });

  grunt.registerTask('build', 'build everything', 
                    ['createDestDir', 'copy', 'imagemin', 'inline']);
  grunt.registerTask('clean', 'throw away all build results', 'deleteDestDir');
  grunt.registerTask('check-speed', 'rebuild, upload and run against pagespeed',
                    ['clean', 'build', 'rsync', 'pagespeed']);
};



