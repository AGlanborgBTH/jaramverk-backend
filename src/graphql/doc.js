const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const ObjectId = require('mongodb').ObjectId;

const UserType = require("./user");

const get = require("../db/modules/user/get");

const DocType = new GraphQLObjectType({
    name: 'Doc',
    description: 'This represents a document',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        innerHTML: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            description: 'A list of valid users',
            args: {
                id: { type: GraphQLString }
            },
            resolve: async function (doc) {
                let final = []

                if (doc.users.includes("*")) {
                    final = await get.all()
                } else {
                    let users = []
                    doc.users.forEach(user => users.push(ObjectId(user)))

                    final = await get.multiple({ _id: { $in: users } })
                }

                return final;
            }
        }
    })
})

module.exports = DocType;