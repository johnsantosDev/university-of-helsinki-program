import { GraphQLError } from "graphql";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Person from "./models/Person.js";
import User from "./models/User.js";

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
    Query: {
      personCount: async () => Person.collection.countDocuments(),
      allPersons: async (root, args) => {
        if (!args.phone) {
          return Person.find({})
        }
  
        return Person.find({ phone: { $exists: args.phone === 'YES' } })
      },
      findPerson: async (root, args) => Person.findOne({ name: args.name }),
      me: (root, args, context) => {
        return context.currentUser
      },
    },
    Person: {
      address: (root) => {
        return {
          street: root.street,
          city: root.city,
        }
      },
    },
    Mutation: {
      addPerson: async (root, args, {currentUser}) => {
        console.log('context: ', currentUser)
        //const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated')
        }
  
        const person = new Person({ ...args })
        try {
          await person.save()
          currentUser.friends = currentUser.friends.concat(person)
          await currentUser.save()
        } catch (error) {
          throw new GraphQLError(error.message, {
            invalidArgs: args,
          })
        }
  
        return person
      },
      editNumber: async (root, args) => {
        const person = await Person.findOne({ name: args.name })
        person.phone = args.phone
  
        try {
          await person.save()
        } catch (error) {
          throw new GraphQLError(error.message, {
            invalidArgs: args,
          })
        }
        return person.save()
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username })
  
        return user.save().catch((error) => {
          throw new GraphQLError(error.message, {
            invalidArgs: args,
          })
        })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if (!user || args.password !== 'secret') {
          throw new GraphQLError('wrong credentials')
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
      addAsFriend: async (root, args, { currentUser }) => {
        const nonFriendAlready = (person) =>
          !currentUser.friends.map((f) => f._id.toString()).includes(person._id.toString())
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated')
        }
  
        const person = await Person.findOne({ name: args.name })
        if (nonFriendAlready(person)) {
          currentUser.friends = currentUser.friends.concat(person)
        }
  
        await currentUser.save()
  
        return currentUser
      },
    },
  }

export default resolvers