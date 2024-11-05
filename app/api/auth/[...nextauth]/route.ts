// // pages/api/auth.ts
// import { NextApiRequest, NextApiResponse } from 'next'
// import clientPromise from '../../../lib/mongodb'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body

//     const client = await clientPromise
//     const db = client.db('your_database_name')

//     const user = await db.collection('users').findOne({ email })

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' })
//     }

//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' })
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' })

//     res.status(200).json({ token })
//   } else {
//     res.setHeader('Allow', ['POST'])
//     res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }

// // app/api/auth/[...nextauth]/route.ts
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import clientPromise from '@/lib/mongodb'
// import { AuthOptions } from 'next-auth'
// // import { ObjectId } from 'mongodb'
// import bcrypt from 'bcryptjs'

// const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         const client = await clientPromise;
//         const db = client.db();
//         const admin = await db.collection('admins').findOne({ email: credentials.email });

//         if (!admin) {
//           return null;
//         }

//         const isPasswordCorrect = await bcrypt.compare(credentials.password, admin.password);

//         if (!isPasswordCorrect) {
//           return null;
//         }

//         return { id: admin._id.toString(), email: admin.email };
//       }
//     })
//   ],
//   session: {
//     strategy: 'jwt', // This should be a string literal, not just `string`
//   },
//   pages: {
//     signIn: '/login',
//   },
// };


// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }