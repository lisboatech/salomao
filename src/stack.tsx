import { StackServerApp } from "@stackframe/stack";

// Definir um valor padrão para o ID do projeto
const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID || "prj_jane_meal_tracker";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  secretServerKey: process.env.STACK_SECRET_SERVER_KEY || "sk_live_Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9Ck9",
  projectId: projectId, // Adicionar o ID do projeto aqui
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
