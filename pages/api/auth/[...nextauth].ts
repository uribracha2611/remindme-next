import { DoesUsernameExist} from "@/app/utils"
import { compare } from "bcrypt"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions:NextAuthOptions={
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "Username" },
      password: {  label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // You need to provide your own logic here that takes the credentials
      // submitted and returns either a object representing a user or value
      // that is false/null if the credentials are invalid.
      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // You can also use the `req` object to obtain additional parameters
      // (i.e., the request IP address)
  try{
      let user=await DoesUsernameExist(credentials?.username as string)
      if(user){
          if(await compare(credentials?.password as string, user.password)){
              return user as any
          }
          else{
              return null
          }

      }
      else{
          return null
      }
}
catch(err){
  return null
}

}

  })
],
session:{
  strategy:"jwt"
},
callbacks: {
  async session({ session, token }) {

    session.user = token.user as any;
    return session;
  },
  async jwt({ token, user }) {
    if (user) {
      token.user = user;
    }
    return token;
  },
},
}

export default NextAuth(authOptions)