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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
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



