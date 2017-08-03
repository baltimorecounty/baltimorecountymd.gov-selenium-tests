const gulp = require('gulp'),
	mocha = require('gulp-mocha');

gulp.task('features', () => {
	gulp.src('spec/features/**/*.js')
		.pipe(mocha({
			reporter: 'spec',
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

gulp.task('features-quick', () => {
	gulp.src(['spec/features/citysourced/reporter/submit-report-random-location-all-categories.spec.js'])
		.pipe(mocha({
			reporter: 'spec',
			timeout: 30000
		}));
});

gulp.task('services', () => {
	gulp.src('spec/services/**/*.js')
		.pipe(mocha({
			reporter: 'spec',
			timeout: 30000
		}));
});

gulp.task('default', ['services', 'features'], () => {});

