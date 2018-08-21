module.exports = function (grunt)  {
    require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks
    grunt.loadNpmTasks('grunt-babel');
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true
            },
            compile: {
                files: {
                    "dist/app.js": "./app.js"
                }
            }
        }
    });

    grunt.registerTask("default", ["babel"]);
};