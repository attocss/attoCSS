module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    postcss: {
      options: {
        //map: true, // inline sourcemaps
        browsers: ['last 4 version'],

        // or
        // map: {
        //     inline: false, // save all sourcemaps as separate files...
        //     annotation: 'maps/' // ...to the specified directory
        // },

        processors: [
          require('autoprefixer')()
        ]
      },
      dist: {
        src: 'library/*.css'
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build1: {
        src: ['library/*.css', 'modules/*.css'],
        // Use this if you want to bundle normalize.css in atto.min.css
        // src: ['resources/vendor/normalize.css', 'library/*.css'],
        dest: 'build/atto.min.css'
      },
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
      build3: {
        src: ['library/*.css', 'modules/*.css'],
        // This will add normalize.css to non-minified atto.css file
        // src: ['resources/vendor/normalize.css', 'library/*.css'],
        dest: "src/atto.css"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('@lodder/grunt-postcss');
  grunt.registerTask('default', ['postcss', 'cssmin', 'concat_css']);
  grunt.registerTask('build', [ 'cssmin:build1', 'cssmin:build2', 'concat_css:build3']);
};
