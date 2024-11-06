import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import { compare } from 'bcryptjs';

import clientPromise from "./mongodb";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;

        const client = await clientPromise;
        await client.connect()

        const usersCollection = client.db().collection('profile');

        const user = await usersCollection.findOne({ email });
        if (!user) throw new Error('No user found!');

        const checkPassword = await compare(password, user?.password)
        if (!checkPassword) throw new Error("Password not matched")

        return {
          email,
          userId: user?.userId,
          id: user?._id?.toString(),
        };
      },
      credentials: {}
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      token.id = user?.id || token.sub
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session
    },
  },
}

