const gulp = require('gulp'),
	jasmine = require('gulp-jasmine'),
	SpecReporter = require('jasmine-spec-reporter').SpecReporter;

gulp.task('default', () => {
	gulp.src('spec/features/**/*.js')
		.pipe(jasmine({
			reporter: new SpecReporter(),
			timeout: 30000
		}));
});

gulp.task('frisby', () => {
	gulp.src('spec/services/**/*.js')
		.pipe(jasmine({
			reporter: new SpecReporter(),
			timeout: 30000
		}));
});