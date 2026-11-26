import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"

import { prisma } from "@/lib/prisma"


export const {
    handlers,
    auth,
    signIn,
    signOut,

} = NextAuth({
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "jwt"
    },

    providers: [
        Credentials({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type:   "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },

            async authorize(credentials) {
                if (typeof credentials.email !== "string" || typeof credentials.password !== "string") return null

                const email = credentials.email.trim().toLocaleLowerCase()
                const password = credentials.password

                const user = await prisma.user.findUnique({
                    where: {email}
                })

                if(!user || !user.passwordHash) return null

                const isPasswordValid = await compare(password, user.passwordHash)

                if(!isPasswordValid) return null

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                token.id = user.id
                token.role = user.role
            }

            return token
        },

        async session({ session, token }) {
            if (session.user && token.id && token.role) {
                session.user.id = token.id
                session.user.role = token.role
            }

            return session
        }
    }
})