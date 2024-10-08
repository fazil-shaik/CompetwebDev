import { MongoClient, MongoClientOptions } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {}

// Validate the MongoDB URI
if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
  throw new Error('Invalid MONGODB_URI. It should start with mongodb:// or mongodb+srv://')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
      .catch(err => {
        console.error('Failed to connect to MongoDB', err)
        throw err
      })
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
    .catch(err => {
      console.error('Failed to connect to MongoDB', err)
      throw err
    })
}

export default clientPromise