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
                    'client/css/style.css': 'client/less/style.less'
                }
            }
        },
        watch: {
            styles: {
                files: ['client/less/*.less'],
                tasks: ['less'],
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['watch'])
};