const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail')

router.post("/", (req, res) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            to: req.body.to,
            from: "angb21@student.bth.se",
            subject: 'You are invited to a document!',
            text: `You are invited to a document by ${req.body.from}.
            You can enter the editor with the following link:
            http://www.student.bth.se/~angb21/editor/`,
            html: `You are invited to a document by ${req.body.from}.
            You can enter the editor with the following link:
            <a href="http://www.student.bth.se/~angb21/editor/" target="_blank">
            http://www.student.bth.se/~angb21/editor/
            </a>`,
        }

        sgMail
            .send(msg)
            .then(() => {
                console.log(`Email sent from ${req.body.from}, to ${req.body.to}`)
            })

        return res.status(201).json({
            data: {
                msg: "Got a POST request, sending back 201: Sent Email"
            }
        });
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/doc/post",
                title: "Error",
                detail: e.message || e
            }
        });
    }

});

module.exports = router;