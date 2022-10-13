const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} = require('graphql');

const DocType = require("./doc");

const get = require("../db/modules/doc/get");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        doc: {
            type: DocType,
            description: 'A single document',
            args: {
                id: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                const doc = await get.one(args.id);

                return doc;
            }
        },
        docs: {
            type: new GraphQLList(DocType),
            description: 'List of all documents',
            resolve: async function() {
                const allDocs = await get.all();

                return allDocs;
            }
        },
        docsByUser: {
            type: new GraphQLList(DocType),
            description: 'List of documents with user',
            args: {
                id: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                const public = await get.multiple({ users: { $in: ["*"] } })
                const private = await get.multiple({ users: { $in: [args.id] } })

                const data = [...public, ...private]

                return data;
            }
        }
    })
});

module.exports = RootQueryType;