const createRequest = (options) => {
    const req = new XMLHttpRequest();
    let url = options.url;
    formData = new FormData();

    if (options.method === 'GET') {
        let linkData = [];
        for (let d in options.data) { linkData.push(d + '=' + options.data[d]) }
        url += '?' + linkData.join('&')
    } else { 
        for (let d in options.data) { formData.set(d, options.data[d]) }          
    }

    req.open(options.method, url);
    req.withCredentials = true;
    req.responseType = options.responseType;
    
    req.addEventListener('readystatechange', function() {
        if (this.readyState === req.DONE && req.status === 200) {
            options.callback(req.response.error, req.response);
        }
    });

    try {   
        req.send(formData);
    } catch (e) {
        options.callback(e);
    }
}

   


