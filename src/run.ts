import dotenv from 'dotenv'
import app from './index'
import express, { Request, Response } from 'express';
import cors from 'cors'
import { gql } from 'apollo-server'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import writeLogger from './middleware/logger';
import { resolvers } from './data/resolver.graphql';
// import router from './router/index'
import Router from './router/index';
dotenv.config();

// auth:[Article]
type ArticleResponse = {
    id: String
    title: String
    slug: String
    description: String
    createdAt: String
    updatedAt: String
}

async function startApolloServer(resolvers: any) {
    const serverGraphQL = new ApolloServer({
        typeDefs: gql`
        type Query {
          hello: String
          test: String
          show: String
          Auth: String
        }
        type AuthResponse{
            username:String
            id: String
        }
        type Auth{
            Auth:AuthResponse
        }
        type ArticleResponse{
            id: String!
            title: String!
            slug:String!
            description:String!
            createdAt: String!
            updatedAt: String!
        }

        type Mutations{
            Auth:String
        },
      `,
        resolvers: resolvers,
        csrfPrevention: true,
        cache: 'bounded',
    });
    return serverGraphQL;
}

async function run() {
    const PORT = process.env.PORT || 3001;

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(writeLogger);

    // const router = Router
    app.use(Router.globalAPI)
    app.use(Router.router)
    app.get('/', (req: Request, res: Response) => {
        res.send({
            status: 0,
            message: 'Hello, TypeScript with Express!'
        });
    });

    const graph = await startApolloServer(resolvers);
    await graph.start();

    app.use('/graphql', express.json(), cors(), expressMiddleware(graph, {
        context: async ({ req }) => ({
            token: req.headers.authorization,
            contextValue: req,
            // AuthResponse: {}
            // dataSources: {
            //   userApi: new UserAPI(),
            // },
        }),

    }));

    app.use("/**", (req: any, res: any) => {
        res.status(404).send({
            status: false,
            message: "not found",
        });
    });

    app.listen(PORT, () => console.log(`you are listened http://localhost:${PORT}`));
}

run();