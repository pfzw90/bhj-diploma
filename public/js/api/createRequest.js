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
            linkData.push(encodeURIComponent(d) + '=' + encodeURIComponent(options.data[d]));
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
              if (this.readystate === req.DONE && this.status === 200) {
                if (this.response.success) options.callback(null, response);
                else {console.log('fail'); options.callback(this.response.error)};
            }
        });

    try {    
            if (formData) {
                req.send(formData);
            } else {
                req.send();
            }   
    } catch (e) {
        options.callback(e);
    } finally {
        console.log(req)
    return req;
    }
}

   


