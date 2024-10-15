// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;  // Add your custom field here
  }

  interface JWT {
    accessToken?: string;  // Also extend JWT for proper typing
  }
}
