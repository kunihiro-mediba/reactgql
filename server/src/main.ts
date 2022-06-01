import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express from "express";

const typeDefs = gql`
    scalar Date

    type Notice {
        id: ID!
        title: String!
        date: Date!
        url: String!
    }

    type Notices {
        list: [Notice!]!
        currentPage: Int!
        totalPages: Int!
    }

    type Query {
        hello: String!
        notices(page: Int! = 1): Notices!
    }

    schema {
        query: Query
    }
`;

const resolvers = {
    Query: {
        hello() {
            return "Hello,World!";
        },
        notices(_parent: unknown, { page }: { page: number }) {
            return {
                list: [
                    {
                        id: 123,
                        title: "hoge",
                        date: new Date("2022-01-02T15:04:05+09:00"),
                        url: "http://google.com/",
                    },
                ],
                currentPage: page,
                totalPages: 1,
            };
        },
    },
};

async function main(port: number): Promise<void> {
    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    await apollo.start();
    const server = express();
    server.use(apollo.getMiddleware());
    server.listen(port, () => {
        console.log(`start server port:${port}`);
    });
}

main(3000).catch((err) => {
    console.error(err);
    process.exit(1);
});
