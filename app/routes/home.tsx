import type { Route } from "./+types/home";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg" },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jebsite" },
    { name: "description", content: "Welcome to my Jebsite!" },
  ];
}

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col items-center p-4 pt-16">
      <h1 className="text-4xl">Jebsite</h1>
      <p className="text-muted-foreground text-sm">
        Get started building your Jebsite!
      </p>
    </main>
  );
}
