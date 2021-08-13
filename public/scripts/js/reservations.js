const reservations_form = document.querySelector('#reservation-form');
const reason_form = document.querySelector('#reason-form');
const approve_btn = document.querySelectorAll('.approve-btn');
const reject_btns = document.querySelectorAll('.reject-btn');

const load_reason_form = (id, reservationdatetime) => {
    reason_form["_id"].value = id;
    reason_form["rejectionreason"].value = '';
    window.location.href = '#reason-modal';
};
const updateReservation = (id, data) => {
    submit_data({ url: `/reservations/${id}`, method: 'PATCH', data }).then((response) => {
        window.location.href = window.location.href.substring(0, (window.location.href.indexOf('#')));
    }).catch((e) => {
        alert(e);
    });
};


approve_btn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        debugger
        const dataSet = e.target.dataset;
        const data = {
            reason: '',
            isapproved: true,
            isrejected: false
        };
        updateReservation(dataSet.id, data);
    });
});
reject_btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const dataSet = e.target.dataset;
        load_reason_form(dataSet.id);
    });
});
reservations_form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
        clientname: reservations_form["clientname"].value,
        email: reservations_form["email"].value,
        phonenumber: reservations_form["phonenumber"].value,
        additionaldetails: reservations_form["additionaldetails"].value,
        reservationdatetime: reservations_form["reservationdatetime"].value
    };
    submit_data({ url: `/reservations/`, method: 'POST', data }).then((response) => {
        window.location.href = window.location.href.substring(0, (window.location.href.indexOf('#')));
    }).catch((e) => {
        alert(e);
    });
});
reason_form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
        reason: reason_form["rejectionreason"].value,
        isapproved: false,
        isrejected: true
    };
    updateReservation(reason_form["_id"].value, data);
});