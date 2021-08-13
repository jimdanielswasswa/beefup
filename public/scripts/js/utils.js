const send_request = ({ url, method }) => new Promise((resolve, reject) => {
    debugger
    const request = new XMLHttpRequest();
    request.onload = (e) => {
        const response = JSON.parse(request.response);
        if (response.message) {
            resolve(response);
        } else {
            reject(response.error);
        }
    };
    request.onerror = (e) => {
        reject(request.response);
    };
    request.open(method, url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
});

const submit_data = ({ url, method, data }) => new Promise((resolve, reject) => {
    debugger
    const request = new XMLHttpRequest();
    request.onload = () => {
        debugger
        const response = JSON.parse(request.response);
        if (response.message) {
            resolve(response);
        } else {
            reject(response.error);
        }
    };
    request.onerror = () => {
        reject(request.response);
    }
    request.open(method, url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
});