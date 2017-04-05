const gulp = require('gulp'),
	mocha = require('gulp-mocha');

gulp.task('features', () => {
	gulp.src('spec/features/**/*.js')
		.pipe(mocha({
			reporter: 'spec',
			timeout: 30000
		}));
});

gulp.task('features-quick', () => {
	gulp.src(['spec/features/citysourced/reporter/submit-report-specific-location.spec.js', 'spec/features/citysourced/reporter/verify-fields.spec.js'])
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