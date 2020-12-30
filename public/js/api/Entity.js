class Entity {
  static URL = ''
  
  static list( data, callback = f => f ) {
    let options = {
      url: this.URL, 
      data: data,
      responseType: 'json', 
      method: 'GET',
      callback: (err, response) => callback(err, response)
      }
      console.log(options)
    return createRequest(options);
  }

  static create( data, callback = f => f ) {
    Object.assign({method : 'PUT'}, data)
    let options = {
      url: this.URL, 
      data: data,
      responseType: 'json', 
      method: 'POST',
      callback: (err, response)  => callback(err, response)
    }
    return createRequest(options);
  }
    

  static get( id = '', data, callback = f => f ) {
    let options = {
      url: this.URL + '/' + id, 
      data: data,
      responseType: 'json', 
      method: 'GET',
      callback: (err, response)  => callback(err, response)
    }
    return createRequest(options);
  }

  static remove( id = '', data, callback = f => f ) {
    Object.assign({_method : 'DELETE' , id : id}, data);
    let options = {
      url: this.URL, 
      data: data,
      responseType: 'json', 
      method: 'POST',
      callback: (err, response) => callback(err, response)
    }
    return createRequest(options);
  }
}

