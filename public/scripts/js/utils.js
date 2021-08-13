// const setToken = (token) => (localStorage.setItem('token', token));
// const getAToken = () => (`Bearer ${localStorage.getItem('token')}`);
// const login = ({ username, password }) => {
//     //TODO: Validate
//     post_request({ method: 'POST', url: '/login/', data: { username, password } }, (response) => {
//         try {
//             debugger
//             if ((response.status === 200) && (response.data)) {
//                 setToken(response.data.token);                
//                 window.location.href = '/users/';
//                 // get_request({ url: '/users/' }, (response) => {
//                     // debugger
//                     // alert(response);
//                     // document.replaceChildren(response.data);
//                 // });
//             } else {
//                 // TODO: Display Error.
//             }            
//         } catch (error) {
//             //TODO: Display error
//         }
//     });
// };
// const post_request = ({ method, url, data }, callback) => {
//     const request = new XMLHttpRequest();
//     request.addEventListener('readystatechange', (e) => {
//         debugger
//         let response = {};
//         response.status = e.target.status
//         if (e.target.readyState === 4 && ((e.target.status === 200) || (e.target.status === 201))) {
//             response.data = JSON.parse(e.target.responseText);
//             callback(response);
//         } else {
//             response.response = e.target;
//         }
//     });
//     request.open(method, url);
//     request.setRequestHeader('Authorization', getAToken());
//     request.setRequestHeader('Content-Type', 'application/json');

//     request.send(JSON.stringify(data));
// };

// const get_request = ({ url }, callback) => {
//     const request = new XMLHttpRequest();
//     request.addEventListener('readystatechange', (e) => {
//         debugger
//         if(e.target.readyState === 4 && e.target.status === 200){
//             console.log('Success');
//             callback(e.target.response);
//         } else {
//             console.log(e.target.responseText);
//         }
//     });
//     request.open('GET', url);
//     request.setRequestHeader('Authorization', getAToken());
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send({});
// };

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