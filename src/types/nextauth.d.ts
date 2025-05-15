import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        email?: string;
        role?: string;
        token?: string;
    }

    interface JWT {
        email?: string;
        role?: string;
        access_token?: string;
    }

    interface Session {
        user: {
            role?: string;
        } & DefaultSession["user"];
        access_token?: string;
    }
}