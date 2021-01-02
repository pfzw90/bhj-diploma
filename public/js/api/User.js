class User {

  static URL = '/user'

  static setCurrent( user ) { localStorage.setItem( 'user', JSON.stringify( user ) ) }

  static unsetCurrent() { localStorage.removeItem( 'user' ) }

  static current() { return JSON.parse( localStorage.getItem( 'user' ) ) }

  static fetch( data, callback = f => f ) {
    createRequest( {url: this.URL + '/current', data, responseType: 'json', method: 'GET',
      callback: ( err, response ) => {
        if ( !err ) { User.setCurrent( {id: response.user.id, name: response.user.name} )
        } else { User.unsetCurrent() }
        callback( err, response );
      }
    });
  }

  static login( data, callback = f => f ) { 
    createRequest( { url: this.URL + '/login', data, responseType: 'json', method: 'POST',
      callback: ( err, response ) => {
        if ( !err ) { User.setCurrent( {id: response.user.id, name: response.user.name} ) }
        callback( err, response );
      }     
    });
  }


  static register( data, callback = f => f ) {   
    createRequest( {url: this.URL+ '/register', data, responseType: 'json', method: 'POST',
      callback: ( err, response ) => {
        if ( !err ) { User.setCurrent( {id: response.user.id, name: response.user.name} ) } 
        callback( err, response );
      }     
    });
  }


  static logout( data, callback = f => f ) {
    createRequest( {url: this.URL + '/logout', data, responseType: 'json', method: 'POST',
      callback: ( err, response ) => {
        if ( !err ) { User.unsetCurrent() } 
        callback( err, response );
      }
    });
  }

}
