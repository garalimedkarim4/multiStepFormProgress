

$(".submit").click(function(){
	return false;
})



/*  AngularJS SCRIPT  */
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  $scope.count = 0;
  $scope.change = function(){
    console.log('change2');

  };
	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches

  $scope.navAction = function(current,next){
		console.log('step1');
		if(animating) return false;
		animating = true;

		current_fs = $(current);
		next_fs = $(next);
		next_fs.show();
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				// scale = 1 - (1 - now) * 0.2;
				scale = 1;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
	        'transform': 'scale('+scale+')',
	        'position': 'absolute'
	      });
				next_fs.css({'left': left, 'opacity': opacity});
			},
			duration: 800,
			complete: function(){
				current_fs.hide();
				animating = false;
			},
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
  };

  $scope.navBackAction = function(current,previous){
		if(animating) return false;
		animating = true;

		current_fs = $(current);
		previous_fs = $(previous);
		previous_fs.show();
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				// scale = 0.8 + (1 - now) * 0.2;
				scale = 1;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1-now) * 50)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'left': left});
				previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
			},
			duration: 800,
			complete: function(){
				current_fs.hide();
				animating = false;
			},
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	}

});
