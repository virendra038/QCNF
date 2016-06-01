module.exports ={
	appPath :'./src/app/',

		alljs:[
			'./src/app/components/**/*.js',
			'./src/app/shared/**/*.js',
			'./src/app/*.js'
		],
		index: './src/index.html',
	
		getWiredepDefaultOptions: function(){
		var options = {
			bowerJson: require('./bower.json'),
			directory:'./bower_components',
			ignorePath:'../..'
		};	
		return options;
	}

	
};