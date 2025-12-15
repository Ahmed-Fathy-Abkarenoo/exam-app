import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const payload: ApiResponse<LoginResponse> = await response.json();

        if ("code" in payload || !("user" in payload)) {
          throw new Error(payload.message);
        }

        return {
          id: payload.user._id,
          accessToken: payload.token,
          user: payload.user,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        token.user = session.user;

        return token;
      }

      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
};
