module.exports = function(grunt) {

  // LiveReload的默认端口号，你也可以改成你想要的端口号
  var lrPort = 35729;
  // 使用connect-livereload模块，生成一个与LiveReload脚本
  // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
  var lrSnippet = require('connect-livereload')({ port: lrPort });
  // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
  var lrMiddleware = function(connect, options) {
    return [
      // 把脚本，注入到静态文件中
      lrSnippet,
      // 静态文件服务器的路径
      connect.static(options.base),
      // 启用目录浏览(相当于IIS中的目录浏览)
      connect.directory(options.base)
    ];
  };
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 通过connect任务，创建一个静态服务器
    connect: {
      options: {
        // 服务器端口号
        port: 8000,
        // 服务器地址(可以使用主机名localhost，也能使用IP)
        hostname: 'localhost',
        // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
        base: '.'
      },
      livereload: {
        options: {
          // 通过LiveReload脚本，让页面重新加载。
          middleware: lrMiddleware
        }
      }
    },
    watch: {
        client: {
            files: ['*.html', 'css/*', 'js/*', 'images/**/*'],
            options: {
                livereload: lrPort
            }
        },
        // jshint: {
        //     files: 'src/js/**/*.js',
        //     tasks: 'jshint'
        // }
    },
    //JSHint (http://www.jshint.com/docs)
    jshint: {
        all: {
            src: 'src/js/**/*.js',
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: 'single',
                regexp: true,
                undef: true,
                unused: true,
                trailing: true,
                maxlen: 120
            }
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');

 // 加载插件

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // 自定义任务
  grunt.registerTask('live', ['connect','watch']);

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);

};