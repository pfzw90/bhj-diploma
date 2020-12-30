const setHeaders = (request, headers) => {
    if (headers) {
        for (let header in headers) {
            request.setRequestHeader(header, headers[header]);
        }
    } 
}

const createRequest = (options) => {
    const req = new XMLHttpRequest();
    let url = options.url;

    if (options.method === 'GET') {
        let linkData = [];
        for (let d in options.data) {
            linkData.push(d + '=' + options.data[d]);
        }
        url += '?' + linkData.join('&')
    }

    else {
        formData = new FormData();
        for (let d in options.data) {
            formData.set(d, options.data[d])
           }          
    }
        req.open(options.method, url);
        req.withCredentials = true;
        req.responseType = options.responseType;
        setHeaders(req, options.headers);
  
        req.addEventListener('readystatechange', function() {
                    if (this.readyState === req.DONE && req.status === 200) {
                 options.callback(req.response.error, req.response);
            }
        });

    try {   
        if (options.method === 'GET') {
                req.send();
            }
        else {          
                req.send(formData);
            } 
    } catch (e) {
        options.callback(e);
      } finally {
       return req;
    }
}

   


