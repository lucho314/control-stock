import { authConfig } from "@/auth.config";
import NextAuth from "next-auth/next";

const hanler = NextAuth(authConfig);

export { hanler as GET, hanler as POST };
