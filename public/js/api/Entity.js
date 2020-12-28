class Entity {
  constructor() {
    this.URL = '';
  }

  static list( data, callback = f => f ) {
    let options = {
      url: this.URL, 
      data: data,
      responseType: 'json', 
      method: 'GET',
      callback: (err, response) => {
        console.log( 'Ошибка, если есть', err );
        console.log( 'Данные, если нет ошибки', response );
      }
    }

    try {
      const xhr = createRequest(options);
      callback(none, xhr.response);
    } catch (e) {
      callback (e);
    } finally {
      return xhr;
    }
  }

  static create( data, callback = f => f ) {
    
    Object.assign({method : 'PUT'}, data)
    let options = {
      url: this.URL, 
      data: data,
      responseType: 'json', 
      method: 'POST',
      callback: (err, response) => {
        console.log( 'Ошибка, если есть', err );
        console.log( 'Данные, если нет ошибки', response );
      }
    }

    try {
    const xhr = createRequest(options);
      callback(none, xhr.response);
    } catch (e) {
      callback (e);
    } finally {
      return xhr;
    }
  }

  static get( id = '', data, callback = f => f ) {
    let options = {
      url: this.URL + '/' + id, 
      data: data,
      responseType: 'json', 
      method: 'GET',
      callback: (err, response) => {
        console.log( 'Ошибка, если есть', err );
        console.log( 'Данные, если нет ошибки', response );
      }
    }

    try {
      const xhr = createRequest(options);
        callback(none, xhr.response);
      } catch (e) {
        callback (e);
      } finally {
        return xhr;
      }
  }

  static remove( id = '', data, callback = f => f ) {
    Object.assign({_method : 'DELETE' , id : id}, data);
    let options = {
      url: this.URL, 
      data: data,
      responseType: 'json', 
      method: 'POST',
      callback: (err, response) => {
        console.log( 'Ошибка, если есть', err );
        console.log( 'Данные, если нет ошибки', response );
      }
    }

    try {
    const xhr = createRequest(options);
      callback(none, xhr.response);
    } catch (e) {
      callback (e);
    } finally {
      return xhr;
    }

  }
}

