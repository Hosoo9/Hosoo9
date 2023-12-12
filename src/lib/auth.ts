import prisma from "@/utils/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET || "some-secret",
  adapter: PrismaAdapter(prisma),
  debug: process.env.NEXT_AUTH_DEBUG === "true",
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "ログインID", type: "text", placeholder: "" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            id: credentials?.username,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
        })

        const user = await res.json()

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  pages: {
    // signIn: "/signin",
  },
  callbacks: {
    async session({ token, session }: { token: any; session: any }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.role = token.role
        session.user.companyCode = token.companyCode
      }

      return session
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (!user) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: user.id,
        name: user.name,
        role: user.role,
        companyCode: user.companyId,
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
