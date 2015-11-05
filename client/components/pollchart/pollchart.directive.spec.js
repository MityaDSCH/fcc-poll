'use strict';

describe('Directive: pollchart', function () {

  // load the directive's module and view
  beforeEach(module('fccApp'));
  beforeEach(module('components/pollchart/pollchart.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pollchart></pollchart>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the pollchart directive');
  }));
});