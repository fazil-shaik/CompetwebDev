import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  createdAt: Date
}

export function createUser(name: string, email: string, hashedPassword: string): User {
  return {
    name,
    email,
    password: hashedPassword,
    createdAt: new Date()
  }
}