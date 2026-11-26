import "next-auth";
import "next-auth/adapters";
import "next-auth/jwt";
import type { DefaultSession } from "next-auth";

type UserRole = "ADMIN" | "CLIENT";

declare module "next-auth" {
  interface User {
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}