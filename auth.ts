import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, User as PrismaUser, User } from "@prisma/client";
import bcryptjs from "bcryptjs";
import prismadb from "./lib/prismadb";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // interface Session {
  //   user: {
  //     /** The user's postal address. */
  //   } & DefaultSession["user"] &
  //     User;
  // }
  interface Session {
    expires: string;
    user?: User;
  }
}

async function getUser(email: string): Promise<PrismaUser | null> {
  try {
    const user = await prismadb.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
const prisma = new PrismaClient();

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),

  providers: [
    Credentials({
      // @ts-ignore
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user)
            throw new Error(
              "La connexion a échoué. Veuillez vérifier votre email et votre mot de passe, et réessayer."
            );
          const passwordsMatch = await bcryptjs.compare(
            password,
            user.password
          );
          console.log(passwordsMatch);
          if (!passwordsMatch)
            return {
              error:
                "La connexion a échoué. Veuillez vérifier votre email et votre mot de passe, et réessayer.",
            };

          return user;
        }

        throw new Error(
          "La connexion a échoué. Veuillez vérifier votre email et votre mot de passe, et réessayer."
        );
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user as User;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
