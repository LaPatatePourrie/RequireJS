require([app.path.module('module1')], function(Module1) {
		console.log('Boot-main');
		console.log('---');

    var module2 = new Module1();

    module2.speak();
});