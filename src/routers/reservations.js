const express = require('express');
const moment = require('moment');
const sendGridMail = require('@sendgrid/mail');
const auth = require('../middlewares/auth');
const Reservation = require('../db/models/Reservation');

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
const router = new express.Router();

router.get('/reservations', auth, async (req, res) => {
    const reservations = await Reservation.find({});
    res.render('reservations', { layout: 'admin-master', reservations });
});

router.post('/reservations', async (req, res) => {
    try {
        const { clientname, email, phonenumber, additionaldetails, reservationdatetime } = req.body;
        if (!clientname) { }
        if (!email) { }
        if (!phonenumber) { }
        if (!additionaldetails) { }
        if (!reservationdatetime) { }
        let reservation = new Reservation({ clientname, email, phonenumber, additionaldetails, reservationdatetime });
        reservation = await reservation.save();

        const messageBody = `Dear ${clientname},<br /><br />

    This email is to inform you that we have recieved your reservation and we will be getting back to you soon on whether it has been approved or rejected.
    <br /><br />
        <h3>Client Details:</h3><hr />
        ${reservation.clientname}<br/>
        ${reservation.email}<br/>
        ${reservation.phonenumber}<br/>
        <br />
        <h3>Booked Time:</h3><hr />
        ${reservation.reservationdatetime}
        <br /><br />
        <h3>Adittional Details:</h3><hr />
        ${reservation.additionaldetails}
    <br /><br />
    Thank you.
        <br /><br />
    ==========================================================================
    Kind Regards
        <br /><br />
    Beefup Management.
  `
        const message = {
            to: email,
            from: 'jimdaniels1994@gmail.com',
            subject: 'Beefup Management - Reservation Recieved.',
            html: `<b>${messageBody}</b>`
        };
        await sendGridMail.send(message);
        res.status(201).json({ message: 'Reservation sent.' });
    } catch (e) {
        console.log(e);
    }
});
router.patch('/reservations/:id', async (req, res) => {
    try {
        const id = req.params.id || 0;
        const { isapproved, isrejected, reason } = req.body;        
        let reservation = await Reservation.findById(id);
        if(!reservation){
           return res.status(404).json('Reservation not found.');
        }
        if(isrejected){
            reservation.isrejected = true;
            reservation.rejectionreason = reason;            
            reservation.isapproved = false;
        } else {            
            reservation.isapproved = true;            
            reservation.isrejected = false;
            reservation.rejectionreason = ''; 
        }                
        reservation = await reservation.save();
        let messageSubject = ''; 
        let status = '';
        let reservationDetails = `
        <br /><br />
        <h3>Client Details:</h3><hr />
        ${reservation.clientname}<br/>
        ${reservation.email}<br/>
        ${reservation.phonenumber}<br/>
        <br />
        <h3>Booked Time:</h3><hr />
        ${reservation.reservationdatetime}
        <br /><br />
        <h3>Adittional Details:</h3><hr />
        ${reservation.additionaldetails}
        `;
        if(isapproved){
            messageSubject = `Reservation Confirmed for ${moment(reservation.reservationdatetime).format('MMMM Do YYYY, h:mm:ss a')}`;
            status = `
            Reservation for ${moment(reservation.reservationdatetime).format('MMMM Do YYYY, h:mm:ss a')} has been confirmed.
            ${reservationDetails}
            `;
        } else if(isrejected){
            messageSubject = `Reservation for ${moment(reservation.reservationdatetime).format('MMMM Do YYYY, h:mm:ss a')} Rejected.`;
            status = `
            Reservation for ${moment(reservation.reservationdatetime).format('MMMM Do YYYY, h:mm:ss a')} has been Rejected.<br /><br />
            Reason: ${reason}. Please try and book again.
            ${reservationDetails}
            `;
        }
        const messageBody = `Dear ${reservation.clientname},<br /><br />
    This email is to inform you that your ${status}
    
    <br /><br />
    Thank you.
        <br /><br />
    ==========================================================================
    Kind Regards
        <br /><br />
    Beefup Management.
  `
        const message = {
            to: reservation.email,
            from: 'jimdaniels1994@gmail.com',
            subject: `Beefup Management - ${messageSubject}.`,
            html: `<b>${messageBody}</b>`
        };
        await sendGridMail.send(message);
        res.status(201).json({ message: 'Operation Successful!' });
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;