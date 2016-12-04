var gulp = require("gulp"),
  	connect = require("gulp-connect"),
  	opn = require("opn"),
    less = require('gulp-less'),
    path = require('path'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    sourcemaps = require('gulp-sourcemaps');

var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

// Запускаем локальный сервер
gulp.task('connect', function() {
  connect.server({
    root: 'app', // Папка с приложением
    livereload: true, // Автоматическая перезагрузка страницы браузера
    port: 8080
  });
  opn('http://localhost:8080');
});

// Работа с HTML
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

// Работа с CSS
gulp.task('css', function () {
  gulp.src('./app/css/*.css')
    .pipe(connect.reload());
});

// Работа с LESS
gulp.task('less', function () {
  return gulp.src('./app/less/*.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ],
      plugins: [autoprefix]
    }))
    // .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css'));
});

// Работа с JS
gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});

// Отслеживание изменений в файлах HTML
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/css/*.css'], ['css']);
  gulp.watch(['./app/less/*.less'], ['less']);
  gulp.watch(['./app/js/*.js'], ['js']);
});

// Задача по умолчанию
gulp.task('default', ['connect', 'watch']);