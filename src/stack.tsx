import { StackServerApp } from "@stackframe/stack";

// Definir valores padrão para as configurações do Stack Auth
const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "prj_jane_meal_tracker";
const publishableClientKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY || "pk_live_Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  secretServerKey: process.env.STACK_SECRET_SERVER_KEY || "sk_live_Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9",
  projectId: projectId,
  publishableClientKey: publishableClientKey, // Adicionar a chave de cliente publicável
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
