const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

exports.sendEmailOnBooking = functions.firestore
    .document('bookings/{bookingId}')
    .onCreate(async (snapshot, context) => {
        const bookingData = snapshot.data();
        const userData = await admin.firestore().collection('users').doc(bookingData.uid).get();
        const adminUsers = await admin.firestore().collection('users').where('isAdmin', '==', true).get();

        const mailText = `
            New booking:
            Name: ${userData.data().fullname} created a new booking.
            Phone: ${userData.data().phone}
            Email: ${userData.data().email}
            Booking date: ${bookingData.selectedDate} ${bookingData.selectedTime}
            Type of session: ${bookingData.selectedType}
            Estimated number of people: ${bookingData.amount}
            Estimated duration: ${bookingData.duration}
            Please check your admin panel for more details to approve or decline the booking.
        `

        const mailOptions = {
            from: gmailEmail,
            subject: 'Новий запис на фотосесію',
            text: mailText
        };

        adminUsers.forEach(user => {
            mailOptions.to = user.data().email;
            mailTransport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        });

        return null;
    });

exports.sendEmailOnStatusChange = functions.firestore
    .document('bookings/{bookingId}')
    .onUpdate(async (change, context) => {
        const beforeData = change.before.data();
        const afterData = change.after.data();

        if (beforeData.status !== afterData.status) {
            const userId = afterData.uid;
            const userSnapshot = await admin.firestore().collection('users').doc(userId).get();
            const userData = userSnapshot.data();

            const mailOptions = {
                from: gmailEmail,
                to: userData.email,
                subject: 'Зміна статусу заявки',
                text: `Статус вашей заявки изменился на: ${afterData.status}`
            };

            mailTransport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        }

        return null;
    });