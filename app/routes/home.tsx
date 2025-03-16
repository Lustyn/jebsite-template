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
      <p className="animate-shimmer bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 bg-[size:200%_100%] bg-clip-text text-sm text-transparent">
        Get started building your Jebsite!
      </p>
    </main>
  );
}
