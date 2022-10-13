const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

module.exports = UserType;