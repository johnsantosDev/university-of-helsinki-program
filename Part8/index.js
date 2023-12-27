import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv'
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

import Book from "./models/Book.js";
import Author from "./models/Author.js";
import User from "./models/User.js";

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to database`)
  }).catch((error) => {
    console.log(`Error connecting to database: ${error.message}`)
  })

const typeDefs = `#graphql
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type User {
      username: String!
      favrouriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }
    
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genres: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String]!
        ): Book

        editAuthor(
          name: String!, 
          setBornTo: Int!
          ): Author

        createUser(
          username: String!
          favrouriteGenre: String!
        ): User

        login(
          username: String!
          password: String!
        ): Token

    }
  `;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      return books
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new GraphQLError('User not authenticated!')
      }

      let author = await Author.findOne({name: args.author})
      let title = await Book.findOne({title: args.title})
      
      if(!author) {
        author = new Author(
          {name: args.author, 
          bookCount: 1, 
          born: null,
        })
        try {
          await author.save()
        } catch(error) {
          throw new GraphQLError(error.message)
        }
      } else if(author && !title) {
        author.bookCount = author.bookCount + 1
        await author.save()
      }
     
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author
      })

      try {
        await book.save()
      } catch(error) {
        throw new GraphQLError(error.message)
      }

      return book
    },
    editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser

        if(!currentUser) {
          throw new GraphQLError('User not authenticated!')
        }

        const author = await Author.findOne({name: args.name})

        if(!author) {
            return null
        }

        try {
          await Author.findOneAndUpdate(author, {$set: {born: args.setBornTo}})
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: {code: 'BAD_USER_INPUT'}
          })
        }
        
        const updated = await Author.findOne({born: args.setBornTo})
        return updated
    }, 
    createUser: async (root, args) => {
      console.log('args', args)
      const newUser = new User({...args})
      console.log(newUser)
      try {
        await newUser.save()
      } catch (error) {
        throw new GraphQLError(error.message)
      }

      return newUser
    }, 
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if ( !user || args.password !== 'mypassword' ) {
        throw new GraphQLError("Wrong credentials!")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const authorization = req ? req.headers.authorization : null
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        authorization.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
});

console.log(`🚀  Server ready at: ${url}`);
