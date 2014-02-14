angular.module('mm.foundation.fdnSlider', ['mm.foundation.transition'])
  .controller('fdnSliderController', [
    '$scope',
    '$element',
    '$attrs',
    function($scope, $element, $attrs) {
      var _index = 0;

      return {
        index: function() {
          return $scope.index;
        }
      };
    }
  ])
  .directive('fdnSlider', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      templateUrl: "template/fdnSlider/fdnSlider.html",
      controller: 'fdnSliderController',
      link: function(scope, element, attrs) {
        var slideContainer = angular.element(element[0].querySelector('.orbit-slides-container'));
        var slideElements = slideContainer.children('li');
        var currentSlideElement;

        function setup() {
          slideElements.css('zIndex', 2);
        }

        scope.show = function(index) {
          if (currentSlideElement) {
            currentSlideElement.removeClass('active');
            currentSlideElement.css({zIndex: 2, marginLeft: "100%"});
          }
          scope.index = index;
          currentSlideElement = slideElements.eq(index);
          currentSlideElement
            .addClass('active')
            .css({zIndex: 4, marginLeft: "0%"});
        };

        scope.next = function() {
          if (this.index === slideElements.length - 1) { return; }
          this.show(this.index + 1);
        };

        scope.prev = function() {
          if (this.atFirstSlide()) { return; }
          this.show(this.index - 1);
        };

        scope.atFirstSlide = function() {
          return this.index === 0;
        };

        scope.atLastSlide = function() {
          return this.index === slideElements.length - 1;
        };

        setup();
        scope.show(0);
      }
    };
  })
  .directive('fdnSlides', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      templateUrl: "template/fdnSlider/fdnSlides.html",
      link: function(scope, element, attrs) {
        var firstLi = element.find('li').first();
        element.css('height', firstLi.height() + 'px');
      }
    };
  });