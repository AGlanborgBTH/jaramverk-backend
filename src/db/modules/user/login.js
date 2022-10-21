const database = require('../../database')

const login = {
    login: async (body) => {
        const email = body.email

        const query = { email: email }

        const db = await database.getDb("users")
        const result = await db.collection.findOne(query)
        await db.client.close();
        return result;
    }
}

module.exports = login