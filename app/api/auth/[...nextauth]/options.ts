import prisma from "@/app/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email) {
					throw new Error("Email is required");
				}
				if (!credentials?.password) {
					throw new Error("Password is required");
				}
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email & Password are required");
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});
				if (user?.email !== credentials.email) {
					throw new Error("User not found. Wrong email.");
				}
				if (!user || !user?.hashedPassword) {
					throw new Error("Something went wrong. Please try again.");
				}

				const isPasswordCorrect = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				);
				if (!isPasswordCorrect) {
					throw new Error("Wrong Password.");
				}

				return user;
			},
		}),
	],
	debug: process.env.NODE_ENV === "development",
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
