const database = require('../database')

const find = {
    all: async (arr) => {
        const db = await database.getDb();
        const result = await db.collection.insertMany(arr);
        await db.client.close();
        return result;
    },
    one: async (obj) => {
        const db = await database.getDb();
        const result = await db.collection.insertOne(obj);
        await db.client.close();
        return result;
    }
}

module.exports = find