require([app.path.module('module1'), app.path.module('module2'), 'jquery'], function(Module1, Module2, $) {
		console.log('Boot-main');
		console.log('---');

    var module1 = new Module1()
    var module2 = new Module2()

		$(document).ready(function () {
			module1.speak()
			console.log('---')
		})

		module2.speak()

});