/* Gruntfile.js
 * 
 * I have left the project structure untouched. The result of the automated
 * builds will end up in build/, the deployment tasks will pick it up from
 * there.
 *
 */
module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      files: {
        src: ['js/*'],
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-rsync");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.registerTask('lint', 'Run lint tools over all code files', 'jshint');

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

  grunt.registerTask('build', 'build everything', 'createDestDir');
  grunt.registerTask('clean', 'throw away all build results', 'deleteDestDir');
};



