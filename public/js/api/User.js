
class User {

  static URL = '/user'

  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  static fetch( data, callback = f => f ) {
    let options = {
      url: this.URL + '/current', 
      data: data,
      responseType: 'json', 
      method: 'GET',
      callback: function(err, response) {
          if (response.success && response.user) {
          let user = { id: response.user.id, name: response.user.name };
          User.setCurrent(user);
        } else {
          User.unsetCurrent();
         }
        callback(err, response);
      }
    }
    return createRequest(options);
  }

  static login( data, callback = f => f ) {
    let options = {
      url: this.URL +'/login', 
      data: data,
      responseType: 'json', 
      method: 'POST',
      callback: (err, response) => {
        if (response && response.user) {
          let user = { id: response.user.id, name: response.user.name };
          User.setCurrent(user);
        } 
        callback(err, response)
      }     
    }    
    return createRequest(options);
  }


  static register( data, callback = f => f ) {
    let options = {
      url: this.URL+ '/register', 
      data: data,
      responseType: 'json', 
      method: 'POST',
      callback: (err, response) => {
        if (response && response.user) {
          let user = { id: response.user.id, name: response.user.name };
          User.setCurrent(user);
        } 
        callback(err, response)
      }     
    }    
    return createRequest(options);
  }


  static logout( data, callback = f => f ) {
    let options = {
      url: this.URL + '/logout', 
      data: data,
      responseType: 'json', 
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success) {
          User.unsetCurrent();
        } 
        callback(err, response);
      }
    }
    return createRequest(options);
  }
}
