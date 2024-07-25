import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connentMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from 'bcryptjs'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {

                const { email, password }: any = credentials;

                try {
                    await connentMongoDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        return null;
                    }


                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as "jwt", // Explicitly set the type
    },
    secret: process.env.NEXTAUTH_SECRET as string, // Ensure the type is string
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
