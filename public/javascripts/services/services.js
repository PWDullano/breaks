app.service('breakService', function($http){
  var breakService = {};

  breakService.getMoves = function(){
    return $http.get('http://localhost:3000/moves')
    // return $http.get('https://breakitdown.herokuapp.com/moves')
  }

  breakService.getUser = function(){
    return $http.get('http://localhost:3000/users')
    // , headers: {
      // jwt:
      // get jwt from local storage
    // })
    // return $http.get('https://breakitdown.herokuapp.com/users/'+user_id, {method: "jsonp"})
  }

  breakService.getStripes = function(){
    return $http.get('http://localhost:3000/stripes')
    // return $http.get('https://breakitdown.herokuapp.com/stripes')
  }

  breakService.getSessions = function(){
    return $http.get('http://localhost:3000/sessions')
    // return $http.get('https://breakitdown.herokuapp.com/sessions')
  }

  breakService.newSession = function(data){
    return $http.post('http://localhost:3000/sessions', data)
    // return $http.post('https://breakitdown.herokuapp.com/sessions', data)
  }

  return breakService;
})

app.service('userService', function($http){
  this.validateUser = function(){
    var token = localStorage.getItem('satellizer_token');
    var data = JSON.stringify({token : token})
      return $http.post('users', data).then(function(response){
      return response.data
      })
    }

})
