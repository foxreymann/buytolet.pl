module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    connect: {
        dev:{
            options: {
              port: 8000,
              base: './dist/',
              livereload: true
            }
      }
    },

    /* assemble templating */
    assemble: {
      options: {
        collections: [
          {
            name: 'experience',
            sortby: 'startdate',
            sortorder: 'descending'
          },
        ],
        helpers: './src/bonnet/helpers/**/*.js',
        layout: 'resume.hbs',
        layoutdir: './src/bonnet/layouts/',
        partials: './src/bonnet/partials/**/*',
        data: './src/data/*.yaml',
        assets: 'src/assets'
      },
      posts: {
        files: [{
          cwd: './src/content/',
          dest: './dist/',
          expand: true,
          src: ['**/*.hbs', '!_pages/**/*.hbs']
        }, {
          cwd: './src/content/_pages/',
          dest: './dist/',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    },

    copy: {
        images: {
            files: [
                {
                    expand: true,
                    cwd: 'src/assets/images',
                    src: ['**/*.{png,jpg,gif,svg,ico}'],
                    dest: 'build/images/'
                }
            ]
        },
    },

    watch: {
      files: [ 'src/**/*' ],
      tasks: [ 'build' ]
    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  /* grunt tasks */
  grunt.registerTask('default', ['serve']);
  grunt.registerTask('build', ['assemble']);
  grunt.registerTask('server', ['assemble', 'connect:dev', 'watch']);

};
