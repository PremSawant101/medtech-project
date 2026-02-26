import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: "credentials",
            async authorize(credentials) {
                await connectDB();

                const user = await User.findOne({
                    email: credentials.email,
                });

                if (!user) return null;

                const isMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isMatch) return null;

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    callbacks: {
        async signIn({ user }) {
            await connectDB();

            const existingUser = await User.findOne({
                email: user.email,
            });

            if (!existingUser) {
                await User.create({
                    name: user.name,
                    email: user.email,
                    role: "user",
                });
            }

            return true;
        },

        async session({ session }) {
            await connectDB();

            const dbUser = await User.findOne({
                email: session.user.email,
            });

            session.user.role = dbUser?.role || "user";

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };