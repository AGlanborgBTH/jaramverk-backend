const find = require("../action/find")
const update = require("../action/update")

async function handleDocPost(obj) {
    const id = obj._id
    delete obj._id

    try {
        if (await find.one(id)) {
            update.one(id, obj)
        }
    } catch {
        console.log("oh no")
    }
}

module.exports = handleDocPost
