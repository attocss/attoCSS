module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    postcss: {
      options: {
        processors: [
          require('autoprefixer')()
        ]
      },
      // Apply autoprefixer on existing libraries
      dist: {
        src: 'library/*.css'
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      // Main build
      build1: {
        // Use this if you want to bundle normalize.css in atto.min.css
        // src: ['resources/vendor/normalize.css', 'library/*.css', 'modules/*.css'],
        src: ['library/*.css', 'modules/*.css'],
        dest: 'build/atto.min.css'
      },
      // Build separate libraries
      build2: {
        expand:true,
        cwd: 'library',
        src: '**/*.css',
        dest: 'build/lib',
        ext: '.min.css'
      }
    },
    concat_css: {
      options: {},
      // Generate atto.css file
      build3: {
        // This will add normalize.css to non-minified atto.css file
        // src: ['resources/vendor/normalize.css', 'library/*.css', 'modules/*.css'],
        src: ['library/*.css', 'modules/*.css'],
        dest: "src/atto.css"
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('@lodder/grunt-postcss');
  grunt.registerTask('default', ['postcss', 'cssmin', 'concat_css']);
  grunt.registerTask('build', [ 'cssmin:build1', 'cssmin:build2', 'concat_css:build3']);
};
