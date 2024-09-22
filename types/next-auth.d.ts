import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: boolean;
      role: string;
      id: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** OpenID ID Token */
    roles: string;
    id: string;
  }
}
