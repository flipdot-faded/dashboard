module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    compess: true,
                    cleancss: true
                },
                files: {
                    'client/public/css/style.css': 'client/src/less/style.less'
                }
            }
        },
        concat: {
            dist: {
                src: ['client/src/js/colorMixer.js'],
                dest: 'client/public/js/app.js'
            }
        },
        watch: {
            styles: {
                files: ['client/src/less/*.less', 'client/src/js/*.js'],
                tasks: ['less', 'concat'],
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['watch'])
};