define(
	[
		'js/modules/module1', 
		'jquery', 
		'underscore', 
		'angular'
	], 
	function (Module1, $, _, angular) {
    
		var mod1 = new Module1();

    return function () {
				this.init = function () {
					return 'Module2'
				}
				this.speak = function () {
					console.log('Je suis le module 2')
					console.log('Mes dépendances :')
					console.log(mod1.init()+', jquery v'+$.fn.jquery+', angular '+angular.version.full+', underscore '+_.VERSION)
				}
		}
  
})