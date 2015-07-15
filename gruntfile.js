module.exports = function(grunt) {
	var vislibs = ['lib/highcharts.js', 'lib/lodash.custom.min.js', 'lib/lodash_mixins.js'];
	var visutils = ['lib/php.js', 'js/highcharts.theme.js', 'js/CurrencyService.js', 'js/VisualizationParams.js', 'js/Visualization.js', 'js/isosvisutil.js', 'js/isos_vis.js', 'js/HighchartsWrapper.js', 'js/series.js'];
	var libs = ['lib/platform.js'];
	var core = ['js/SplytUtil.js', 'js/Splyt.js'];
	var vis = ['js/Splyt.charts.js'];
	var data = ['js/Splyt.purchasing.js', 'js/Splyt.session.js', 'js/Splyt.web.js'];

	var banner = grunt.file.read("banner");

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		gitinfo: {},
		jshint: {
			build: {
				options: {
					newcap: false, //A constructor name should start with an uppercase letter
					'-W032': true, // ignore semicolons at the end of function blocks being unnecessary
				},
				//TODO, get all the visualization files in lint worthy shape...do this after we get
				//the SDK inte grated into the actual website...
				src:[
					'js/*.js',
					'!js/SplytUtil.js',
				],
			}
		},
		jasmine: {
			options: {
				version:'1.3.1',
				outfile:'spec/SpecRunner_Grunt.html',
				keepRunner:false,
				template:'spec/SpecRunner_Grunt.tmpl'
			},
			build: {
			}
		},
		jsdoc: {
			build: {
				src: [].concat(core, data, vis, ['readme.md']),
				options:{
					private: false,
					destination:'bin/doc',
					configure:'jsdoc_conf.json'
				}
			}
		},
		concat: {
			options: {
				seperator:';',
				stripBanners:{block:true, line:true}
			},
			build: {
				files: {
					//build a version of the lib that contain everything we need for data only.
					//this is what most customers will use.
					'bin/Splyt.data.js' : [].concat(libs, core, data),

					//build a version of the library that contains data and visualization.
					//this is what customers who want charts will use.
					'bin/Splyt.all.js' :  [].concat(vislibs, visutils, libs, core, data, vis),

					//build a version of the library that does not contain any external dependencies.
					//this is what SPLYT tools will use and is for internal use only
					'bin/Splyt.slim.js' : [].concat(visutils, libs, core, data, vis)
				}
			}
		},
		uglify: {
			strip: {
				options: {
					banner: banner,
					mangle:false,
					preserveComments:false,
					beautify:true
				},
				files: {
					'bin/Splyt.data.js':['bin/Splyt.data.js'],
					'bin/Splyt.all.js':['bin/Splyt.all.js'],
					'bin/Splyt.slim.js':['bin/Splyt.slim.js'],
				}
			},
			build: {
				options : {
					banner: banner,
				},
				files: {
					'bin/Splyt.data.min.js':['bin/Splyt.data.js'],
					'bin/Splyt.all.min.js':['bin/Splyt.all.js'],
					'bin/Splyt.slim.min.js':['bin/Splyt.slim.js'],
				}
			}

		},
		copy: {
			customer: {
				files: [
					//copy concatenated and minified versions of the script into the sample app for packaging...
					{flatten:true, expand:true, src: ['bin/Splyt.data.js', 'bin/Splyt.data.min.js'], dest: 'samples/BubblePop/js'}
				]
			}
		},
		zip: {
			customer: {
				router: function(filepath) {

                    var docRegex = /bin\/doc\/(.*)$/;
                    var docMatch = docRegex.exec(filepath);

                    if(docMatch != null) {
                        return "doc/"+docMatch[1];
                    }
					if(filepath.match(/bin\/.*\.js/)) {
						return "js/" + filepath.substr(filepath.lastIndexOf("/") + 1);
					}
					return filepath;
				},
				//package up the SDK for customer consumption...include docs, concatenate source, minified source, samples, and readme
				src: [].concat(['bin/doc/**', 'bin/Splyt.data.js', 'bin/Splyt.data.min.js', 'bin/Splyt.all.js', 'bin/Splyt.all.min.js', 'samples/**', 'readme.md']),
				dest: 'bin/splyt-js-<%= gitinfo.local.branch.current.shortSHA %>.zip'
			}
		},
		clean: {
			//remove copied files for samples
			customer: ['samples/BubblePop/js/Splyt*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks("grunt-gitinfo");
	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('debug', ['gitinfo','jshint','jasmine','jsdoc','concat']);
	grunt.registerTask('test', ['jasmine']);
	grunt.registerTask('default', ['gitinfo','jshint','jasmine','jsdoc','concat','uglify:strip', 'uglify:build','copy:customer','zip:customer','clean:customer']);
};