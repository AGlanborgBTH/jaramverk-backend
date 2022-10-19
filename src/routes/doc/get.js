const express = require('express');
const router = express.Router();
const get = require('../../db/modules/doc/get');
const upd = require('../../db/modules/doc/upd')

router.get('/', async (req, res) => {
    try {
        let id = ""
        let email = ""

        if (!req.headers["data-user-id"]) {
            throw "Id is missing"
        } else {
            id = req.headers["data-user-id"]
        }

        if (!req.headers["data-user-email"]) {
            throw "Email is missing"
        } else {
            email = req.headers["data-user-email"]
        }

        const public = await get.multiple({ users: { $in: ["*"] } })
        const private = await get.multiple({ users: { $in: [id] } })
        const invites = await get.multiple({ emails: { $in: [email] } })

        invites.forEach((doc) => {
            const index = doc.emails.indexOf(email)
            const inv = Object.assign(doc)

            inv.emails.splice(index, 1)
            inv.users.push(id)

            upd.find(inv._id, inv)
        })

        const data = {
            data: [...public, ...private, ...invites]
        };

        return res.json(data);
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/doc/",
                title: "Error",
                detail: e.message || e
            }
        });
    }
});

module.exports = router;