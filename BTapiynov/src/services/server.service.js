const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const config = require('../configs');
const port = config.server.port;
const apiRouter = require('../routes');
const schema = require('../apollo/schemas');
const resolvers = require('../apollo/resolvers');
import cors from "cors";
const {ApolloServer, gql} = require('apollo-server-express');



const graphQlServer = new ApolloServer({
    typeDefs : schema,
    resolvers
})

graphQlServer.applyMiddleware({app, path: "/graphql"});

app.use(bodyparser.json());
app.use(cors());
app.use('/api/v1', apiRouter);

exports.start = () => {
    app.listen(port, (err) => {
        if (err) {
            console.log(`Error: ${err}`);
            process.exit(-1);
        }
        console.log(`app is running on port ${port}`);
    })
        
}
