const ObjectId = require('mongodb').ObjectId; 
const database = require('../../database')

const update = {
    all: async (filter, update) => {
        const db = await database.getDb();
        const result = await db.collection.updateMany(filter, {$set: update});
        await db.client.close();
        return result;
    },
    one: async (id, update) => {
        const db = await database.getDb();
        const result = await db.collection.updateOne({"_id": ObjectId(id)}, {$set: update});
        await db.client.close();
        return result;
    },
    find: async (id, update) => {
        const db = await database.getDb();
        const result = await db.collection.findOneAndUpdate({"_id": ObjectId(id)}, {$set: update});
        await db.client.close();
        return result;
    }
}

module.exports = update