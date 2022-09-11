const add = require("../action/add")
const update = require("../action/update")

async function handleDocPost(obj) {
    if (obj._id) {
        const id = obj._id
        delete obj._id
        update.find(id, obj)
    } else {
        delete obj._id
        add.one(obj)
    }
}

module.exports = handleDocPost
