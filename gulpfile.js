var gulp = require("gulp"),
	connect = require("gulp-connect"),
	opn = require("opn");

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

// Работа с JS
gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});

// Отслеживание изменений в файлах HTML
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/css/*.css'], ['css']);
  gulp.watch(['./app/js/*.js'], ['js']);
});

// Задача по умолчанию
gulp.task('default', ['connect', 'watch']);