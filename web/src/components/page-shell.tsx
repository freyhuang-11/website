import { Nav } from "./nav";
import { Footer } from "./footer";

export function PageShell({
  children,
  kicker,
  title,
  sub,
}: {
  children?: React.ReactNode;
  kicker?: string;
  title: string;
  sub?: string;
}) {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 pt-24 pb-16">
          {kicker && (
            <p className="text-xs font-mono text-accent tracking-widest uppercase mb-3">
              {kicker}
            </p>
          )}
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight max-w-3xl">
            {title}
          </h1>
          {sub && (
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {sub}
            </p>
          )}
        </section>
        {children}
      </main>
      <Footer />
    </>
  );
}
