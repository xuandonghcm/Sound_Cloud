import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { AuthOptions } from 'next-auth'
import { ITypeUSer, SocialMediaAuthRequest, LoginRequest, IResponseUSer } from "@/types/users"
import { getTokenBySocialMedia, Login } from "@/service/users"
import CredentialsProvider from "next-auth/providers/credentials";
import { PATH } from "@/constants/PathConstants"
export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Your Account",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Your Username" },
                password: { label: "Password", type: "password", placeholder: "Your Password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Username and password are required");
                }
                var param: LoginRequest = {
                    username: credentials?.username || "",
                    password: credentials?.password || ""
                };
                const res = await Login(param);
                if (res && res.data) {
                    return res.data as any;
                } else {
                    throw new Error(res.message);
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            name: 'google',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],

    secret: process.env.NEXT_AUTH_SECRET,
    // callbacks được gọi sau khi login thành công
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            var param: SocialMediaAuthRequest = { type: ITypeUSer.LOCAL, username: '' };
            const typeLogin = account?.provider.toLocaleUpperCase() as ITypeUSer;
            if (trigger === 'signIn' && user && typeLogin === ITypeUSer.GITHUB) {
                param = {
                    type: typeLogin,
                    username: user.email!, // user.email chỉ an toàn nếu user tồn tại
                };
                const res = await getTokenBySocialMedia(param);
                if (res.data) {
                    token.data = res.data;
                }
            }
            if (trigger === "signIn" && account?.provider === "credentials") {
                //@ts-ignore
                token.access_token = user.access_token;
                //@ts-ignore
                token.refresh_token = user.refresh_token;
                //@ts-ignore
                token.user = user.user;
            }
            return token;
        },
        session({ session, token, user }) {
            if (token) {
                session.data = token.data;
            }
            return session;
        }
    },
    // pages: {
    //     signIn: PATH.SIGNIN,
    //     signOut: '/auth/signout',
    //     error: '/auth/error', // Error code passed in query string as ?error=
    //     verifyRequest: '/auth/verify-request', // (used for check email message)
    //     newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    // }

}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

