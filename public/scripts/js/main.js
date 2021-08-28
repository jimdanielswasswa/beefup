const loginForm = document.querySelector('#login-form');
const logout = document.querySelector('#logout');
const errorOutput = document.querySelector('#login-errors');
window.onload = (function () {
    // const url = `https://maps.googleapis.com/maps/staticmap?center=${38.897733, -77.036531}&zoom=${10}&size=${'629x450'}
    //     &maptype=roadmap`;

    document.querySelector('#reservationdatetime').flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    debugger
    const data = { username: loginForm["username"].value, password: loginForm["password"].value };
    submit_json_data({ url: 'login', method: 'POST', data }).then((response) => {
        window.location.href = response.destination;
    }).catch((errors) => {
        errorOutput.innerHTML = '';
        for(index in errors){
            errorOutput.innerHTML += `${errors[index]}\n`;
        }
    });
    
});
logout.addEventListener('click', async (e) => {
    await send_request({ url: '/logout', method: 'POST' });
    window.location.href = '/';
});