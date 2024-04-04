//  const {Article} =require('../config/mongoose.js')

import article from '../modules/articles/service'


// interface ResponseGraphQL {
// authors: IAuthors,
// articles?: IArticle[]
// articles: (Document<unknown, {}, {
//     title: string;
//     slug: string;
//     description: string;
//     authors: Buffer;
//     createdAt: Date;
//     updatedAt: Date;
// }>)[]
// }

interface IArticle {
    title: string,
    slug: string,
    description: string,
    _id: string
}
interface IAuthors {
    username: string,
    id: string
}

export const resolvers = {
    Query: {
        hello: () => "Hello world!",
        test: () => "ini test yah",
        Auth: async (_: any, __: any, contextValue: any) => {
            // console.log('contextValue:', contextValue);
            const result: any = await article.getArticleGraphQL(contextValue.token);
            // return JSON.stringify(result);
            return result;
        },

        // getAllArticle: (root) => {
        //     return new Promise((resolve, reject) => {
        //         Article.find((err, articles) => {
        //             if (err) reject(err);
        //             else resolve(articles);
        //         })
        //     })
        // },
        // findAArticle: (root, { id }) => {
        //     return new Promise((resolve, reject) => {
        //         Article.findOne({ _id: id }, (err, articles) => {
        //             if (err) reject(err);
        //             else resolve(articles);
        //         })
        //     })
        // }
    },
};
export const Schema = {
    Mutation: {
        Auth: {
            username: String!, id: String!
        }
    },

}