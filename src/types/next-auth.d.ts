import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { IResponseUSer, ITypeUSer, IRoleUSer } from "@/types/users"

declare module "next-auth" {
    interface Session {
        data: IResponseUSer
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        data: IResponseUSer
    }
}