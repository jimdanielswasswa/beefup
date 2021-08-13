window.onload = (function () {
    // const url = `https://maps.googleapis.com/maps/staticmap?center=${38.897733, -77.036531}&zoom=${10}&size=${'629x450'}
    //     &maptype=roadmap`;

    document.querySelector('#reservationdatetime').flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });
});