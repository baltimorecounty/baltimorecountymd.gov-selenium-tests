const gulp = require('gulp'),
	jasmine = require('gulp-jasmine'),
	SpecReporter = require('jasmine-spec-reporter').SpecReporter;

gulp.task('default', () => {
	gulp.src('spec/**/*.js')
		.pipe(jasmine({
			reporter: new SpecReporter(),
			timeout: 30000
		}));
});

gulp.task('tax-sale', () => {
	gulp.src('spec/features/tax-sale/**/*.js')
		.pipe(jasmine({
			reporter: new SpecReporter(),
			timeout: 30000
		}));
});