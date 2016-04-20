app.controller("MainController", function($scope, $http, breakService, $routeParams,$rootScope, $location, $auth){
  $scope.login = function() {
       $auth.login($scope.user)
         .then(function() {
           console.log('You have successfully signed in!');
           $location.path('/');
         })
         .catch(function(error) {
           console.log(error.data.message, error.status);
         });
     };
     $scope.authenticate = function(provider) {
       $auth.authenticate(provider)
         .then(function(response) {
           console.log('You have successfully signed in with ' + provider + '!');
           $location.path('/prtymain')
         })
         .catch(function(error) {
           if (error.error) {
             // Popup error - invalid redirect_uri, pressed cancel button, etc.
             console.log(error.error);
           } else if (error.data) {
             // HTTP response error from server
           console.log(error.data.message, error.status);
           } else {
             console.log(error);
           }
         });
     };
     $scope.logout = function(){
       $auth.logout()
       console.log("successfully logged out!");
     }

    $scope.logout = function(){
      $auth.logout()
      console.log("successfully logged out!");
    }
  $scope.showForm = false;

 $scope.ToggleForm = function(){
   $scope.showForm = !$scope.showForm;
 }

  $(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});

});

app.controller('signUpController', function($scope, info){

})

app.controller('UserController', function($scope, $http, breakService, $routeParams){

})

app.controller('MovesController', function($scope, $http, breakService, $routeParams){
  breakService.getMoves().then(function(payload){
      $scope.movesCollection = payload.data;
    })
})

app.controller('SessionController', function($scope, $http, breakService, $routeParams, $window){
  breakService.getSessions().then(function(payload){
    $scope.sessionsCollection = payload.data;
  })

  breakService.getMoves().then(function(moves){
    $scope.movesCollection = moves.data;
  })

  $scope.session = {};

  $scope.check = function(value, checked) {
  var indx = $scope.session.focus.indexOf(value);
  if (indx >= 0 && !checked) {
    $scope.session.focus.splice(indx, 1);
  }
  if (indx < 0 && checked) {
    $scope.session.focus.push(value);
  }
  console.log($scope.session.focus);
};

$scope.session = {
  focus: []
}

$scope.createSession = function(){
  breakService.newSession($scope.session).then(function(stuff){
    $window.location.href = '/users/1/sessions';
  })
}

})

app.controller('StripesController', function($scope, $http, breakService, $routeParams){

})
