
class User {
  constructor() {
    this.URL = '/user'
  }
 
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  static current() {
    return localStorage.getItem('user');
  }

  static fetch( data, callback = f => f ) {
    let options = {
      url: '/user/current', 
      data: data,
      responseType: 'json', 
      method: 'GET',
      callback: function(err, response) {
        if (response.success && response.user) {
          let user = {
            id: response.user.id,
            name: response.user.name
          };
          this.setCurrent(user);
        } else {
          this.unsetCurrent();
        }
        callback();
      }
    }
 
    return createRequest(options);
  }

  static login( data, callback = f => f ) {
    let options = {
      url: '/user/login', 
      data: data,
      responseType: 'json', 
      method: 'POST',
      callback: (err, response) => {
        if (response && response.user) {
        let user = {
          id: response.user.id,
          name: response.user.name
        };
        this.setCurrent(user);
        } else {
          console.log('Ошибка авторизации' + err);
        }
        callback();
      }
    }    
    return createRequest(options);
  }




//   static register( data, callback = f => f ) {
//     let options = {
//       url: '/user/register', 
//       data: data,
//       responseType: 'json', 
//       method: 'POST'
//     }
    
//     try {
//       const xhr = createRequest(options);
//       if (xhr.response.success) {
//         let user = {
//           id: xhr.response.user.id,
//           name: xhr.response.user.name
//         };
        
//         this.setCurrent(user);
//       }

//       callback(none, xhr.response);
//     } catch (e) {
//       callback (e);
//     } finally {
//       return xhr;
//     }
//   }


//   static logout( data, callback = f => f ) {
//     let options = {
//       url: '/user/logout', 
//       data: data,
//       responseType: 'json', 
//       method: 'POST'
//     }
    
//     try {
//       const xhr = createRequest(options);
//       if (xhr.response.success) {
//         this.unsetCurrent();
//       }
//       callback(none, xhr.response);
//     } catch (e) {
//       callback (e);
//     } finally {
//       return xhr;
//     }
//   }
}
