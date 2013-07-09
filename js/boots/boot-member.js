require([app.path.module('module1')], function(Module1) {
		console.log('Boot-member');
		console.log('---');

    var module1 = new Module1();

    module1.speak();
});