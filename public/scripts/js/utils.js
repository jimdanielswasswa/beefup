const send_request = ({ url, method }) => new Promise((resolve, reject) => {
    debugger
    const request = new XMLHttpRequest();
    request.onload = (e) => {
        debugger
        try {
            const response = JSON.parse(request.response);
            if (response.message) {
                resolve(response);
            } else {
                reject(response.errors);
            }
        } catch (e) {
            window.location.reload();
        }
    };
    request.onerror = (e) => {
        reject(request.response);
    };
    request.open(method, url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
});

const submit_json_data = ({ url, method, data }) => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onload = () => {
        debugger
        const response = JSON.parse(request.response);
        if (response.message) {
            resolve(response);
        } else {
            reject(response);
        }
    };
    request.onerror = () => {
        reject(request.response);
    }
    request.open(method, url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
});
const submit_form_data = ({ url, method, data }) => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onload = () => {
        debugger
        const response = JSON.parse(request.response);
        if (response.message) {
            resolve(response);
        } else {
            reject(response);
        }
    };
    request.onerror = () => {
        reject(request.response);
    }
    request.open(method, url, true);
    request.send(data);
});