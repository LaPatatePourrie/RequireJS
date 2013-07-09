define(['jquery', 'jqueryui'], function ($, ui) {
    
    return function () {
				this.init = function () {
					return 'Module1'
				}
				this.speak = function () {
					console.log('Je suis le module 1')
					console.log('Mes dépendances :')
					console.log('jquery v'+$.fn.jquery+', jquery-ui')
					$('.date').datepicker()
				}
		}
  
});