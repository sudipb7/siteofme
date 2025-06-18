import { GetYourUsername } from "./components/get-your-username";

export default function HomePage() {
  return (
    <main className="w-full">
      <section className="max-w-xl px-4 pb-12 pt-14 mx-auto text-center">
        <h1 className="heading_primary text-4xl max-w-md mx-auto max-sm:text-pretty">
          Go beyond the links . <br /> Tell your &ldquo;story&rdquo;, beautifully.
        </h1>
        <p className="description text-xl mt-6 max-w-md mx-auto text-foreground/80">
          Create{" "}
          <span className="line-through text-muted-foreground" aria-hidden>
            a link-in-bio, portfolio, business card
          </span>{" "}
          — a &ldquo;site of you&rdquo; built around &ldquo;you&rdquo;. Not just where to find you,
          but &ldquo;who you are&rdquo;.
        </p>
        <GetYourUsername />
      </section>

      <section className="max-w-xl px-4 py-16 mx-auto">
        <div className="text-center mb-8 space-y-4">
          <h2 className="heading_primary text-3xl max-w-md mx-auto">
            Why choose &ldquo;siteof.me&rdquo;?
          </h2>
          <p className="description text-lg text-foreground/80 max-w-md mx-auto">
            Your personal page shouldn&apos;t feel like just another link list. We believe in
            stories, not stacks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-md mx-auto">
          <div className="text-center space-y-3">
            <div className="text-4xl">⚡</div>
            <h3 className="heading_primary text-xl">Simple & fast</h3>
            <p className="description max-md:text-balance">
              Build your personal site in minutes, no technical skills required.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="text-4xl">✨</div>
            <h3 className="heading_primary text-xl">Looks professional</h3>
            <p className="description max-md:text-balance">
              Clean, modern designs that make you stand out from the crowd.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="text-4xl">🔗</div>
            <h3 className="heading_primary text-xl">One link</h3>
            <p className="description max-md:text-balance">
              Share your complete online presence with a single, memorable link.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="text-4xl">🎯</div>
            <h3 className="heading_primary text-xl">Built for everyone</h3>
            <p className="description max-md:text-balance">
              Perfect for creators, professionals, and anyone wanting an online presence.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-xl px-4 py-12 mx-auto text-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="heading_primary text-3xl mx-auto">Your story, your site</h2>
            <p className="description text-lg text-foreground/80 max-w-md mx-auto">
              A simple site to share your story, work, and everything that makes you, you.
            </p>
          </div>
          <GetYourUsername />
        </div>
      </section>
    </main>
  );
}
