import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  secretServerKey: process.env.STACK_SECRET_SERVER_KEY,
  urls: {
    home: "/",
    signIn: "/sign-in",
    signUp: "/sign-in",  // Redirecionando sign-up para sign-in também
    afterSignIn: "/handler/auth-callback",
    afterSignUp: "/handler/auth-callback",
    afterSignOut: "/",
    handler: "/handler",
  },
});
