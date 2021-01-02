class Entity {
  static URL = ''
  
  static list( data, callback = f => f ) {
    createRequest( {url: this.URL, data, responseType: 'json', method: 'GET', callback} );
  }

  static create( data, callback = f => f ) {
    createRequest( {url: this.URL, data: Object.assign({_method : 'PUT'}, data), responseType: 'json', method: 'POST', callback} );
  }
    

  static get( id = '', data, callback = f => f ) {
    createRequest( {url: this.URL + '/' + id, data, responseType: 'json', method: 'GET', callback} );
  }

  static remove( id = '', data, callback = f => f ) {
    createRequest( {url: this.URL, data: Object.assign({_method : 'DELETE' , id : id}, data), responseType: 'json', method: 'POST', callback} );
  }
  
}

