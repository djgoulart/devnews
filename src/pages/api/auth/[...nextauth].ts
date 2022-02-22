import NextAuth from "next-auth"
import { query as q } from "faunadb"
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../services/fauna"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      const { email, name } = user

      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: { email, name } }
          )
        )
        return true
      } catch {
        return false
      }
      return true
    },
  }
})