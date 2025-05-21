import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth, } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter your email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password"
                }
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.ENDPOINT_API}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })
                const user = await res.json()
                return user.data
            }
        })
    ],

    pages: {
        signIn: '/signin',
        signOut: '/'
    },

    callbacks: {
        async jwt({ token, user, account }) {
            if (account?.token) { 
                token.jwt = account.token;
            }
            if (user) {
                token.role = user.role
                token.access_token = user.token
            }
            
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role
                session.access_token = token.access_token as string
            }

            return session
        }
    },

    cookies: {
        sessionToken: {
            name: 'sessionToken',
            options: {
                maxAge: 60 * 60 * 24
            },
        },

    },
    // session: {
    //     strategy: 'jwt',
    //     maxAge: 7 * 24 * 60 * 60
    // },
    // jwt: {
    //     maxAge: 7 * 24 * 60 * 60
    // },
    secret: process.env.NEXTAUTH_SECRET

})