var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var compass = require('gulp-compass');
var path = require('path');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var config = require('./gulp.config')

gulp.task('browserify',function(){
	return browserify('./src/app/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./public'));
});

gulp.task('compass',function(){
	gulp.src(['./src/*.scss',
		])
		.pipe(compass({
			config_file:'./config.rb',
			css:'./public/css',
			sass:'./src/app/',
			require:['susy']
		}))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('html',function(){
	gulp.src('./src/**/*.html')
	.pipe(gulp.dest('./public'));
});

gulp.task('vet',function(){
	return gulp.src('./src/app/*.js')
			.pipe(jscs())
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish',{verbose:true}));
});

gulp.task('wiredep',function(){
	var options = config.getWiredepDefaultOptions();
	return gulp.src(config.index)
			.pipe(wiredep(options))
			.pipe(inject(gulp.src(config.alljs)))
			.pipe(gulp.dest('./src'));
});

