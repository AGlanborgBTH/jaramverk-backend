const database = require('./database')

const find = {
    all: async () => {
        let db;

            db = await database.getDb();

            const result = await db.collection.find({}).toArray();
            await db.client.close();
            return result;
    }
}

module.exports = find
