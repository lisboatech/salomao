import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";

export default function Handler({ params, searchParams }: {
  params: { stack: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <StackHandler
      fullPage
      app={stackServerApp}
      routeProps={{ params, searchParams }}
    />
  );
}
