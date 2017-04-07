module.exports = {
    files: {
        javascripts: {
            joinTo: 'js/app.js'
        },
        stylesheets: {
            joinTo: 'style.css'
        },
        templates: {
            joinTo: {
                'app/jade.js': /.+\.jade$/
            },
        }
    },
    plugins: {
        jaded: {
            staticPatterns: /^app(\/|\\)static_jade(\/|\\)(.+)\.jade$/
        },
        stylus: {
            includeCss: true,
            plugins: ['autoprefixer-stylus']
        },
        uglify: {
            mangle: true
        },
        jshint: {
            pattern: /^app(\/|\\)js(\/|\\)[^\/\\]*\.js$/,
            warnOnly: true
        },
    },
    npm: {
        compilers: ['babel-brunch']
    },
    sourceMaps: 'absoluteUrl'
}
