const gulp = require('gulp'),
	jasmine = require('gulp-jasmine'),
	SpecReporter = require('jasmine-spec-reporter').SpecReporter;

gulp.task('default', () => {
	gulp.src('spec/**/*.js')
		.pipe(jasmine({
			reporter: new SpecReporter(),
			timeout: 10000
		}));
});